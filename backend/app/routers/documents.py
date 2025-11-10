from fastapi import APIRouter, UploadFile, HTTPException
from app.core import pdf_loader, embeddings

router = APIRouter(prefix="/api/documents", tags=["Documents"])
index_state = {"index": None, "texts": []}

@router.post("/upload")
async def upload_document(file: UploadFile):
    if not file.filename.endswith((".pdf", ".txt")):
        raise HTTPException(400, "Unsupported file type")

    data = await file.read()
    text = pdf_loader.extract_text(data, file.filename)
    index, texts = embeddings.create_index(text)
    index_state.update({"index": index, "texts": texts})

    return {"message": f"{file.filename} uploaded successfully."}
