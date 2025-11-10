import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import documents, chat

app = FastAPI(title="AI Knowledge Assistant", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.include_router(documents.router)
app.include_router(chat.router)

@app.get("/")
async def root():
    return {"message": "API running successfully"}

def start():
    """Launched with `poetry run start` at root level"""
    uvicorn.run("app.main:app", host="localhost", port=8000, reload=True)
