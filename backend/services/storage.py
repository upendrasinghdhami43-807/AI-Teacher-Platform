"""
File storage service — local filesystem (S3-ready interface).
"""

import os
from pathlib import Path
from typing import Optional

import structlog

from config import settings

logger = structlog.get_logger(__name__)


class StorageService:
    """Handles file storage for audio and other generated content."""

    def __init__(self):
        self.storage_type = settings.STORAGE_TYPE
        self.local_path = Path(settings.STORAGE_LOCAL_PATH)

    async def init(self):
        """Create storage directory on startup."""
        if self.storage_type == "local":
            self.local_path.mkdir(parents=True, exist_ok=True)
            (self.local_path / "voice").mkdir(exist_ok=True)
            logger.info("storage.initialized", type="local", path=str(self.local_path))

    async def save(self, path: str, data: bytes) -> str:
        """
        Save binary data to storage.

        Args:
            path: Relative path within storage (e.g., "voice/session-123/section_1.mp3")
            data: Binary content to save.

        Returns:
            URL/path to access the file.
        """
        if self.storage_type == "local":
            return await self._save_local(path, data)
        else:
            # STAGE X: S3 upload not in Stage 2
            return await self._save_local(path, data)

    async def _save_local(self, path: str, data: bytes) -> str:
        """Save to local filesystem."""
        full_path = self.local_path / path
        full_path.parent.mkdir(parents=True, exist_ok=True)

        with open(full_path, "wb") as f:
            f.write(data)

        logger.debug("storage.saved", path=path, size_bytes=len(data))
        return f"/storage/{path}"

    async def get(self, path: str) -> Optional[bytes]:
        """Read file from storage."""
        if self.storage_type == "local":
            full_path = self.local_path / path
            if full_path.exists():
                with open(full_path, "rb") as f:
                    return f.read()
        return None

    async def exists(self, path: str) -> bool:
        """Check if file exists."""
        if self.storage_type == "local":
            return (self.local_path / path).exists()
        return False

    async def delete(self, path: str) -> bool:
        """Delete a file from storage."""
        try:
            if self.storage_type == "local":
                full_path = self.local_path / path
                if full_path.exists():
                    os.remove(full_path)
                    return True
            return False
        except Exception as e:
            logger.warning("storage.delete.error", path=path, error=str(e))
            return False


# Singleton
storage_service = StorageService()
