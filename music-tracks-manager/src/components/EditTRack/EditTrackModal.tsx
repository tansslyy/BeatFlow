import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import { Chip } from "@mui/material";
import { useState } from "react";
import { editTrack } from "../../api/track/trackApi";
import { Track } from "../../api/track/models/Track";
import { UploadTrackFile } from "../UploadTrtackFile/UploadTrackFile";

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
            borderRadius: 3,
            padding: 2,
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        <DialogTitle
          sx={{ fontWeight: "bold", fontSize: "1.5rem", textAlign: "center" }}
        >
          Edit track
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
              gap: 2,
            }}
          >
            <TextField
              label="Track Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              label="Artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              label="Album"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Cover Image URL"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              fullWidth
              variant="outlined"
              placeholder="https://..."
            />

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
                  backgroundColor: "#4caf50",
                }}
              >
                +
              </Button>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {genres.map((genre) => (
                <Chip
                  key={genre}
                  label={genre}
                  onDelete={() => handleRemoveGenre(genre)}
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                />
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ justifyContent: "space-between", paddingX: 3, paddingY: 1 }}
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
            sx={{ backgroundColor: "#1976d2", fontWeight: "bold" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
