const BASE_URL = import.meta.env.VITE_API_URL;

export async function sendTextToChat(message: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) throw new Error("Chat API error");

  return (await res.json()).reply;
}
