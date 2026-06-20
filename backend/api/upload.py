import uuid
from typing import List
from fastapi import APIRouter, UploadFile, File, HTTPException

router = APIRouter(prefix="/upload", tags=["upload"])

@router.post("/images")
async def upload_images(files: List[UploadFile] = File(...)):
    """Mock endpoint to handle image uploads for context."""
    if len(files) > 3:
        raise HTTPException(status_code=400, detail="Maximum 3 images allowed")
    
    uploaded_urls = []
    for f in files:
        if not f.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")
        # In a real scenario, we would upload to S3 or a local dir.
        # For this demo, just return a mock URL.
        mock_url = f"https://mock-storage.biographynp.com/context/{uuid.uuid4().hex}_{f.filename}"
        uploaded_urls.append(mock_url)
        
    return {"urls": uploaded_urls}

@router.post("/pdf")
async def upload_pdf(file: UploadFile = File(...)):
    """Mock endpoint to handle PDF uploads."""
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="File must be a PDF")
        
    mock_url = f"https://mock-storage.biographynp.com/pdfs/{uuid.uuid4().hex}_{file.filename}"
    return {"url": mock_url, "filename": file.filename, "size": 1024000}
