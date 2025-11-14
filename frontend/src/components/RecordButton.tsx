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
  const [status, setStatus] = useState("");
  const [ttsAudio, setTtsAudio] = useState("");

  async function handlePress() {
    setStatus("Recording...");
    await startRecording();
  }

  async function handleRelease() {
    setStatus("Processing...");
    const audioBlob = await stopRecording();
    if (!audioBlob) return;

    try {
      // 1) STT
      const text = await sendAudioToSTT(audioBlob);

      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: "user", text },
      ]);

      // Assistant thinking
      setIsAssistantResponding(true);

      // 2) Chat
      const reply = await sendTextToChat(text);

      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: "assistant", text: reply },
      ]);

      // 3) TTS (speaking)
      const audioBase64 = await sendTextToTTS(reply);
      setTtsAudio(audioBase64);

      // Assistant finished thinking
      setIsAssistantResponding(false);
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong…");

      // Turn off the indicator in case of an error
      setIsAssistantResponding(false);

      setTimeout(() => setStatus(""), 1500);
    }

    setStatus("");
  }

  return (
    <div style={{ textAlign: "center" }}>
      <button
        className={`record-button ${isRecording ? "recording" : ""}`}
        onMouseDown={handlePress}
        onMouseUp={handleRelease}
        onTouchStart={handlePress}
        onTouchEnd={handleRelease}
      />

      <p style={{ opacity: 0.7, marginTop: 10 }}>{status}</p>

      {ttsAudio && <AudioPlayer audioBase64={ttsAudio} />}
    </div>
  );
}
