import { useRef, useState } from "react";

export function useRecorder() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const audioChunks = useRef<Blob[]>([]);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const recorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorderRef.current = recorder;
      audioChunks.current = [];
      recorder.ondataavailable = (e) => audioChunks.current.push(e.data);

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Recorder error:", err);
    }
  }

  async function stopRecording(): Promise<Blob | null> {
    return new Promise((resolve) => {
      if (!mediaRecorderRef.current) return resolve(null);

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: "audio/webm" });
        resolve(blob);
        setIsRecording(false);
      };

      mediaRecorderRef.current.stop();
    });
  }

  return { startRecording, stopRecording, isRecording };
}
