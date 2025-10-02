import React, { useState } from "react";
import { createTrack } from "../../api/track/trackApi";
import { CreateTrack } from "../../api/track/models/CreateTrack";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Paper,
} from "@mui/material";

interface Props {
  onSave: (track: CreateTrack) => void;
}

export const TrackForm = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [genres, setGenres] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !artist) {
      alert("Title and Artist are required.");
      return;
    }

    if (coverImage && !/^https?:\/\/.*\.(jpg|jpeg|png|gif)$/.test(coverImage)) {
      alert("Invalid image URL");
      return;
    }
  };

  const handleSave = async (trackData: CreateTrack) => {
    try {
      const newTrack = await createTrack(trackData);
      if (newTrack) {
      }
    } catch (err) {
      console.error("Помилка створення треку:", err);
      alert("Не вдалося створити трек");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 500,
        mx: "auto",
        p: 4,
        borderRadius: 3,
        background: "linear-gradient(145deg, #fdfdfd, #f5f5fa)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{ fontWeight: "bold", mb: 3, color: "#333" }}
      >
        Add / Edit Track
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Track Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Album"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          fullWidth
        />
        <Button
          variant="outlined"
          component="label"
          sx={{
            borderRadius: 2,
            borderColor: "#888",
            color: "#555",
            textTransform: "none",
            "&:hover": { borderColor: "#555" },
          }}
        >
          Upload Cover Image
          <input
            type="file"
            hidden
            onChange={(e) => setCoverImage(e.target.value)}
          />
        </Button>

        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 1,
            borderRadius: 2,
            background: "linear-gradient(to right, #4a90e2, #50e3c2)",
            color: "#fff",
            py: 1.5,
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
              background: "linear-gradient(to right, #50e3c2, #4a90e2)",
            },
          }}
        >
          Save
        </Button>
      </Box>
    </Paper>
  );
};
function onSave(arg0: {}) {
  throw new Error("Function not implemented.");
}
