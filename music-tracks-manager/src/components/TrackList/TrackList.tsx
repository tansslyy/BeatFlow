import React from "react";
import { Track } from "../../api/track/models/Track";
import { Box, Typography, List, ListItem, Divider, Paper } from "@mui/material";
import { PageList } from "../../types/PageList";
import { TrackListItem } from "./TrackListItem";

interface Props {
  tracks: PageList<Track> | undefined;
  onTrackDelete: (trackId: string) => void;
  onTrackUpdated: (track: Track) => void;
}

export const TrackList: React.FC<Props> = ({
  tracks,
  onTrackDelete,
  onTrackUpdated,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1400,
        margin: "0 auto",
        px: { xs: 2, sm: 3, md: 4, lg: 5 },
        py: { xs: 3, sm: 4, md: 5 },
        minHeight: "100vh",
        background: "linear-gradient(180deg, #fafbff 0%, #f0f4ff 100%)",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          textAlign: "center",
          mb: { xs: 4, sm: 5, md: 6 },
          position: "relative",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            background:
              "linear-gradient(135deg, #ff758c 0%, #ff7eb3 50%, #ff758c 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: -1.5,
            fontSize: { xs: "2rem", sm: "2.75rem", md: "3.5rem", lg: "4rem" },
            mb: 1.5,
            animation: "fadeInDown 0.8s ease-out",
            "@keyframes fadeInDown": {
              from: {
                opacity: 0,
                transform: "translateY(-20px)",
              },
              to: {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          }}
        >
          Your Music Library
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#64748b",
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
            fontWeight: 500,
          }}
        >
          {tracks?.data.length || 0} tracks in your collection
        </Typography>
      </Box>

      {/* Track Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" },
          gap: { xs: 2, sm: 2.5, md: 3 },
          width: "100%",
        }}
      >
        {tracks?.data.map((track, index) => (
          <Box
            key={track.id}
            sx={{
              animation: "fadeInUp 0.6s ease-out",
              animationDelay: `${index * 0.08}s`,
              animationFillMode: "both",
              "@keyframes fadeInUp": {
                from: {
                  opacity: 0,
                  transform: "translateY(20px)",
                },
                to: {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              },
            }}
          >
            <TrackListItem
              track={track}
              onDelete={onTrackDelete}
              onTrackUpdated={onTrackUpdated}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
