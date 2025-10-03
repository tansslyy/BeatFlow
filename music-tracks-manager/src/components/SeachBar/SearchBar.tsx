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
        width: "100%",
        mb: 1,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* Main Search Bar */}
        <Box
          sx={{
            flex: 1,
            maxWidth: 1200,
            position: "relative",
            display: "flex",
            alignItems: "center",
            background: "#ffffff",
            borderRadius: 4,
            border: "1px solid rgba(102, 126, 234, 0.12)",
            boxShadow: "0 4px 20px rgba(102, 126, 234, 0.08)",
            px: { xs: 2.5, sm: 3 },
            py: { xs: 1.5, sm: 2 },
            transition: "all 0.3s ease",
            "&:hover": {
              border: "1px solid rgba(102, 126, 234, 0.25)",
              boxShadow: "0 8px 32px rgba(102, 126, 234, 0.12)",
              transform: "translateY(-2px)",
            },
            "&:focus-within": {
              border: "1px solid rgba(102, 126, 234, 0.4)",
              boxShadow: "0 12px 40px rgba(102, 126, 234, 0.15)",
              transform: "translateY(-3px)",
            },
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
            }}
          >
            <SearchIcon
              sx={{
                fontSize: { xs: 24, sm: 26 },
                color: "#ff7eb3",
                transition: "all 0.3s ease",
                "input:focus ~ &": {
                  color: "#5c6bc0",
                },
              }}
            />
          </Box>

          {/* Input Field */}
          <InputBase
            placeholder="Шукати треки, виконавців, альбоми..."
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
              fontSize: { xs: "0.95rem", sm: "1.05rem" },
              color: "#1e293b",
              fontWeight: 500,
              "& input": {
                padding: 0,
                "&::placeholder": {
                  color: "#94a3b8",
                  fontWeight: 400,
                },
              },
            }}
          />
        </Box>

        {/* Subtle bottom accent line */}
        <Box
          sx={{
            position: "absolute",
            bottom: -8,
            left: "50%",
            transform: "translateX(-50%)",
            width: "40%",
            height: 2,
            background:
              "linear-gradient(135deg, #ff758c 0%, #ff7eb3 50%, #ff758c 100%)",
            opacity: 0,
            borderRadius: 2,
            transition: "all 0.4s ease",
            "&:has(~ * input:focus)": {
              opacity: 0.5,
              width: "60%",
            },
          }}
        />
      </Box>
    </Box>
  );
};
