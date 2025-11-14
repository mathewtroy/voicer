import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import type { Message } from "../types";

interface ChatWindowProps {
  messages: Message[];
  isAssistantResponding: boolean;
}

export default function ChatWindow({
  messages,
  isAssistantResponding,
}: ChatWindowProps) {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isAssistantResponding]);

  return (
    <div className="chat-container" ref={chatRef}>
      {messages.length === 0 && (
        <p className="welcome-sub" style={{ opacity: 0.6 }}>
          Start speaking to begin the conversation…
        </p>
      )}

      {isAssistantResponding && <TypingIndicator />}

      {messages.map((msg) => (
        <MessageBubble key={msg.id} text={msg.text} sender={msg.sender} />
      ))}
    </div>
  );
}
