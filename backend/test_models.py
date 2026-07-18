import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

models = [
    "gemini-flash-latest",
    "gemini-2.0-flash",
    "gemini-2.0-flash-001",
    "gemini-2.5-pro",
    "gemini-pro-latest"
]

for model in models:
    try:
        response = client.models.generate_content(
            model=model,
            contents="Say only: OK"
        )
        print(f"✅ {model} -> {response.text}")
    except Exception as e:
        print(f"❌ {model} -> {e}")