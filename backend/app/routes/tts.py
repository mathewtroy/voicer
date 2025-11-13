from fastapi import APIRouter

router = APIRouter()


@router.post("/tts")
async def tts_stub():
    """
    Temporary TTS stub endpoint.
    Later will call TTS API and return audio.
    """
    return {"audio_url": "https://example.com/stub-audio.wav"}
