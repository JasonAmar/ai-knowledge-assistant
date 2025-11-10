"use client";
import { useState } from "react";

export default function FileUploader() {
  const [status, setStatus] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setStatus("Uploading...");
    const res = await fetch("http://localhost:8000/api/documents/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setStatus(data.message || "Uploaded!");
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <input type="file" accept=".pdf,.txt" onChange={handleUpload} />
      {status && <p className="text-sm text-gray-600">{status}</p>}
    </div>
  );
}
