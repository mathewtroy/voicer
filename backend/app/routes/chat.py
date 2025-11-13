from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from groq import Groq
from app.config import GROQ_API_KEY

router = APIRouter()

client = Groq(api_key=GROQ_API_KEY)


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
async def chat_endpoint(payload: ChatRequest):
    """
    Chat endpoint using Groq (LLaMA 3.1).
    """

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are a helpful AI voice assistant."},
                {"role": "user", "content": payload.message}
            ],
        )

        # NEW correct way to extract content:
        reply = response.choices[0].message.content

        return {"reply": reply}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Groq Error: {str(e)}")
