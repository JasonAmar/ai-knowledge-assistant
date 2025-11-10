import requests

def generate_answer(question: str, context_chunks: list[str]) -> str:
    context = "\n".join(context_chunks)
    prompt = f"Context:\n{context}\n\nQuestion: {question}\nAnswer:"

    url = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"
    headers = {"Authorization": "Bearer YOUR_HF_TOKEN"}  # optional but faster
    response = requests.post(url, headers=headers, json={"inputs": prompt})
    try:
        return response.json()[0]["generated_text"].split("Answer:")[-1].strip()
    except Exception:
        return "Sorry, I couldn’t generate an answer."
