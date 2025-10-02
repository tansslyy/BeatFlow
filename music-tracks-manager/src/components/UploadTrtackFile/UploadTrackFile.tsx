import React, { useState, useEffect } from "react";
import { Track } from "../../api/track/models/Track";
import { TrackList } from "../TrackList/TrackList";
import { Box, Button, Typography } from "@mui/material";
import { uploadTrackFile } from "../../api/track/trackApi";

interface UploadTrackFileProps {
  trackId: string;
  existingFileUrl: string;
  onFileUploaded: (url: string) => void;
}

export const UploadTrackFile: React.FC<UploadTrackFileProps> = ({
  trackId,
  existingFileUrl,
  onFileUploaded,
}) => {
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState(existingFileUrl || "");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["audio/mpeg", "audio/wav"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only MP3 or WAV!");
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      alert("This file is large. Maximum is 15MB");
      return;
    }
    setUploading(true);
    try {
      const response: Track | undefined = await uploadTrackFile(trackId, file);
      console.log("Upload response:", response);

      if (response?.audioFile) {
        const url = `http://localhost:8000/api/files/${response.audioFile}`;
        console.log(url);
        setFileUrl(url);
        onFileUploaded(url);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to download file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      {!fileUrl ? (
        <>
          <Button variant="contained" component="label" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload File"}
            <input type="file" accept="audio/*" onChange={handleFileChange} />
          </Button>
        </>
      ) : (
        <Box>
          <audio
            controls
            src={fileUrl}
            style={{ width: "100%", marginTop: 10 }}
          />
        </Box>
      )}
    </Box>
  );
};
