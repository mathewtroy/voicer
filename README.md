# 🎤 Voicer AI — Voice-Powered Intelligent Assistant

**Backend:** FastAPI (Render)  
**Frontend:** TypeScript + Vite (Vercel)  
**Author:** Aleksandr Kross  

🔗 **Live App:** https://voicer-ai.vercel.app  
🔗 **Backend API:** https://voicer-backend.onrender.com  
🔗 **GitHub:** https://github.com/mathewtroy/voicer  


## 📖 Overview

**Voicer AI** is a real-time **voice-driven AI assistant**.  
The system listens to the user, transcribes speech, generates intelligent responses using an LLM, and speaks them back using TTS.
The project is designed as a **Proof-of-Concept (PoC)** for a kiosk-style interactive assistant that detects user questions and guides them through a process.


## 🎯 Features

### 🎙 Speech-to-Text (STT)
- Microphone recording via MediaRecorder API
- Audio sent to backend
- Processed with **Deepgram API (free tier)**

### 🤖 AI Chat (LLM)
- Powered by **Groq LLaMA 3.1 8B Instant**
- Low-latency inference
- Contextual and helpful responses

### 🔊 Text-to-Speech (TTS)
- Converts AI output into natural speech
- Implemented with **gTTS** (free)
- Returned to frontend as Base64 MP3

### 🖥 User Interface
- Clean violet-themed UI
- Animated message bubbles
- Typing indicator
- Toggle recording button
- Auto-scroll chat window
- Clear chat history button
- Frontend log viewer for debugging

### ☁️ Deployment
- **Frontend:** Vercel  
- **Backend:** Render (Python + FastAPI)


## ⚙️ Tech Stack

| Category | Tools |
|---------|-------|
| Frontend | TypeScript, Vite |
| Styling | Custom CSS, animations |
| Audio | MediaRecorder API, HTMLAudioElement |
| Backend | FastAPI, Uvicorn, Python 3 |
| AI APIs | Deepgram STT, Groq LLM, gTTS TTS |
| Deployment | Vercel + Render |
| Logs | LocalStorage (frontend), Python logger (backend) |


## 📁 Project Structure

**backend/** — backend source folder (FastAPI) <br>
**backend/app/** — main backend application package <br>
**backend/app/routes/** — STT, TTS, Chat API endpoints <br>
**backend/app/logger.py** — backend logging system <br>
**backend/app/config.py** — environment variables & API keys loader <br>
**backend/app/main.py** — FastAPI initialization, routers, CORS <br>
**backend/requirements.txt** — Python dependencies <br>
**backend/render.yaml** — Render deployment configuration <br>

**frontend/** — frontend source folder (TypeScript + Vite) <br>
**frontend/public/** — static assets (icons, favicon, voicer-logo.svg) <br>
**frontend/src/api/** — functions for calling backend APIs (STT, Chat, TTS) <br>
**frontend/src/components/** — reusable UI components (Navbar, ChatWindow, RecordButton, etc.) <br>
**frontend/src/hooks/** — custom TypeScript hooks (useRecorder) <br>
**frontend/src/pages/** — main pages (Home, FrontendLogs) <br>
**frontend/src/styles/** — global.css and theme styling <br>
**frontend/src/types.ts** — shared TypeScript types (Message, Sender, Logs) <br>

**package.json** — frontend dependencies & scripts <br>
**vite.config.ts** — Vite configuration <br>
**tsconfig.json** — TypeScript configuration <br>
**README.md** — project documentation <br>


## 🚀 How to Run the Project
**Clone the repository:** <br>
`git clone https://github.com/mathewtroy/voicer.git` <br>
`cd voicer`


**Backend (FastAPI):** <br>

`cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn backend.app.main:app --reload
`

Backend runs at:
http://127.0.0.1:8000

Swagger UI: http://127.0.0.1:8000/docs


**Frontend (TypeScript + Vite):** <br>

`cd frontend
npm install
npm run dev
`

Frontend runs at:
http://localhost:5173

🌍 Environment Variables
`
DEEPGRAM_API_KEY=api_key...
GROQ_API_KEY=api_key...
`



## 🧠 Project Purpose
This PoC demonstrates an integrated pipeline for:
- speech → text
- text → reasoning (LLM)
- reasoning → speech
  
It is good for kiosk interfaces, onboarding helpers, voice assistants, and accessibility tools.

© 2025 Aleksandr Kross
