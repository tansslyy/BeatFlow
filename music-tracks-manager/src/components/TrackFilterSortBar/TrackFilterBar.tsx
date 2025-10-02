import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  IconButton,
  Collapse,
  Paper,
  Typography,
} from "@mui/material";
import { Track } from "../../api/track/models/Track";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import React, { useState } from "react";
import { fetchTracks } from "../../api/track/trackApi";
import { GetModel } from "../../api/track/models/CreateTrack";

type Props = {
  tracks: Track[];
  onFilter: (filteredTracks: Track[]) => void;
};

export const TrackFilterBar: React.FC<Props> = ({ tracks, onFilter }) => {
  const [filters, setFilters] = useState("");
  const [genre, setGenres] = useState("");
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  const handleFilter = async () => {
    const sortField = filters.includes("title")
      ? "title"
      : filters.includes("artist")
      ? "artist"
      : "";
    const order = filters.includes("Desc") ? "desk" : "asc";

    const model: GetModel = {
      page: 1,
      limit: 100,
      sort: sortField,
      search: "",
      genre: genre,
      artist: "",
      order: order,
    };

    const response = await fetchTracks(model);

    if (response && response.data) {
      onFilter(response.data);
    } else {
      onFilter([]);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {/* Кнопка фільтрів */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
        <IconButton
          onClick={toggleOpen}
          sx={{
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            "&:hover": {
              background: "#f5f5f5",
              transform: "translateY(-1px)",
            },
            transition: "0.2s",
          }}
        >
          <FilterAltOutlinedIcon sx={{ color: "#5c6bc0" }} />
        </IconButton>
      </Box>

      {/* Панель фільтрів */}
      <Collapse in={open} sx={{ width: "100%", mt: 1 }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: "20px",
            background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
            display: "flex",
            gap: 3,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "flex-start",
            transition: "0.3s ease-in-out",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "#2e3a59", minWidth: 80 }}
          >
            Filters:
          </Typography>

          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel>Genre</InputLabel>
            <Select
              value={genre}
              label="Genre"
              onChange={(e: SelectChangeEvent) => setGenres(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Pop">Pop</MenuItem>
              <MenuItem value="Rock">Rock</MenuItem>
              <MenuItem value="Jazz">Jazz</MenuItem>
              <MenuItem value="Hip-Hop">Hip-Hop</MenuItem>
              <MenuItem value="Electronic">Electronic</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={filters}
              label="Sort By"
              onChange={(e: SelectChangeEvent) => setFilters(e.target.value)}
            >
              <MenuItem value="">Default</MenuItem>
              <MenuItem value="titleAsc">Title A-Z</MenuItem>
              <MenuItem value="titleDesc">Title Z-A</MenuItem>
              <MenuItem value="artistAsc">Artist A-Z</MenuItem>
              <MenuItem value="artistDesc">Artist Z-A</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleFilter}
            sx={{
              background: "linear-gradient(135deg, #5c6bc0, #8e99f3)",
              fontWeight: "bold",
              borderRadius: "30px",
              px: 3,
              py: 1.2,
              textTransform: "none",
              boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
              "&:hover": {
                background: "linear-gradient(135deg, #3f51b5, #7e8cf5)",
                transform: "translateY(-2px)",
              },
              transition: "0.3s",
              alignSelf: "flex-start",
            }}
          >
            Apply
          </Button>
        </Paper>
      </Collapse>
    </Box>
  );
};
