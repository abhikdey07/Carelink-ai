import os
from dotenv import load_dotenv
from sarvamai import SarvamAI

load_dotenv()

client = SarvamAI(
    api_subscription_key=os.getenv("SARVAM_API_KEY")
)

response = client.text.translate(
    input="Welcome to CareLink",
    source_language_code="en-IN",
    target_language_code="bn-IN",
    model="sarvam-translate:v1"
)

print(response)