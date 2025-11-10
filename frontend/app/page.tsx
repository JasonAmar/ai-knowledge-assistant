"use client";
import { useState } from "react";
import FileUploader from "./components/FileUploader";
import ChatUI from "./components/ChatUI";

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>(
    []
  );

  const handleAsk = async (question: string) => {
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    const form = new FormData();
    form.append("question", question);
    const res = await fetch("http://localhost:8000/api/chat/ask", {
      method: "POST",
      body: form,
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { role: "assistant", text: data.answer }]);
  };

  return (
    <main className="flex flex-col gap-6 max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center">
        🧠 AI Knowledge Assistant
      </h1>
      <FileUploader />
      <ChatUI messages={messages} onAsk={handleAsk} />
    </main>
  );
}
