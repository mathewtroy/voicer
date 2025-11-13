from fastapi import APIRouter, UploadFile, File, HTTPException
import httpx
from app.config import DEEPGRAM_API_KEY

router = APIRouter()

DEEPGRAM_URL = "https://api.deepgram.com/v1/listen"


@router.post("/stt")
async def speech_to_text(audio: UploadFile = File(...)):
    """
    Speech-to-Text using Deepgram API (FREE TIER).
    Accepts audio file and returns transcription.
    """

    if audio.content_type not in ["audio/wav", "audio/mpeg", "audio/webm", "audio/ogg"]:
        raise HTTPException(status_code=400, detail="Unsupported audio format")

    audio_bytes = await audio.read()

    headers = {
        "Authorization": f"Token {DEEPGRAM_API_KEY}",
        "Content-Type": audio.content_type
    }

    params = {
        "model": "general",   # free Deepgram model
        "smart_format": "true"
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                DEEPGRAM_URL,
                params=params,
                content=audio_bytes,
                headers=headers,
            )

        if response.status_code != 200:
            raise HTTPException(
                status_code=500,
                detail=f"Deepgram error: {response.text}"
            )

        data = response.json()
        transcript = data["results"]["channels"][0]["alternatives"][0]["transcript"]

        return {"text": transcript}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"STT Error: {str(e)}")
