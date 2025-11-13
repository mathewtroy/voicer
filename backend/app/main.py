from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import stt, chat, tts


app = FastAPI(title="Voicer Backend")

# TODO: later add Vercel frontend URL here
origins = [
    "http://localhost:5173",  # Vite dev server
    "http://localhost:3000",  # React dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Voicer backend is running"}


# Include routers
app.include_router(stt.router, prefix="/api", tags=["stt"])
app.include_router(chat.router, prefix="/api", tags=["chat"])
app.include_router(tts.router, prefix="/api", tags=["tts"])
