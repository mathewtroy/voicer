const BASE_URL = import.meta.env.VITE_API_URL;

export async function sendAudioToSTT(audioBlob: Blob): Promise<string> {
  const formData = new FormData();
  formData.append("audio", audioBlob, "recording.webm");

  const response = await fetch(`${BASE_URL}/api/stt`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("STT API error");

  const data = await response.json();
  return data.text;
}
