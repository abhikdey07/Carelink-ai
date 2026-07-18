from app.services.gemini_service import analyze_image

print("Starting Gemini Test...")

result = analyze_image("uploads/test.jpg")

print("\nGemini Response:")
print(result)