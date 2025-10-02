import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { fetchTracks } from "../../api/track/trackApi";
import { GetModel } from "../../api/track/models/CreateTrack";
import { Track } from "../../api/track/models/Track";
import { PageList } from "../../types/PageList";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("#3E2723", 0.1),
  "&:hover": {
    backgroundColor: alpha("#3E2723", 0.2),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#3E2723",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#3E2723",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

type Props = {
  onSearch: (results: PageList<Track>) => void;
};

export const SearchAppBar: React.FC<Props> = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [allTracks, setAlltracks] = useState<Track[]>([]);
  const [searchResults, setSearchResults] = useState<PageList<Track> | null>(
    null
  );

  const searchTrack = async (value: string) => {
    setInput(value);

    const model: GetModel = {
      page: 1,
      limit: 100,
      sort: "",
      search: value,
      genre: "",
      artist: "",
      order: "asc",
    };

    const response = await fetchTracks(model);

    if (response && response.data) {
      setAlltracks(response.data);
      setSearchResults(response);
      onSearch(response);
    } else {
      setSearchResults({
        data: [],
        meta: { page: 1, limit: 10, total: 0, totalPages: 0 },
      });
      onSearch({
        data: [],
        meta: { page: 1, limit: 10, total: 0, totalPages: 0 },
      });
    }
  };

  return (
    <Box sx={{ flexGrow: 1, display: "flex", alignItems: "flex-start", mb: 2 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          width: "100%",
        }}
      >
        <Toolbar sx={{ p: 0 }}>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: "25px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              px: 2,
              py: 0.5,
              transition: "0.3s",
              "&:hover": {
                boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
              },
            }}
          >
            <SearchIcon sx={{ color: "#5c6bc0", mr: 1, fontSize: "28px" }} />
            <InputBase
              placeholder="Search tracks..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  const value = (e.target as HTMLInputElement).value;
                  await searchTrack(value);
                }
              }}
              sx={{
                flex: 1,
                fontSize: "16px",
                color: "#2e3a59",
                "& input::placeholder": { color: "#9e9e9e" },
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
