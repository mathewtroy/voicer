from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from gtts import gTTS
import base64
import io

router = APIRouter()


class TTSRequest(BaseModel):
    text: str
    language: str | None = "en"


@router.post("/tts")
async def tts_endpoint(payload: TTSRequest):
    try:
        tts = gTTS(text=payload.text, lang=payload.language)
        buffer = io.BytesIO()
        tts.write_to_fp(buffer)
        buffer.seek(0)

        audio_base64 = base64.b64encode(buffer.read()).decode("utf-8")

        return {
            "audio_base64": audio_base64,
            "format": "mp3"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"TTS Error: {str(e)}")
