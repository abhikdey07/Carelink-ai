from collections import defaultdict
from pathlib import Path

from ultralytics import YOLO

MODEL_PATH = Path(__file__).parents[2] / "yolov8n.pt"

_model = None


def get_model():
    global _model

    if _model is None:
        print("Loading YOLO model...")
        _model = YOLO(str(MODEL_PATH))
        print("YOLO model loaded.")

    return _model


def detect_objects(image_path: str):
    model = get_model()

    results = model(image_path)

    item_counts = defaultdict(int)
    confidence_sum = defaultdict(float)

    CATEGORY_MAP = {
        "book": "books",
        "cell phone": "electronics",
        "laptop": "electronics",
        "keyboard": "electronics",
        "mouse": "electronics",
        "tv": "electronics",
        "fork": "utensils",
        "knife": "utensils",
        "spoon": "utensils",
        "bowl": "utensils",
        "cup": "utensils",
        "banana": "food",
        "apple": "food",
        "orange": "food",
        "pizza": "food",
        "cake": "food",
        "sandwich": "food",
        "tie": "clothing",
        "handbag": "clothing",
    }

    for result in results:
        for box in result.boxes:
            class_id = int(box.cls[0])
            confidence = float(box.conf[0])

            class_name = model.names[class_id]

            item_counts[class_name] += 1
            confidence_sum[class_name] += confidence

    detections = []

    for item in item_counts:
        avg_confidence = (
            confidence_sum[item] / item_counts[item]
        ) * 100

        detections.append(
            {
                "item": item,
                "quantity": item_counts[item],
                "confidence": round(avg_confidence, 2),
            }
        )

    return detections