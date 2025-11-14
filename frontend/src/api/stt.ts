export async function sendAudioToSTT(audioBlob: Blob): Promise<string> {
  const formData = new FormData();
  formData.append("audio", audioBlob, "recording.webm");

  const response = await fetch("http://localhost:8000/api/stt", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("STT API error");
  }

  const data = await response.json();

  return data.text; // Deepgram returns { text: "..." }
}
