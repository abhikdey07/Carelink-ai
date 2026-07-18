import os
import json
from pathlib import Path

from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env")

client = genai.Client(api_key=API_KEY)

# ==========================================================
# Standard Donation Item Names
# Gemini output will be normalized to these names.
# ==========================================================

NORMALIZE_ITEMS = {

    # Bags
    "Backpack": "School Bag",
    "School backpack": "School Bag",
    "School Backpack": "School Bag",

    # Bottles
    "Water Bottle": "Bottle",
    "Plastic Bottle": "Bottle",
    "Steel Bottle": "Bottle",
    "Bottle": "Bottle",

    # Food
    "Rice Packet": "Packaged Food",
    "Rice Bag": "Packaged Food",
    "Flour Packet": "Packaged Food",
    "Biscuit Packet": "Packaged Food",
    "Biscuit Pack": "Packaged Food",
    "Noodles Packet": "Packaged Food",
    "Food Packet": "Packaged Food",

    # Phones
    "Cell Phone": "Mobile Phone",
    "Smartphone": "Mobile Phone",
    "Phone": "Mobile Phone",

    # Books
    "Textbook": "Book",
    "Story Book": "Book",
}


def analyze_image(image_path: str):

    image = Path(image_path)

    prompt = """
You are CareLink AI Donation Detection Assistant.

Your task is to detect ONLY supported donation items.

=================================================

SUPPORTED DONATION ITEMS

=================================================

Clothing
---------
T-Shirt
Shirt
Jeans
Jacket
Sweater
Hoodie
Trousers
Shorts
Dress
Saree
Blanket
Bedsheet
Shoes
Sandals
Slippers
Socks

Books & Education
-----------------
Book
Notebook
School Bag
Pen
Pencil
Geometry Box
Calculator

Electronics
-----------
Laptop
Mobile Phone
Tablet
Keyboard
Mouse
Monitor
Headphones
Charger

Food
----
Packaged Food
Cooking Oil
Bottle

Household
----------
Chair
Table
Bucket
Cup
Glass
Steel Plate
Utensils
Cooking Pot
Pressure Cooker

Toys
-----
Teddy Bear
Toy Car
Football
Cricket Bat
Puzzle
Doll

=================================================

IMPORTANT RULES

1. Detect ONLY items from the above catalog.

2. Ignore everything else.

Ignore examples:

Person
Face
Hand
Dog
Cat
Bird
Horse
Cow
Tree
Road
Sky
Building
Car
Bus
Truck
Motorcycle
Bicycle
Traffic Light
Bench
Television
Refrigerator
Air Conditioner
Microwave
Washing Machine
Fan
Door
Window

3. Never invent new item names.

4. If an object is similar to a supported item,
choose the closest supported item.

Examples

Notebook -> Notebook

School Backpack -> School Bag

Water Bottle -> Bottle

Rice Packet -> Packaged Food

Biscuit Packet -> Packaged Food

Smartphone -> Mobile Phone

5. If NO supported donation item exists return

{
  "items":[]
}

6. Return for every detected item

category

item_name

quantity

condition

Condition must be exactly one of

Excellent

Good

Fair

Poor

=================================================

Return ONLY valid JSON.

Example

{
    "items":[
        {
            "category":"Clothing",
            "item_name":"T-Shirt",
            "quantity":2,
            "condition":"Good"
        }
    ]
}

Never explain.

Never use markdown.

Return JSON only.
"""

    response = client.models.generate_content(
        model="gemini-flash-latest",
        contents=[
            prompt,
            types.Part.from_bytes(
                data=image.read_bytes(),
                mime_type="image/jpeg"
            )
        ]
    )

    text = response.text.strip()

    print("\n========== GEMINI RAW RESPONSE ==========")
    print(text)
    print("=========================================\n")

    if text.startswith("```json"):
        text = text.replace("```json", "").replace("```", "").strip()

    elif text.startswith("```"):
        text = text.replace("```", "").strip()

    try:

        result = json.loads(text)

        # ======================================================
        # Normalize item names
        # ======================================================

        for item in result.get("items", []):

            name = item.get("item_name", "").strip()

            if name in NORMALIZE_ITEMS:
                item["item_name"] = NORMALIZE_ITEMS[name]

        return result

    except Exception:

        return {
            "items": []
        }