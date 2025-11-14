import { useState } from "react";
import { useRecorder } from "../hooks/useRecorder";
import { sendAudioToSTT } from "../api/stt";
import { sendTextToChat } from "../api/chat";
import { sendTextToTTS } from "../api/tts";
import AudioPlayer from "./AudioPlayer";
import type { Message } from "../types";

interface Props {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export default function RecordButton({ setMessages }: Props) {
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
      // 1) STT — speech → text
      const text = await sendAudioToSTT(audioBlob);
      console.log("STT:", text);

      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: "user", text },
      ]);

      // 2) Chat — LLM response
      const reply = await sendTextToChat(text);

      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: "assistant", text: reply },
      ]);

      // 3) TTS — voice synthesis of the response
      const audioBase64 = await sendTextToTTS(reply);
      setTtsAudio(audioBase64);
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong…");
      setTimeout(() => setStatus(""), 2000);
      return;
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
