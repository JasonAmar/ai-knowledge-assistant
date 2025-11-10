from sentence_transformers import SentenceTransformer
import faiss

model = SentenceTransformer("all-MiniLM-L6-v2")

def create_index(text: str):
    chunks = [c.strip() for c in text.split("\n") if c.strip()]
    vectors = model.encode(chunks, convert_to_numpy=True)
    index = faiss.IndexFlatL2(vectors.shape[1])
    index.add(vectors)
    return index, chunks

def query_index(index, texts, query: str, k: int = 3):
    q_vec = model.encode([query], convert_to_numpy=True)
    _, indices = index.search(q_vec, k)
    return [texts[i] for i in indices[0]]
