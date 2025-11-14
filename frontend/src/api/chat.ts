export async function sendTextToChat(message: string): Promise<string> {
  const response = await fetch("http://localhost:8000/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("Chat API error");
  }

  const data = await response.json();
  return data.reply;
}
