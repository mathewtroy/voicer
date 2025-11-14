interface AudioPlayerProps {
  audioBase64: string;
}

export default function AudioPlayer({ audioBase64 }: AudioPlayerProps) {
  if (!audioBase64) return null;

  const audioUrl = "data:audio/mp3;base64," + audioBase64;

  return (
    <audio autoPlay>
      <source src={audioUrl} type="audio/mp3" />
    </audio>
  );
}
