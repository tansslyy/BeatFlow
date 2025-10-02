import React from "react";
import { Track } from "../../api/track/models/Track";
import {
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  Paper,
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
        maxWidth: 1000,
        margin: "0 auto",
        p: 3,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mb: 3,
          color: "#3E2723",
          letterSpacing: 1,
        }}
      >
        List of Tracks
      </Typography>

      <Paper
        elevation={4}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          backgroundColor: "#fff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <List>
          {tracks?.data.map((track, index) => (
            <React.Fragment key={track.id}>
              <ListItem
                sx={{
                  px: 3,
                  py: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(244,201,214,0.2)",
                    transform: "scale(1.02)",
                  },
                }}
              >
                <TrackListItem
                  track={track}
                  onDelete={onTrackDelete}
                  onTrackUpdated={onTrackUpdated}
                />
              </ListItem>
              {index < (tracks?.data.length ?? 0) - 1 && (
                <Divider sx={{ mx: 3, borderColor: "#f0f0f0" }} />
              )}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};
