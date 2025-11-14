import { useState } from "react";
import ChatWindow from "../components/ChatWindow";
import RecordButton from "../components/RecordButton";
import type { Message } from "../types";
import "../styles/global.css";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAssistantResponding, setIsAssistantResponding] = useState(false);

  return (
    <div className="app-container">
      <div className="welcome-box">
        <img
          src="/voicer-icon.svg"
          alt="Voicer Icon"
          style={{ width: 70, marginBottom: 10, opacity: 0.9 }}
        />

        <h1 className="welcome-title">Welcome to Voicer</h1>
        <p className="welcome-sub">
          Your personal voice-powered AI assistant.  
          Hold the button to speak — I’ll listen, think, and talk back.
        </p>
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
