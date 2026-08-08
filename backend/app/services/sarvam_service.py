import os
from dotenv import load_dotenv
from sarvamai import SarvamAI

load_dotenv()

client = SarvamAI(
    api_subscription_key=os.getenv("SARVAM_API_KEY")
)

def translate_text(text: str, target_language: str):
    response = client.text.translate(
        input=text,
        source_language_code="en-IN",
        target_language_code=target_language,
        model="sarvam-translate:v1"
    )

    return response.translated_text