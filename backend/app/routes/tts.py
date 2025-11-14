from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from gtts import gTTS
import base64
import io
from app.logger import log

router = APIRouter()


class TTSRequest(BaseModel):
    text: str
    language: str | None = "en"


@router.post("/tts")
async def tts_endpoint(payload: TTSRequest):
    log("TTS_REQUEST", {"text": payload.text[:50] + "..."} )

    try:
        tts = gTTS(text=payload.text, lang=payload.language)
        buffer = io.BytesIO()
        tts.write_to_fp(buffer)
        buffer.seek(0)

        audio_base64 = base64.b64encode(buffer.read()).decode("utf-8")

        log("TTS_SUCCESS", {"audio_length": len(audio_base64)})

        return {
            "audio_base64": audio_base64,
            "format": "mp3"
        }

    except Exception as e:
        log("TTS_ERROR", {"error": str(e)})
        raise HTTPException(status_code=500, detail=f"TTS Error: {str(e)}")
