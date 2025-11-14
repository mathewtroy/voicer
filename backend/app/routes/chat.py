from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from groq import Groq
from app.config import GROQ_API_KEY
from app.logger import log

router = APIRouter()
client = Groq(api_key=GROQ_API_KEY)


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
async def chat_endpoint(payload: ChatRequest):
    log("CHAT_REQUEST", {"user_message": payload.message})

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are a helpful AI voice assistant."},
                {"role": "user", "content": payload.message}
            ],
        )

        reply = response.choices[0].message.content

        log("CHAT_REPLY", {"reply": reply})

        return {"reply": reply}

    except Exception as e:
        log("CHAT_ERROR", {"error": str(e)})
        raise HTTPException(status_code=500, detail=f"Groq Error: {str(e)}")
