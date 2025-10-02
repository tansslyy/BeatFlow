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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: 2,
        flexDirection: "column",
      }}
    >
      <IconButton onClick={toggleOpen} color="inherit">
        <FilterAltOutlinedIcon />
      </IconButton>
      <Collapse in={open}>
        <Box sx={{ display: "flex" }}>
          <FormControl sx={{ minWidth: 120 }}>
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

          <FormControl sx={{ minWidth: 150 }}>
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

          <Button variant="contained" onClick={handleFilter}>
            Apply
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
};
