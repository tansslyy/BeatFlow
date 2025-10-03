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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* Кнопка фільтрів */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          onClick={toggleOpen}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: open
              ? "linear-gradient(135deg, #ff7eb3 0%, #764ba2 100%)"
              : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: 2,
            width: 44,
            height: 44,

            transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            "&:hover": {
              background: open
                ? "linear-gradient(135deg, #ff7eb3 0%, #664a91 100%)"
                : "rgba(255, 255, 255, 1)",
              transform: "translateY(-1px)",
              boxShadow: "0 8px 24px rgba(102, 126, 234, 0.2)",
            },
          }}
        >
          <FilterAltOutlinedIcon
            sx={{
              color: open ? "#fff" : "#ff7eb3",
              transition: "all 0.3s ease",
            }}
          />
        </IconButton>
      </Box>

      {/* Панель фільтрів */}
      <Collapse in={open} timeout={400}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 2,
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "center",
            maxWidth: 600,
            width: "100%",
            background: "rgba(255,255,255,0.95)",
            boxShadow: "0 4px 16px rgba(102,126,234,0.1)",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background:
                "linear-gradient(90deg, #ff7eb3 0%, #764ba2 50%, #f093fb 100%)",
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1rem", sm: "1.1rem" },
              background: "linear-gradient(135deg, #ff7eb3 0%, #764ba2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              minWidth: { xs: "auto", sm: 80 },
              width: "100%",
              flexBasis: "100%",
              mb: 1,
            }}
          >
            Filters
          </Typography>

          <FormControl
            sx={{
              minWidth: 120,
              flex: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                background: "rgba(255, 255, 255, 0.8)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "rgba(255, 255, 255, 1)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ff7eb3",
                  },
                },
                "&.Mui-focused": {
                  background: "rgba(255, 255, 255, 1)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ff7eb3",
                    borderWidth: 2,
                  },
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#667eea",
              },
            }}
          >
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

          <FormControl
            sx={{
              minWidth: 120,
              flex: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                background: "rgba(255, 255, 255, 0.8)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "rgba(255, 255, 255, 1)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ff7eb3",
                  },
                },
                "&.Mui-focused": {
                  background: "rgba(255, 255, 255, 1)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ff7eb3",
                    borderWidth: 2,
                  },
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#667eea",
              },
            }}
          >
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
              background: "linear-gradient(135deg, #ff7eb3 0%, #764ba2 100%)",
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: "none",
              boxShadow: "0 2px 12px rgba(102,126,234,0.25)",
              "&:hover": {
                background: "linear-gradient(135deg, #ff7eb3 0%, #664a91 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
              },
              "&:active": {
                transform: "translateY(0px)",
              },
            }}
          >
            Apply Filters
          </Button>
        </Paper>
      </Collapse>
    </Box>
  );
};
