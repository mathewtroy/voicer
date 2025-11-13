from fastapi import APIRouter

router = APIRouter()


@router.post("/stt")
async def speech_to_text_stub():
    """
    Temporary STT stub endpoint.
    Later will accept audio and call Whisper / ASR API.
    """
    return {"text": "stub transcription"}
