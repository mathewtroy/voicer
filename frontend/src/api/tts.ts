const API_URL = import.meta.env.VITE_API_URL;

export async function sendTextToTTS(text: string): Promise<string> {
  const response = await fetch(`${API_URL}/api/tts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, language: "en" }),
  });

  if (!response.ok) {
    throw new Error("TTS API error");
  }

  const data = await response.json();
  return data.audio_base64;
}
