import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { Chip } from "@mui/material";
import { useState } from "react";
import { url } from "inspector";
import { createTrack } from "../../api/track/trackApi";
import { Track } from "../../api/track/models/Track";
import { UploadTrackFile } from "../UploadTrtackFile/UploadTrackFile";

interface CreateTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTrackCreated: (track: Track) => void;
}

export const CreateTrackModal: React.FC<CreateTrackModalProps> = ({
  isOpen,
  onClose,
  onTrackCreated,
}) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [genres, setGenres] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [createdTrack, setCreatedTrack] = useState<Track | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = ["Information about track", "Downloading track"];

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
    setCreatedTrack(null);
    setCurrentStep(0);
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !artist.trim()) {
      alert("Track title and artist are required");
      return;
    }

    if (!coverImage) {
      alert("Invalid image link format");
      return;
    }

    const trackData = {
      title,
      artist,
      album,
      coverImage: coverImage,
      genres,
    };

    try {
      const savedTrack = await createTrack(trackData);
      if (savedTrack) {
        setCreatedTrack(savedTrack);
        setCurrentStep(1);
        // handleClose();
      } else {
        console.log("Track was not saved");
      }
    } catch (error) {
      console.log("Error creating track:", error);
    }
  };

  const handleFileUploaded = (url: string) => {
    if (createdTrack) {
      const updatedTrack = { ...createdTrack, audioFile: url };
      setCreatedTrack(updatedTrack);
      onTrackCreated(updatedTrack);
    }
  };

  const handleFinish = () => {
    if (createdTrack) {
      if (createdTrack.audioFile) {
        handleClose();
      } else {
        const confirmSkip = window.confirm(
          "Ви впевнені, що хочете завершити без завантаження музичного файлу?"
        );
        if (confirmSkip) {
          handleClose();
        }
      }
    }
  };

  const handleSkipUpload = () => {
    if (createdTrack) {
      onTrackCreated(createdTrack);
      handleClose();
    }
  };
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 4,
            padding: 3,
            backgroundColor: "#fafafa",
            minHeight: "500px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: "1.6rem",
            textAlign: "center",
            color: "#1976d2",
          }}
        >
          Create New Track
        </DialogTitle>

        {/* Stepper */}
        <Box sx={{ px: 3, mb: 3 }}>
          <Stepper activeStep={currentStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    "& .MuiStepLabel-label": {
                      fontWeight: "600",
                      color: "#555",
                    },
                    "& .Mui-active .MuiStepLabel-label": { color: "#1976d2" },
                    "& .Mui-completed .MuiStepLabel-label": {
                      color: "#4caf50",
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <DialogContent>
          {currentStep === 0 && (
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
                placeholder="https://example.com/image.jpg"
              />

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TextField
                  label="Add Genre"
                  value={newGenre}
                  onChange={(e) => setNewGenre(e.target.value)}
                  size="small"
                  fullWidth
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddGenre();
                    }
                  }}
                />
                <Button
                  onClick={handleAddGenre}
                  variant="contained"
                  sx={{
                    height: "40px",
                    minWidth: "40px",
                    backgroundColor: "#4caf50",
                    "&:hover": { backgroundColor: "#43a047" },
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
                    sx={{
                      fontWeight: "bold",
                      bgcolor: "#e3f2fd",
                      color: "#1976d2",
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {currentStep === 1 && createdTrack && (
            <Box>
              <Typography
                variant="h6"
                sx={{ mb: 2, textAlign: "center", color: "#1976d2" }}
              >
                Track "{createdTrack.title}" Created!
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 3, textAlign: "center", color: "#555" }}
              >
                Now you can upload a music file for this track.
              </Typography>
              <UploadTrackFile
                trackId={createdTrack.id}
                existingFileUrl={createdTrack.audioFile || ""}
                onFileUploaded={handleFileUploaded}
              />
              {createdTrack.audioFile && (
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    bgcolor: "#e8f5e9",
                    borderRadius: 2,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body2" color="#2e7d32">
                    ✅ Music file uploaded successfully!
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ justifyContent: "space-between", px: 3, py: 2 }}>
          <Button
            onClick={handleClose}
            sx={{ color: "#f44336", fontWeight: "bold" }}
          >
            Cancel
          </Button>

          {currentStep === 0 && (
            <Button
              type="submit"
              form="create-track-form"
              variant="contained"
              sx={{
                backgroundColor: "#1976d2",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#1565c0" },
              }}
            >
              Create Track
            </Button>
          )}

          {currentStep === 1 && (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                onClick={handleSkipUpload}
                variant="outlined"
                sx={{
                  fontWeight: "bold",
                  borderColor: "#1976d2",
                  color: "#1976d2",
                }}
              >
                Skip Upload
              </Button>
              <Button
                onClick={handleFinish}
                variant="contained"
                sx={{
                  backgroundColor: createdTrack?.audioFile
                    ? "#4caf50"
                    : "#1976d2",
                  "&:hover": {
                    backgroundColor: createdTrack?.audioFile
                      ? "#43a047"
                      : "#1565c0",
                  },
                  fontWeight: "bold",
                }}
              >
                {createdTrack?.audioFile ? "Finish" : "Finish Without File"}
              </Button>
            </Box>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};
