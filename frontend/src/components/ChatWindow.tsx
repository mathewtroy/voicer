import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import type { Message } from "../types";

interface ChatWindowProps {
  messages: Message[];
}

export default function ChatWindow({ messages }: ChatWindowProps) {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="chat-container" ref={chatRef}>
      {messages.length === 0 && (
        <p className="welcome-sub" style={{ opacity: 0.6 }}>
          Start speaking to begin the conversation…
        </p>
      )}

      {messages.map((msg) => (
        <MessageBubble key={msg.id} text={msg.text} sender={msg.sender} />
      ))}
    </div>
  );
}
