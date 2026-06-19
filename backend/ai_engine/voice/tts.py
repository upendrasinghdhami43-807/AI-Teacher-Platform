"""
VoiceEngine — Azure TTS integration for all 4 languages.

For NeEnglish: delegates to ne_english_tts.py for segment-by-segment stitching.
Fallback: If TTS fails, set audio_url=None. Frontend shows captions-only.
"""

import asyncio
from typing import Optional

import structlog

from ai_engine.script.schemas import VoiceSegment
from ai_engine.voice.ne_english_tts import stitch_neenglish_audio
from config import settings
from services.storage import StorageService

logger = structlog.get_logger(__name__)

# Voice routing map
VOICE_MAP = {
    "en": settings.AZURE_VOICE_ENGLISH,
    "ne": settings.AZURE_VOICE_NEPALI,
    "hi": settings.AZURE_VOICE_HINDI,
    "ne_en": None,  # Handled by ne_english_tts.py
}


class VoiceEngine:
    """Synthesizes voice audio for lesson sections."""

    def __init__(self, storage: StorageService):
        self._storage = storage
        self._speech_config = None

    def _get_speech_config(self):
        """Lazy-init Azure speech config."""
        if self._speech_config is None:
            try:
                import azure.cognitiveservices.speech as speechsdk

                self._speech_config = speechsdk.SpeechConfig(
                    subscription=settings.AZURE_SPEECH_KEY,
                    region=settings.AZURE_SPEECH_REGION,
                )
                self._speech_config.set_speech_synthesis_output_format(
                    speechsdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3
                )
            except Exception as e:
                logger.warning("voice.config_error", error=str(e))
                return None
        return self._speech_config

    async def synthesize_section(
        self,
        segments: list[VoiceSegment],
        language: str,
        section_id: int,
        session_id: str,
        # STAGE 5: Persona voice override
        voice_override: Optional[str] = None,
    ) -> Optional[str]:
        """
        Synthesize audio for a lesson section.

        Args:
            segments: List of VoiceSegment with lang tags
            language: Overall language ("en", "ne", "hi", "ne_en")
            section_id: Section identifier
            session_id: Lesson session ID
            voice_override: Stage 5 persona voice override

        Returns:
            audio_url string or None on failure
        """
        try:
            speech_config = self._get_speech_config()
            if speech_config is None:
                logger.warning("voice.no_config", section_id=section_id)
                return None

            if language == "ne_en":
                # NeEnglish: stitch segments with different voices
                audio_bytes = await stitch_neenglish_audio(segments, speech_config)
            else:
                # Single language: combine all text, use one voice
                voice_name = voice_override or VOICE_MAP.get(language, VOICE_MAP["en"])
                audio_bytes = await self._synthesize_single_language(
                    segments, voice_name, speech_config
                )

            if audio_bytes is None:
                logger.warning("voice.synthesis_returned_none", section_id=section_id)
                return None

            # Upload to storage
            path = f"voice/{session_id}/section_{section_id}.mp3"
            audio_url = await self._storage.save(path, audio_bytes)

            # Estimate duration (rough: MP3 at 32kbps)
            duration_sec = len(audio_bytes) / (32000 / 8)

            logger.info(
                "voice.synthesized",
                section_id=section_id,
                language=language,
                audio_size_bytes=len(audio_bytes),
                duration_sec=round(duration_sec, 1),
            )

            return audio_url

        except Exception as e:
            # Graceful degradation: lesson continues without audio
            logger.warning(
                "voice.synthesis_failed",
                section_id=section_id,
                language=language,
                error=str(e),
            )
            return None

    async def _synthesize_single_language(
        self,
        segments: list[VoiceSegment],
        voice_name: str,
        speech_config: object,
    ) -> Optional[bytes]:
        """Synthesize all segments as a single language."""
        try:
            import azure.cognitiveservices.speech as speechsdk
            from pydub import AudioSegment

            # Combine all text with pauses
            combined = AudioSegment.empty()
            loop = asyncio.get_event_loop()

            for segment in segments:
                audio_data = await loop.run_in_executor(
                    None,
                    self._synthesize_sync,
                    segment.text,
                    voice_name,
                    speech_config,
                )

                if audio_data:
                    audio_seg = AudioSegment(
                        data=audio_data,
                        sample_width=2,
                        frame_rate=16000,
                        channels=1,
                    )
                    combined += audio_seg

                if segment.pause_after_ms > 0:
                    combined += AudioSegment.silent(duration=segment.pause_after_ms)

            if len(combined) > 0:
                from io import BytesIO

                buffer = BytesIO()
                combined.export(buffer, format="mp3", bitrate="32k")
                return buffer.getvalue()

            return None

        except Exception as e:
            logger.warning("voice.single_lang_error", error=str(e))
            return None

    def _synthesize_sync(
        self, text: str, voice_name: str, speech_config: object
    ) -> Optional[bytes]:
        """Synchronous Azure TTS call."""
        try:
            import azure.cognitiveservices.speech as speechsdk

            synthesizer = speechsdk.SpeechSynthesizer(
                speech_config=speech_config,
                audio_config=None,
            )

            ssml = f"""<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'>
                <voice name='{voice_name}'>{text}</voice>
            </speak>"""

            result = synthesizer.speak_ssml(ssml)

            if result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
                return result.audio_data

            return None

        except Exception as e:
            logger.warning("voice.sync_error", error=str(e))
            return None
