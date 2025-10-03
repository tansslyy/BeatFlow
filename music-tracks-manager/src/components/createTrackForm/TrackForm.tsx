import React, { useState } from "react";
import { createTrack } from "../../api/track/trackApi";
import { CreateTrack } from "../../api/track/models/CreateTrack";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

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
      elevation={6}
      sx={{
        maxWidth: 500,
        mx: "auto",
        p: 5,
        borderRadius: 4,
        background: "linear-gradient(145deg, #ffffff, #f0f4ff)",
        boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{
          fontWeight: "700",
          mb: 4,
          color: "#3b3f5c",
          letterSpacing: "0.5px",
        }}
      >
        Add / Edit Track
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <TextField
          label="Track Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              backgroundColor: "#f9f9ff",
              "&:hover fieldset": {
                borderColor: "#ff7eb3",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ff7eb3",
                boxShadow: "0 0 6px rgba(74,144,226,0.3)",
              },
            },
          }}
        />
        <TextField
          label="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          fullWidth
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              backgroundColor: "#f9f9ff",
              "&:hover fieldset": {
                borderColor: "#50e3c2",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#50e3c2",
                boxShadow: "0 0 6px rgba(80,227,194,0.3)",
              },
            },
          }}
        />
        <TextField
          label="Album"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              backgroundColor: "#f9f9ff",
              "&:hover fieldset": {
                borderColor: "#ffa726",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ffa726",
                boxShadow: "0 0 6px rgba(255,167,38,0.3)",
              },
            },
          }}
        />

        <Button
          variant="outlined"
          component="label"
          sx={{
            borderRadius: 3,
            borderColor: "#888",
            color: "#555",
            textTransform: "none",
            fontWeight: 500,
            "&:hover": { borderColor: "#555", backgroundColor: "#f5f5f5" },
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
            borderRadius: 3,
            background: "linear-gradient(135deg, #ff7eb3, #50e3c2)",
            color: "#fff",
            py: 1.8,
            fontWeight: "700",
            textTransform: "none",
            boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
            "&:hover": {
              background: "linear-gradient(135deg, #50e3c2, #4a90e2)",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Save
        </Button>
      </Box>
    </Paper>
  );
};
