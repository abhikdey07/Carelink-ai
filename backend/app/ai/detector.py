from collections import defaultdict

from ultralytics import YOLO

# Load model only once
from pathlib import Path

MODEL_PATH = Path(__file__).parents[2] / "yolov8n.pt"

model = YOLO(str(MODEL_PATH))


def detect_objects(image_path: str):
    results = model(image_path)

    item_counts = defaultdict(int)
    confidence_sum = defaultdict(float)

    for result in results:
        boxes = result.boxes

        for box in boxes:
            class_id = int(box.cls[0])
            confidence = float(box.conf[0])

            class_name = model.names[class_id]
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
    "handbag": "clothing"
}

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
                "confidence": round(avg_confidence, 2)
            }
        )

    return detections