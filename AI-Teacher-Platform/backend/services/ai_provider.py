"""
AI Provider Abstraction Layer.

Rule: All AI calls go through this layer.
No module ever imports Gemini, OpenAI, or Groq directly.
Swapping providers = change one environment variable.
"""

import json
from abc import ABC, abstractmethod
from typing import Optional

import structlog
from tenacity import retry, retry_if_exception_type, stop_after_attempt, wait_exponential

from config import settings

logger = structlog.get_logger(__name__)


class AIProvider(ABC):
    """Abstract interface for AI model providers."""

    @abstractmethod
    async def complete_json(
        self,
        system_prompt: str,
        user_prompt: str,
        model: str,
        max_tokens: int = 2000,
        temperature: float = 0.5,
    ) -> dict:
        """Generate a JSON response from the AI model."""
        ...

    @abstractmethod
    async def complete_text(
        self,
        system_prompt: str,
        user_prompt: str,
        model: str,
        max_tokens: int = 1000,
        temperature: float = 0.7,
    ) -> str:
        """Generate a text response from the AI model."""
        ...


class GeminiProvider(AIProvider):
    """Google Gemini AI provider."""

    def __init__(self):
        import google.generativeai as genai

        genai.configure(api_key=settings.GEMINI_API_KEY)
        self._genai = genai

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        retry=retry_if_exception_type(Exception),
    )
    async def complete_json(
        self,
        system_prompt: str,
        user_prompt: str,
        model: str,
        max_tokens: int = 2000,
        temperature: float = 0.5,
    ) -> dict:
        model_instance = self._genai.GenerativeModel(
            model_name=model,
            system_instruction=system_prompt,
            generation_config=self._genai.GenerationConfig(
                max_output_tokens=max_tokens,
                temperature=temperature,
                response_mime_type="application/json",
            ),
        )
        response = model_instance.generate_content(user_prompt)

        # Log token usage
        usage = getattr(response, "usage_metadata", None)
        prompt_tokens = getattr(usage, "prompt_token_count", 0) if usage else 0
        completion_tokens = getattr(usage, "candidates_token_count", 0) if usage else 0

        logger.info(
            "ai.complete_json",
            provider="gemini",
            model=model,
            prompt_tokens=prompt_tokens,
            completion_tokens=completion_tokens,
        )

        text = response.text.strip()
        return json.loads(text)

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        retry=retry_if_exception_type(Exception),
    )
    async def complete_text(
        self,
        system_prompt: str,
        user_prompt: str,
        model: str,
        max_tokens: int = 1000,
        temperature: float = 0.7,
    ) -> str:
        model_instance = self._genai.GenerativeModel(
            model_name=model,
            system_instruction=system_prompt,
            generation_config=self._genai.GenerationConfig(
                max_output_tokens=max_tokens,
                temperature=temperature,
            ),
        )
        response = model_instance.generate_content(user_prompt)

        usage = getattr(response, "usage_metadata", None)
        prompt_tokens = getattr(usage, "prompt_token_count", 0) if usage else 0
        completion_tokens = getattr(usage, "candidates_token_count", 0) if usage else 0

        logger.info(
            "ai.complete_text",
            provider="gemini",
            model=model,
            prompt_tokens=prompt_tokens,
            completion_tokens=completion_tokens,
        )

        return response.text.strip()


class GroqProvider(AIProvider):
    """Groq AI provider — cheap fast models for planning/compression."""

    def __init__(self):
        from groq import AsyncGroq

        self._client = AsyncGroq(api_key=settings.GROQ_API_KEY)

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        retry=retry_if_exception_type(Exception),
    )
    async def complete_json(
        self,
        system_prompt: str,
        user_prompt: str,
        model: str,
        max_tokens: int = 2000,
        temperature: float = 0.5,
    ) -> dict:
        response = await self._client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            max_tokens=max_tokens,
            temperature=temperature,
            response_format={"type": "json_object"},
        )

        content = response.choices[0].message.content or "{}"
        usage = response.usage

        logger.info(
            "ai.complete_json",
            provider="groq",
            model=model,
            prompt_tokens=usage.prompt_tokens if usage else 0,
            completion_tokens=usage.completion_tokens if usage else 0,
        )

        return json.loads(content)

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        retry=retry_if_exception_type(Exception),
    )
    async def complete_text(
        self,
        system_prompt: str,
        user_prompt: str,
        model: str,
        max_tokens: int = 1000,
        temperature: float = 0.7,
    ) -> str:
        response = await self._client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            max_tokens=max_tokens,
            temperature=temperature,
        )

        usage = response.usage
        logger.info(
            "ai.complete_text",
            provider="groq",
            model=model,
            prompt_tokens=usage.prompt_tokens if usage else 0,
            completion_tokens=usage.completion_tokens if usage else 0,
        )

        return (response.choices[0].message.content or "").strip()


class OpenAIProvider(AIProvider):
    """OpenAI provider — fallback for highest quality."""

    def __init__(self):
        from openai import AsyncOpenAI

        self._client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        retry=retry_if_exception_type(Exception),
    )
    async def complete_json(
        self,
        system_prompt: str,
        user_prompt: str,
        model: str,
        max_tokens: int = 2000,
        temperature: float = 0.5,
    ) -> dict:
        response = await self._client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            max_tokens=max_tokens,
            temperature=temperature,
            response_format={"type": "json_object"},
        )

        content = response.choices[0].message.content or "{}"
        usage = response.usage

        logger.info(
            "ai.complete_json",
            provider="openai",
            model=model,
            prompt_tokens=usage.prompt_tokens if usage else 0,
            completion_tokens=usage.completion_tokens if usage else 0,
        )

        return json.loads(content)

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        retry=retry_if_exception_type(Exception),
    )
    async def complete_text(
        self,
        system_prompt: str,
        user_prompt: str,
        model: str,
        max_tokens: int = 1000,
        temperature: float = 0.7,
    ) -> str:
        response = await self._client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            max_tokens=max_tokens,
            temperature=temperature,
        )

        usage = response.usage
        logger.info(
            "ai.complete_text",
            provider="openai",
            model=model,
            prompt_tokens=usage.prompt_tokens if usage else 0,
            completion_tokens=usage.completion_tokens if usage else 0,
        )

        return (response.choices[0].message.content or "").strip()


# ── Provider Factory (Singleton) ─────────────────────────────

_provider_cache: dict[str, AIProvider] = {}


def get_ai_provider(provider_name: Optional[str] = None) -> AIProvider:
    """
    Get or create a cached AI provider instance.

    Args:
        provider_name: "gemini" | "openai" | "groq". Defaults to AI_PRIMARY_PROVIDER.

    Returns:
        An AIProvider instance (cached singleton per provider).
    """
    name = (provider_name or settings.AI_PRIMARY_PROVIDER).lower()

    if name in _provider_cache:
        return _provider_cache[name]

    if name == "gemini":
        provider = GeminiProvider()
    elif name == "groq":
        provider = GroqProvider()
    elif name == "openai":
        provider = OpenAIProvider()
    else:
        raise ValueError(f"Unknown AI provider: {name}. Use 'gemini', 'groq', or 'openai'.")

    _provider_cache[name] = provider
    logger.info("ai_provider.initialized", provider=name)
    return provider
