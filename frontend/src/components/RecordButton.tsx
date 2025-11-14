import { useState } from "react";
import { useRecorder } from "../hooks/useRecorder";
import { sendAudioToSTT } from "../api/stt";
import { sendTextToChat } from "../api/chat";
import { sendTextToTTS } from "../api/tts";
import AudioPlayer from "./AudioPlayer";
import type { Message } from "../types";

interface Props {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setIsAssistantResponding: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RecordButton({
  setMessages,
  setIsAssistantResponding,
}: Props) {
  const { startRecording, stopRecording, isRecording } = useRecorder();

  const [status, setStatus] = useState("Idle");
  const [ttsAudio, setTtsAudio] = useState("");

  async function handleClick() {
    // If the assistant is speaking — stop the speech before starting recording
    if (!isRecording && ttsAudio) {
      setTtsAudio("");
      setStatus("Recording...");
      await startRecording();
      return;
    }

    // Start recording
    if (!isRecording) {
      setStatus("Recording...");
      await startRecording();
      return;
    }

    // Stop recording
    setStatus("Processing...");
    const audioBlob = await stopRecording();

    if (!audioBlob) {
      setStatus("Idle");
      return;
    }

    try {
      // 1) STT
      const text = await sendAudioToSTT(audioBlob);

      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: "user", text },
      ]);

      // 2) Chat
      setIsAssistantResponding(true);
      const reply = await sendTextToChat(text);

      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: "assistant", text: reply },
      ]);

      // 3) TTS
      const audioBase64 = await sendTextToTTS(reply);
      setTtsAudio(audioBase64);

      setIsAssistantResponding(false);
      setStatus("Idle");
    } catch (err) {
      console.error(err);
      setStatus("Error...");
      setIsAssistantResponding(false);
      setTimeout(() => setStatus("Idle"), 1200);
    }
  }

  return (
    <div className="record-container">
      <button
        className={`record-button ${isRecording ? "recording" : ""}`}
        onClick={handleClick}
      />

      <p
        className={`status-text ${
          isRecording
            ? "status-recording"
            : status === "Processing..."
            ? "status-processing"
            : "status-idle"
        }`}
      >
        {status}
      </p>

      {ttsAudio && <AudioPlayer audioBase64={ttsAudio} />}
    </div>
  );
}
