"""
NeEnglish TTS Stitcher — synthesizes mixed Nepali+English audio.

For NeEnglish: each segment has a lang tag ("ne" or "en").
Route each segment to the correct Azure voice, synthesize separately,
stitch with pydub, return as single MP3.
"""

import asyncio
from io import BytesIO
from typing import Optional

import structlog

from ai_engine.script.schemas import VoiceSegment
from config import settings

logger = structlog.get_logger(__name__)


async def stitch_neenglish_audio(
    segments: list[VoiceSegment],
    speech_config: object,
) -> Optional[bytes]:
    """
    Stitch NeEnglish audio from mixed language segments.

    For each segment:
    1. Select voice based on lang tag
    2. Synthesize with Azure SDK (via run_in_executor)
    3. Load as pydub AudioSegment
    4. Append silence for pause_after_ms
    5. Concatenate all parts
    6. Export as MP3
    """
    try:
        import azure.cognitiveservices.speech as speechsdk
        from pydub import AudioSegment
    except ImportError as e:
        logger.error("neenglish_tts.import_error", error=str(e))
        return None

    combined = AudioSegment.empty()
    loop = asyncio.get_event_loop()

    for i, segment in enumerate(segments):
        # Select voice based on language tag
        if segment.lang == "ne":
            voice_name = settings.AZURE_VOICE_NEENGLISH_NE
        else:
            voice_name = settings.AZURE_VOICE_NEENGLISH_EN

        try:
            # Azure SDK is blocking — wrap in executor
            audio_data = await loop.run_in_executor(
                None,
                _synthesize_segment_sync,
                segment.text,
                voice_name,
                speech_config,
            )

            if audio_data:
                # Load as pydub AudioSegment from raw audio
                audio_segment = AudioSegment(
                    data=audio_data,
                    sample_width=2,  # 16-bit
                    frame_rate=16000,
                    channels=1,
                )
                combined += audio_segment

            # Add pause between segments
            if segment.pause_after_ms > 0:
                combined += AudioSegment.silent(duration=segment.pause_after_ms)

        except Exception as e:
            logger.warning(
                "neenglish_tts.segment_error",
                segment_index=i,
                lang=segment.lang,
                error=str(e),
            )
            # Add silence for failed segment to maintain timing
            combined += AudioSegment.silent(duration=500)

    # Export as MP3
    if len(combined) > 0:
        buffer = BytesIO()
        combined.export(buffer, format="mp3", bitrate="32k")
        return buffer.getvalue()

    return None


def _synthesize_segment_sync(
    text: str,
    voice_name: str,
    speech_config: object,
) -> Optional[bytes]:
    """Synchronous Azure TTS for a single text segment."""
    try:
        import azure.cognitiveservices.speech as speechsdk

        # Configure for raw audio output (PCM)
        audio_config = speechsdk.audio.AudioOutputConfig(use_default_speaker=False)

        synthesizer = speechsdk.SpeechSynthesizer(
            speech_config=speech_config,
            audio_config=None,  # Don't output to speaker
        )

        # Build SSML for precise voice control
        ssml = f"""<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'>
            <voice name='{voice_name}'>
                {text}
            </voice>
        </speak>"""

        result = synthesizer.speak_ssml(ssml)

        if result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
            return result.audio_data
        else:
            logger.warning(
                "azure_tts.synthesis_failed",
                reason=str(result.reason),
                voice=voice_name,
            )
            return None

    except Exception as e:
        logger.warning("azure_tts.error", error=str(e), voice=voice_name)
        return None
