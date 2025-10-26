import { useState, useRef, useEffect } from "react";

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const songTitle = "Corte Americano (part. L7NNON) - Filipe Ret";

  useEffect(() => {
    const audio = audioRef.current;
    const autoplayAllowed = localStorage.getItem("musicAllowed");

    if (autoplayAllowed === "true") {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Autoplay bloqueado pelo navegador:", err);
        });
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      localStorage.setItem("musicAllowed", "false");
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          localStorage.setItem("musicAllowed", "true");
        })
        .catch((err) => {
          console.warn("Erro ao tentar tocar:", err);
        });
    }
  };

  return (
    <div className="music-player">
      <audio ref={audioRef} src="/music/trilha.mp3" loop preload="auto" />

      <div className="music-player__content">
        <button className="music-player__btn" onClick={togglePlay}>
          {isPlaying ? "⏸" : "▶"}
        </button>

        <p className="music-player__track">
          <span className="track-marquee">{songTitle}</span>
        </p>
      </div>
    </div>
  );

}

export default MusicPlayer;
