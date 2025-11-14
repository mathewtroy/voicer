import { useEffect, useRef } from "react";

interface AudioPlayerProps {
  audioBase64: string;
}

export default function AudioPlayer({ audioBase64 }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // If reset ttsAudio -> stop and reset the player
    if (!audioBase64) {
      audio.pause();
      audio.currentTime = 0;
      return;
    }

    const audioUrl = "data:audio/mp3;base64," + audioBase64;
    audio.src = audioUrl;

    const playAudio = async () => {
      try {
        await audio.play();
        console.log("Audio: playing");
      } catch (err) {
        console.warn("Audio autoplay blocked:", err);
        setTimeout(() => {
          audio.play().catch((retryErr) => {
            console.error("Audio retry failed:", retryErr);
          });
        }, 300);
      }
    };

    playAudio();
  }, [audioBase64]);

  return <audio ref={audioRef} />;
}
