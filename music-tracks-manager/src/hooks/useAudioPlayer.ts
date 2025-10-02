import { useEffect, useRef, useState } from "react";

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if(!audio) return;

    const handleEnded = () => {
      setIsPlaying(false)
    }

    audio.addEventListener("ended", handleEnded)
   
    return() => {
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  const togglePlay = (id: string, url: string) => {

    if (!audioRef.current) return;
    const audio = audioRef.current;
    
if(currentTrackId !== id) {
  audio.pause();
  audio.currentTime = 0;
  audio.src = url;


  audio.oncanplaythrough = () => {
    audio.play().catch((err) => console.error("Play error:", err));
    setIsPlaying(true);
    setCurrentTrackId(id)
  };
  
  return
}

  if(isPlaying) {
    audio.pause();
    setIsPlaying(false);
  } else {
    audio.play().catch((err) => console.error("Play error:", err));
    setIsPlaying(true)
  }

  };

  return { audioRef, currentTrackId, isPlaying, togglePlay };
}
