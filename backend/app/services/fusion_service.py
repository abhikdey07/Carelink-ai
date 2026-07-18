# ==========================================================
# CareLink AI Fusion Service
#
# YOLO  : Fast local validator & fallback
# Gemini: Primary semantic classifier
#
# Logic:
# 1. If Gemini returns valid donation items -> use ONLY Gemini.
# 2. Otherwise use filtered YOLO detections.
# ==========================================================

ALLOWED_YOLO_ITEMS = {
    "book",
    "backpack",
    "laptop",
    "cell phone",
    "chair",
    "bottle",
}


def merge_results(yolo_items, gemini_result):

    gemini_items = gemini_result.get("items", [])

    # --------------------------------------------------
    # STEP 1
    # Gemini is the primary AI.
    # If Gemini returns donation items,
    # ignore YOLO classifications completely.
    # --------------------------------------------------

    if gemini_items and len(gemini_items) > 0:

        final_items = []

        for item in gemini_items:

            final_items.append({

                "category": item.get("category", ""),

                "item_name": item.get("item_name", ""),

                "quantity": item.get("quantity", 1),

                # Gemini does not return confidence
                "confidence": None,

                "condition": item.get("condition", "Good")

            })

        print("Fusion : Using Gemini results")

        return final_items

    # --------------------------------------------------
    # STEP 2
    # Gemini failed or returned nothing.
    # Fall back to YOLO.
    # --------------------------------------------------

    print("Fusion : Gemini unavailable -> Using YOLO fallback")

    final_items = []

    for item in yolo_items:

        name = item.get("item", "").strip().lower()

        if name not in ALLOWED_YOLO_ITEMS:
            continue

        final_items.append({

            "category": "",

            "item_name": item["item"],

            "quantity": item.get("quantity", 1),

            "confidence": item.get("confidence"),

            "condition": "Good"

        })

    return final_items