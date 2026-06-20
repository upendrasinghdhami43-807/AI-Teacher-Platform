from fastapi import APIRouter

router = APIRouter(prefix="/pdf", tags=["pdf"])

@router.get("/library")
async def get_pdf_library():
    """Mock endpoint to return PDF library."""
    return {
        "pdfs": [
            {"id": "1", "name": "Physics Notes Ch.5.pdf", "size": 1024000, "type": "standard"},
            {"id": "2", "name": "Visual_Lesson_1.pdf", "size": 3024000, "type": "visual"},
        ]
    }
