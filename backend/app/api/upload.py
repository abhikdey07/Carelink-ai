from pathlib import Path
import shutil

from fastapi import APIRouter, UploadFile, File

from app.ai.detector import detect_objects
from app.services.gemini_service import analyze_image
from app.services.fusion_service import merge_results

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

    # ------------------------------------------------------
    # STEP 1
    # Run YOLO
    # ------------------------------------------------------

    yolo_result = detect_objects(str(file_path))

    print("\n========== YOLO ==========")
    print(yolo_result)

    # ------------------------------------------------------
    # STEP 2
    # Run Gemini
    # ------------------------------------------------------

    try:

        gemini_result = analyze_image(str(file_path))

        print("\n========== GEMINI ==========")
        print(gemini_result)

    except Exception as e:

        print("\nGemini Error:", e)

        gemini_result = {
            "items": []
        }

    # ------------------------------------------------------
    # STEP 3
    # Fusion
    # ------------------------------------------------------

    final_result = merge_results(
        yolo_result,
        gemini_result
    )

    print("\n========== FINAL ==========")
    print(final_result)

    # ------------------------------------------------------
    # STEP 4
    # Response
    # ------------------------------------------------------

    return {

        "message": "Detection completed successfully",

        "filename": file.filename,

        "detections": final_result

    }