from fastapi import APIRouter
from pydantic import BaseModel

from app.services.sarvam_service import translate_text

router = APIRouter()


class TranslateRequest(BaseModel):
    texts: list[str]
    language: str


@router.post("/")
def translate(request: TranslateRequest):

    translated = {}

    for text in request.texts:
        translated[text] = translate_text(
            text,
            request.language
        )

    return translated