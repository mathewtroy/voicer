from fastapi import APIRouter

router = APIRouter()


@router.post("/chat")
async def chat_stub():
    """
    Temporary chat stub endpoint.
    Later will call GPT / LLM API.
    """
    return {"reply": "stub assistant response"}
