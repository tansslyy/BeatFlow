import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import { Chip } from "@mui/material";
import { useState } from "react";
import { editTrack } from "../../api/track/trackApi";
import { Track } from "../../api/track/models/Track";

interface EditTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  track: Track | null;
  onTrackUpdated: (track: Track) => void;
}

export const EditTrackModal: React.FC<EditTrackModalProps> = ({
  isOpen,
  onClose,
  onTrackUpdated,
  track,
}) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [genres, setGenres] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState("");
  const [newGenre, setNewGenre] = useState("");

  React.useEffect(() => {
    if (track) {
      setTitle(track.title);
      setArtist(track.artist);
      setAlbum(track.album || "");
      setGenres(track.genres || []);
      setCoverImage(track.coverImage || "");
      setNewGenre("");
    }
  }, [track]);

  const handleAddGenre = () => {
    const trimmedGenre = newGenre.trim();
    if (newGenre.trim() && !genres.includes(trimmedGenre)) {
      setGenres([...genres, trimmedGenre]);
      setNewGenre("");
    }
  };

  const handleRemoveGenre = (genreToRemove: string) => {
    setGenres(genres.filter((g) => g !== genreToRemove));
  };

  const validateImageUrl = (url: string) => {
    return /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  };

  const handleClose = () => {
    setTitle("");
    setArtist("");
    setAlbum("");
    setGenres([]);
    setCoverImage("");
    setNewGenre("");
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!track) return;
    if (!title.trim() || !artist.trim()) {
      alert("Track title and artist are required");
      return;
    }

    if (!coverImage) {
      alert("Invalid image link format");
      return;
    }

    const trackData = {
      id: track.id,
      slug: track.slug,
      title,
      artist,
      album,
      coverImage: coverImage,
      genres,
      audioFile: track?.audioFile,
      createdAt: track?.createdAt,
      updatedAt: track?.updatedAt,
    };

    try {
      const savedTrack = await editTrack(trackData);
      if (savedTrack) {
        onTrackUpdated(savedTrack);
        handleClose();
      } else {
        console.log("Track was not saved");
      }
    } catch (error) {
      console.log("Error creating track:", error);
    }
  };
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 4,
            padding: 3,
            background: "linear-gradient(145deg, #fdfcff, #e3f0ff)",
            boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
          },
        }}
      >
        {/* Title */}
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: "1.6rem",
            textAlign: "center",
            color: "#1e3a8a",
            mb: 2,
            letterSpacing: "0.5px",
          }}
        >
          Edit Track
        </DialogTitle>

        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            id="create-track-form"
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {/* Text Fields */}
            {[
              {
                label: "Track Title",
                value: title,
                onChange: setTitle,
                required: true,
              },
              {
                label: "Artist",
                value: artist,
                onChange: setArtist,
                required: true,
              },
              { label: "Album", value: album, onChange: setAlbum },
              {
                label: "Cover Image URL",
                value: coverImage,
                onChange: setCoverImage,
                placeholder: "https://...",
              },
            ].map((field, idx) => (
              <TextField
                key={idx}
                label={field.label}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                fullWidth
                required={field.required || false}
                placeholder={field.placeholder || ""}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    backgroundColor: "#f5f7ff",
                    "&:hover fieldset": { borderColor: "#1976d2" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#1976d2",
                      boxShadow: "0 0 6px rgba(25,118,210,0.25)",
                    },
                  },
                }}
              />
            ))}

            {/* Genre Input */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TextField
                label="Add Genre"
                value={newGenre}
                onChange={(e) => setNewGenre(e.target.value)}
                size="small"
                fullWidth
              />
              <Button
                onClick={handleAddGenre}
                variant="contained"
                sx={{
                  height: "40px",
                  minWidth: "40px",
                  borderRadius: 2,
                  backgroundColor: "#4caf50",
                  "&:hover": { backgroundColor: "#43a047" },
                  fontWeight: "bold",
                }}
              >
                +
              </Button>
            </Box>

            {/* Genre Chips */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {genres.map((genre) => (
                <Chip
                  key={genre}
                  label={genre}
                  onDelete={() => handleRemoveGenre(genre)}
                  sx={{
                    fontWeight: "600",
                    bgcolor: "#e3f2fd",
                    color: "#1976d2",
                    "& .MuiChip-deleteIcon": { color: "#1565c0" },
                  }}
                />
              ))}
            </Box>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "space-between",
            px: 3,
            py: 2,
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <Button
            onClick={handleClose}
            sx={{ color: "#f44336", fontWeight: "bold" }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-track-form"
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #1976d2, #4dabf5)",
              fontWeight: "bold",
              "&:hover": {
                background: "linear-gradient(135deg, #1565c0, #2196f3)",
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
