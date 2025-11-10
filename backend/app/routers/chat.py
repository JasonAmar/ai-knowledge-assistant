from fastapi import APIRouter, Form, HTTPException
from app.core import embeddings, llm
from app.routers.documents import index_state

router = APIRouter(prefix="/api/chat", tags=["Chat"])

@router.post("/ask")
async def ask_question(question: str = Form(...)):
    if not index_state["index"]:
        raise HTTPException(400, "No document uploaded yet.")
    context = embeddings.query_index(index_state["index"], index_state["texts"], question)
    answer = llm.generate_answer(question, context)
    return {"answer": answer, "context": context[:2]}
