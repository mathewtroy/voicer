import { useState } from "react";
import ChatWindow from "../components/ChatWindow";
import RecordButton from "../components/RecordButton";
import type { Message } from "../types";
import "../styles/global.css";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAssistantResponding, setIsAssistantResponding] = useState(false);

  function handleClearChat() {
    setMessages([]);
  }

  function downloadChat() {
    if (messages.length === 0) return;

    const lines = messages.map((m) => {
      const sender = m.sender === "user" ? "User" : "Assistant";
      return `${sender}: ${m.text}`;
    });

    const text = lines.join("\n\n");

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "voicer_chat_history.txt";
    a.click();
  }

  return (
    <div className="app-container">
      <div className="welcome-box">
        <h1 className="welcome-title">Welcome to Voicer</h1>
        <p className="welcome-sub">
          Your personal voice-powered AI assistant.{" "}
          Hold the button to speak. I will listen, think, and talk back.
        </p>
      </div>

      <div className="clear-chat-container">
        <button className="clear-chat-btn" onClick={handleClearChat}>
          Clear Chat
        </button>

        <button className="download-chat-btn" onClick={downloadChat}>
          Download Chat
        </button>
      </div>

      <ChatWindow
        messages={messages}
        isAssistantResponding={isAssistantResponding}
      />

      <div className="input-container">
        <RecordButton
          setMessages={setMessages}
          setIsAssistantResponding={setIsAssistantResponding}
        />
      </div>
    </div>
  );
}
