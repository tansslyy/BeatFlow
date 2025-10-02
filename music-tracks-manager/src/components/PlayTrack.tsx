import React from "react";
import { Box, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { Track } from "../api/track/models/Track";

interface PlayTrackProps {
  track: Track;
  player: ReturnType<typeof useAudioPlayer>;
}

export const PlayTrack: React.FC<PlayTrackProps> = ({ track, player }) => {
  const { audioRef, isPlaying, currentTrackId, togglePlay } = player;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <audio ref={audioRef} style={{ width: "100%", borderRadius: 8 }} />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          onClick={() =>
            track.audioFile &&
            togglePlay(
              track.id,
              `http://localhost:8000/api/files/${track.audioFile}`
            )
          }
        >
          {currentTrackId === track.id && isPlaying ? (
            <PauseIcon sx={{ height: 38, width: 38 }} />
          ) : (
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};
