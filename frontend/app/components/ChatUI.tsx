"use client";
import { useState } from "react";
import MessageBubble from "./MessageBubble";

interface ChatUIProps {
  messages: { role: string; text: string }[];
  onAsk: (q: string) => void;
}

export default function ChatUI({ messages, onAsk }: ChatUIProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onAsk(input);
    setInput("");
  };

  return (
    <div className="w-full border rounded-xl p-4 shadow-lg bg-white">
      <div className="h-72 overflow-y-auto mb-3 space-y-2">
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} text={msg.text} />
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-lg p-2"
          placeholder="Ask something..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}
