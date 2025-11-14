export async function sendTextToTTS(text: string): Promise<string> {
  const response = await fetch("http://localhost:8000/api/tts", {
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

  return data.audio_base64; // base64 string
}
