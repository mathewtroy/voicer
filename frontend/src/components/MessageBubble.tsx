interface MessageBubbleProps {
  text: string;
  sender: "user" | "assistant";
}

export default function MessageBubble({ text, sender }: MessageBubbleProps) {
  const cls = sender === "user" ? "message-user" : "message-ai";

  return (
    <div className={cls}>
      <div className="message-text">{text}</div>
    </div>
  );
}
