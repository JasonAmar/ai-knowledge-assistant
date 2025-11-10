"use client";

export default function MessageBubble({
  role,
  text,
}: {
  role: string;
  text: string;
}) {
  const isUser = role === "user";
  return (
    <div
      className={`max-w-[80%] p-2 rounded-2xl ${
        isUser
          ? "bg-blue-100 self-end text-right ml-auto"
          : "bg-gray-100 self-start text-left mr-auto"
      }`}
    >
      {text}
    </div>
  );
}
