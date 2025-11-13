from fastapi import FastAPI

app = FastAPI(title="Voicer Backend")

@app.get("/")
def root():
    return {"message": "Voicer backend is running"}
