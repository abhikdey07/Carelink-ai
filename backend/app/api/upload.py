from app.ai.detector import detect_objects
from fastapi import APIRouter, UploadFile, File
from pathlib import Path
import shutil

router = APIRouter(
    prefix="/upload",
    tags=["Image Upload"]
)

UPLOAD_FOLDER = Path("uploads")
UPLOAD_FOLDER.mkdir(exist_ok=True)


@router.post("/")
async def upload_image(file: UploadFile = File(...)):
    file_path = UPLOAD_FOLDER / file.filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    detections = detect_objects(str(file_path))

    return {
    "message": "Detection completed",
    "filename": file.filename,
    "detections": detections
}