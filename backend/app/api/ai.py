from fastapi import APIRouter, UploadFile, File
import os
import shutil

from app.ai.detector import detect_objects

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/detect")
async def detect(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    detections = detect_objects(file_path)

    return {
        "success": True,
        "detections": detections
    }