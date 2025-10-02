import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import { Track } from "../../api/track/models/Track";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";

const TinyText = (props: any) => (
  <Typography
    {...props}
    sx={{ fontSize: "0.75rem", opacity: 0.6, fontWeight: 500 }}
  />
);

type Props = {
  track: Track;
};

export const MusicPlayer: React.FC<Props> = ({ track }) => {
  const { audioRef, isPlaying, currentTrackId, togglePlay } = useAudioPlayer();
  const [position, setPosition] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(0.3);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setPosition(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
    };
  }, [track, audioRef]);

  const handleTimeChange = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setPosition(value);
    }
  };

  const handleVolumeChange = (value: number) => {
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
      setVolume(value / 100);
    }
  };

  const formatDuration = (value: number) => {
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <Box>
      <Slider
        aria-label="time-indicator"
        size="small"
        value={position}
        min={0}
        max={duration}
        onChange={(_, value) => handleTimeChange(value as number)}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <TinyText>{formatDuration(position)}</TinyText>
        <TinyText>{formatDuration(duration - position)}</TinyText>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
        <IconButton>
          <FastRewindRounded fontSize="large" />
        </IconButton>
        <IconButton
          onClick={() => {
            if (track.audioFile) {
              togglePlay(
                track.id,
                `http://localhost:8000/api/files/${track.audioFile}`
              );
            }
          }}
        >
          {isPlaying && currentTrackId === track.id ? (
            <PauseRounded sx={{ fontSize: 36 }} />
          ) : (
            <PlayArrowRounded sx={{ fontSize: 36 }} />
          )}
        </IconButton>
        <IconButton>
          <FastForwardRounded fontSize="large" />
        </IconButton>
      </Box>

      <Stack spacing={2} direction="row" alignItems="center">
        <VolumeDownRounded />
        <Slider
          aria-label="Volume"
          value={volume * 100}
          onChange={(_, value) => handleVolumeChange(value as number)}
        />
        <VolumeUpRounded />
      </Stack>

      <audio ref={audioRef} preload="metadata" />
    </Box>
  );
};
