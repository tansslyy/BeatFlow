import React, { useEffect, useState } from "react";
import { Track } from "../api/track/models/Track";
import { useParams } from "react-router-dom";
import { fetchTrackbySlug } from "../api/track/trackApi";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { MusicPlayer } from "../components/MusicPlayer/MusicPlayer";

export const TrackPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [track, setTrack] = useState<Track | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      if (slug) {
        const result = await fetchTrackbySlug(slug);
        setTrack(result);
      }
    };
    fetchData();
  }, [slug]);

  if (!track) return <Typography>Loading or track not found</Typography>;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f7f7f7"
      minHeight="100vh"
      p={3}
    >
      <Card
        sx={{
          maxWidth: 700,
          width: "100%",
          borderRadius: 3,
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          overflow: "hidden",
          background: "linear-gradient(to bottom right, #ffffff, #f0f0f0)",
        }}
      >
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }}>
          <CardMedia
            component="img"
            sx={{
              width: { xs: "100%", md: 300 },
              height: { xs: "100%", md: "auto" },
              objectFit: "cover",
            }}
            image={
              track.coverImage ||
              "https://media.istockphoto.com/id/2167996762/uk/%D1%84%D0%BE%D1%82%D0%BE/flamingos-on-lake.jpg?s=2048x2048&w=is&k=20&c=A_twH4lS0xkDGqh1oSO9aOEREPNEJpdRUkwOwsXN7nE="
            }
            alt={track.title}
          />

          {/* 📄 Інформація */}
          <CardContent sx={{ flex: 1, p: 3 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {track.title}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {track.artist}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              {track.album} • {track.genres}
            </Typography>
            <Divider sx={{ my: 2 }} />

            {/* 🎵 Плеєр */}
            <MusicPlayer track={track} />

            <Typography variant="caption" display="block" sx={{ mt: 2 }}>
              Added: {track.createdAt}
            </Typography>
            <Typography variant="caption" display="block">
              Updated: {track.updatedAt}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};
