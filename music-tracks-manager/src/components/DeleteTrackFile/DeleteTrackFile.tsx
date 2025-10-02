import React, { useState } from "react";
import { Button } from "@mui/material";
import { deleteTrackFile } from "../../api/track/trackApi";

interface DeleteTRackFileProps {
  trackId: string;
  onFileRemoved: () => void;
}

export const DeleteTrakcFile: React.FC<DeleteTRackFileProps> = ({
  trackId,
  onFileRemoved,
}) => {
  const [loading, setLoading] = useState(false);
  const handleRemove = async () => {
    setLoading(true);
    try {
      await deleteTrackFile(trackId);
      onFileRemoved();
    } catch (err) {
      console.error(err);
      alert("Failed to delete file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      color="error"
      variant="outlined"
      onClick={handleRemove}
      disabled={loading}
      sx={{ mt: 1 }}
    >
      {loading ? "Removing..." : "Remove File"}
    </Button>
  );
};
