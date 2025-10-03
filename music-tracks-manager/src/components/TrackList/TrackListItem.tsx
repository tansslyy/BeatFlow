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
import { Link } from "react-router-dom";

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
    event.preventDefault();
    event.stopPropagation();
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
    <>
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          minHeight: 110,
          px: { xs: 2, sm: 2.5, md: 3 },
          py: 2.5,
          borderRadius: 3,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(102, 126, 234, 0.12)",
          boxShadow: "0 4px 20px rgba(102, 126, 234, 0.06)",
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          cursor: "pointer",
          overflow: "hidden",
          position: "relative",
          boxSizing: "border-box",
          "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 4,
            background:
              "linear-gradient(135deg, #ff758c 0%, #ff7eb3 50%, #ff758c 100%)",
            transform: "scaleY(0)",
            transition: "transform 0.4s ease",
          },
          "&:hover": {
            background: "rgba(255, 255, 255, 1)",
            boxShadow: "0 12px 40px rgba(102, 126, 234, 0.15)",
            transform: "translateY(-4px)",
            border: "1px solid rgba(102, 126, 234, 0.25)",
            "&::before": {
              transform: "scaleY(1)",
            },
            "& .track-cover": {
              transform: "scale(1.08) rotate(2deg)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.18)",
            },
            "& .track-cover-overlay": {
              opacity: 1,
            },
            "& .track-play-icon": {
              transform: "scale(1)",
            },
            "& .track-title": {
              color: "#ff7eb3",
              transform: "translateX(3px)",
            },
            "& .control-button": {
              transform: "scale(1.05)",
            },
          },
        }}
      >
        {/* Cover Image */}
        <Box
          sx={{
            position: "relative",
            flexShrink: 0,
            mr: { xs: 2, sm: 2.5, md: 3 },
          }}
        >
          <CardMedia
            component="img"
            className="track-cover"
            sx={{
              width: { xs: 70, sm: 75, md: 80 },
              height: { xs: 70, sm: 75, md: 80 },
              borderRadius: 2.5,
              objectFit: "cover",
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              position: "relative",
              zIndex: 1,
            }}
            image={
              track.coverImage ||
              "https://media.istockphoto.com/id/2167996762/uk/photo/flamingos-on-lake.jpg?s=2048x2048&w=is&k=20&c=A_twH4lS0xkDGqh1oSO9aOEREPNEJpdRUkwOwsXN7nE="
            }
            alt={track.title}
          />

          {/* Gradient Overlay */}
          <Box
            className="track-cover-overlay"
            sx={{
              position: "absolute",
              inset: 0,
              borderRadius: 2.5,
              opacity: 0,
              transition: "opacity 0.3s ease",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Play Icon */}
            <Box
              className="track-play-icon"
              sx={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.98)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: "scale(0)",
                transition:
                  "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            >
              <Box
                sx={{
                  width: 0,
                  height: 0,
                  borderLeft: "7px solid #ff7eb3",
                  borderTop: "5px solid transparent",
                  borderBottom: "5px solid transparent",
                  ml: 0.4,
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Track Info */}
        <Box
          component={Link}
          to={`/track/${track.slug}`}
          sx={{
            flexGrow: 1,
            minWidth: 0,
            textDecoration: "none",
            position: "relative",
            zIndex: 1,
            pr: { xs: 1.5, sm: 2 },
          }}
        >
          <CardContent sx={{ py: 0, px: 0, "&:last-child": { pb: 0 } }}>
            <Typography
              className="track-title"
              variant="h6"
              sx={{
                fontWeight: 700,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                color: "#0f172a",
                mb: 0.5,
                transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                letterSpacing: -0.3,
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
                fontSize: { xs: "0.85rem", sm: "0.9rem" },
                color: "#64748b",
                mb: 0.5,
                fontWeight: 500,
              }}
            >
              {track.artist}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #ff7eb3 0%, #764ba2 100%)",
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontSize: { xs: "0.75rem", sm: "0.8rem" },
                  color: "#94a3b8",
                  fontWeight: 500,
                }}
              >
                {track.album || "Unknown album"}
              </Typography>
            </Box>
          </CardContent>
        </Box>

        {/* Controls */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 0.75 },
            flexShrink: 0,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              backdropFilter: "blur(10px)",
              borderRadius: 2,
              p: 0.5,
              display: "flex",
              gap: 0.5,
            }}
          >
            <Box className="control-button">
              <PlayTrack key={track.id} track={track} player={player} />
            </Box>
            <IconButton
              className="control-button"
              size="medium"
              sx={{
                color: "#ef4444",
                transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                "&:hover": {
                  background: "#ef4444",
                  color: "#fff",
                },
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete(track.id);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
            <IconButton
              className="control-button"
              size="medium"
              sx={{
                color: "#667eea",
                transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                "&:hover": {
                  background: "#667eea",
                  color: "#fff",
                },
              }}
              onClick={handleMenuClick}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Card>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            borderRadius: 2.5,
            boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
            border: "1px solid rgba(102, 126, 234, 0.15)",
            minWidth: 160,
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(20px)",
            mt: 1,
          },
        }}
      >
        <MenuItem
          onClick={handleEditClick}
          sx={{
            fontSize: "0.9rem",
            py: 1.25,
            px: 2,
            fontWeight: 500,
            color: "#334155",
            borderRadius: 1.5,
            mx: 0.75,
            my: 0.5,
            transition: "all 0.2s ease",
            "&:hover": {
              background:
                "linear-gradient(135deg, rgba(102, 126, 234, 0.12) 0%, rgba(240, 147, 251, 0.12) 100%)",
              transform: "translateX(3px)",
            },
          }}
        >
          Edit Track
        </MenuItem>
      </Menu>

      <EditTrackModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        track={track}
        onTrackUpdated={onTrackUpdated}
      />
    </>
  );
};
