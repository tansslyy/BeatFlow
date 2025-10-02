import React, { useEffect, useState } from "react";
import { Track } from "../../api/track/models/Track";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";
import { PlayTrack } from "../PlayTrack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { EditTrackModal } from "../EditTRack/EditTrackModal";
import { UploadTrackFile } from "../UploadTrtackFile/UploadTrackFile";
import { Link } from "react-router-dom";
import { DeleteTrakcFile } from "../DeleteTrackFile/DeleteTrackFile";

interface TrackItemProps {
  track: Track;
  onDelete: (trackId: string) => void;
  onTrackUpdated: (track: Track) => void;
}

export const TrackListItem: React.FC<TrackItemProps> = ({
  track,
  onDelete,
  onTrackUpdated,
}) => {
  const theme = useTheme();
  const player = useAudioPlayer();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setIsEditOpen(true);
    handleMenuClose();
  };

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        minHeight: 80,
        px: 3,
        py: 1.5,
        borderRadius: 3,
        boxShadow: 2,
        background: "linear-gradient(120deg, #ffe6f0 0%, #fff0f5 100%)",
        "&:hover": {
          background: "linear-gradient(120deg, #ffd6e8 0%, #ffb3d1 100%)",
          boxShadow: 6,
          transform: "scale(1.02)",
        },
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
    >
      {/* Обкладинка */}
      <CardMedia
        component="img"
        sx={{
          width: 60,
          height: 60,
          borderRadius: 2,
          flexShrink: 0,
          objectFit: "cover",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        }}
        image={
          track.coverImage ||
          "https://media.istockphoto.com/id/2167996762/uk/%D1%84%D0%BE%D1%82%D0%BE/flamingos-on-lake.jpg?s=2048x2048&w=is&k=20&c=A_twH4lS0xkDGqh1oSO9aOEREPNEJpdRUkwOwsXN7nE="
        }
        alt={track.title}
      />

      {/* Infornation */}
      <Box
        component={Link}
        to={`/track/${track.slug}`}
        sx={{ flexGrow: 1, ml: 3, minWidth: 0 }}
      >
        <CardContent sx={{ py: 0 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: "1rem",
              color: "#d81b60",
            }}
          >
            {track.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              mt: 0.25,
              fontSize: "0.875rem",
              color: "#8e24aa",
            }}
          >
            {track.artist}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              mt: 0.25,
              fontSize: "0.8rem",
              fontStyle: "italic",
              color: "#6a1b9a",
            }}
          >
            {track.album || "Unknown album"}
          </Typography>
        </CardContent>
      </Box>

      {/* Кнопки керування */}
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1.5, flexShrink: 0 }}
      >
        <PlayTrack key={track.id} track={track} player={player} />
        <IconButton
          color="error"
          sx={{ "&:hover": { backgroundColor: "rgba(244,67,54,0.2)" } }}
          onClick={() => onDelete(track.id)}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" } }}
          onClick={handleMenuClick}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleEditClick}>Edit Track</MenuItem>
        {/* <MenuItem>
          {" "}
          <UploadTrackFile
            trackId={track.id}
            existingFileUrl={track.audioFile || ""}
            onFileUploaded={(url) =>
              onTrackUpdated({ ...track, audioFile: url })
            }
          />
        </MenuItem> */}
        {/* <MenuItem>
          <DeleteTrakcFile
            trackId={track.id}
            onFileRemoved={() => onTrackUpdated({ ...track, audioFile: "" })}
          />
        </MenuItem> */}
      </Menu>

      <EditTrackModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        track={track}
        onTrackUpdated={onTrackUpdated}
      />

      {/* <Slider
        aria-label="time-indicator"
        size="small"
        value={position}
        min={0}
        step={1}
        max={duration}
        onChange={(_, value) => setPosition(value)}
        sx={(t) => ({
          color: "rgba(0,0,0,0.87)",
          height: 4,
          "& .MuiSlider-thumb": {
            width: 8,
            height: 8,
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            "&::before": {
              boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
            },
            "&:hover, &.Mui-focusVisible": {
              boxShadow: `0px 0px 0px 8px ${"rgb(0 0 0 / 16%)"}`,
              ...t.applyStyles("dark", {
                boxShadow: `0px 0px 0px 8px ${"rgb(255 255 255 / 16%)"}`,
              }),
            },
            "&.Mui-active": {
              width: 20,
              height: 20,
            },
          },
          "& .MuiSlider-rail": {
            opacity: 0.28,
          },
          ...t.applyStyles("dark", {
            color: "#fff",
          }),
        })}
      /> */}
    </Card>
  );
};
