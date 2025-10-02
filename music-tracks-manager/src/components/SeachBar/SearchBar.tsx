import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { fetchTracks } from "../../api/track/trackApi";
import { GetModel } from "../../api/track/models/CreateTrack";
import { Track } from "../../api/track/models/Track";
import { PageList } from "../../types/PageList";
import { TrackFilterBar } from "../TrackFilterSortBar/TrackFilterBar";

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
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#F4C9D6",
          color: "#3E2723",
          borderRadius: 4,
          boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
        }}
      >
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Type to search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  const value = (e.target as HTMLInputElement).value;
                  await searchTrack(value);
                }
              }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
