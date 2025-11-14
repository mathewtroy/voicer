const BASE_URL = import.meta.env.VITE_API_URL;

export async function sendTextToTTS(text: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/api/tts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, language: "en" }),
  });

  if (!res.ok) throw new Error("TTS API error");

  return (await res.json()).audio_base64;
}
