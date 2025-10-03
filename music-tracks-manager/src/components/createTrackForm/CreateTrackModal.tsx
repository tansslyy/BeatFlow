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
            borderRadius: 5,
            padding: 3,
            background: "linear-gradient(145deg, #f8f9fa, #e6f0ff)",
            minHeight: "500px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
          },
        }}
      >
        {/* Title */}
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: "1.7rem",
            textAlign: "center",
            color: "#1e3a8a",
            letterSpacing: "0.5px",
          }}
        >
          Create New Track
        </DialogTitle>

        {/* Stepper */}
        <Box sx={{ px: 3, mb: 4 }}>
          <Stepper activeStep={currentStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    "& .MuiStepLabel-label": {
                      fontWeight: 600,
                      color: "#555",
                      fontSize: "0.95rem",
                    },
                    "& .Mui-active .MuiStepLabel-label": { color: "#ff7eb3" },
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
                gap: 3,
              }}
            >
              {["Track Title", "Artist", "Album", "Cover Image URL"].map(
                (label, idx) => (
                  <TextField
                    key={idx}
                    label={label}
                    value={
                      label === "Track Title"
                        ? title
                        : label === "Artist"
                        ? artist
                        : label === "Album"
                        ? album
                        : coverImage
                    }
                    onChange={(e) => {
                      if (label === "Track Title") setTitle(e.target.value);
                      else if (label === "Artist") setArtist(e.target.value);
                      else if (label === "Album") setAlbum(e.target.value);
                      else setCoverImage(e.target.value);
                    }}
                    fullWidth
                    required={label !== "Album" && label !== "Cover Image URL"}
                    placeholder={
                      label === "Cover Image URL"
                        ? "https://example.com/image.jpg"
                        : ""
                    }
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        backgroundColor: "#f5f7ff",
                        "&:hover fieldset": { borderColor: "#1976d2" },
                        "&.Mui-focused fieldset": {
                          borderColor: "#ff7eb3",
                          boxShadow: "0 0 6px rgba(25,118,210,0.25)",
                        },
                      },
                    }}
                  />
                )
              )}

              {/* Genre Input */}
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
                    borderRadius: 2,
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
                      "& .MuiChip-deleteIcon": { color: "#ff7eb3" },
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {currentStep === 1 && createdTrack && (
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Typography
                variant="h6"
                sx={{ mb: 2, color: "#ff7eb3", fontWeight: 600 }}
              >
                Track "{createdTrack.title}" Created!
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: "#555" }}>
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

          {currentStep === 0 && (
            <Button
              type="submit"
              form="create-track-form"
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #ff7eb3, #4dabf5)",
                fontWeight: "bold",
                "&:hover": {
                  background: "linear-gradient(135deg, #ff7eb3, #2196f3)",
                },
              }}
            >
              Create Track
            </Button>
          )}

          {currentStep === 1 && (
            <Box sx={{ display: "flex", gap: 2 }}>
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
