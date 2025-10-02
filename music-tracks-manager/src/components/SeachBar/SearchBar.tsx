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
import { Typography } from "@mui/material";

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
        width: "100%",
        mb: { xs: 2, sm: 2.5, md: 3 },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 900,
          mx: "auto",
        }}
      >
        {/* Animated gradient glow */}
        <Box
          sx={{
            position: "absolute",
            inset: "-4px",
            background:
              "linear-gradient(135deg, #667eea, #764ba2, #f093fb, #4facfe)",
            backgroundSize: "300% 300%",
            borderRadius: 5,
            opacity: 0,
            filter: "blur(16px)",
            transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:has(~ * input:focus)": {
              opacity: 0.6,
              animation: "gradient 3s ease infinite",
            },
            "@keyframes gradient": {
              "0%": { backgroundPosition: "0% 50%" },
              "50%": { backgroundPosition: "100% 50%" },
              "100%": { backgroundPosition: "0% 50%" },
            },
          }}
        />

        {/* Main Search Bar */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: 4,
            border: "2px solid rgba(102, 126, 234, 0.08)",
            boxShadow: "0 8px 32px rgba(102, 126, 234, 0.12)",
            px: { xs: 2.5, sm: 3 },
            py: { xs: 1.5, sm: 2 },
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            "&:hover": {
              background: "rgba(255, 255, 255, 1)",
              boxShadow: "0 12px 48px rgba(102, 126, 234, 0.18)",
              border: "2px solid rgba(102, 126, 234, 0.2)",
              transform: "translateY(-2px)",
            },
            "&:focus-within": {
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 255, 0.98) 100%)",
              border: "2px solid rgba(102, 126, 234, 0.4)",
              boxShadow:
                "0 20px 60px rgba(102, 126, 234, 0.25), 0 0 0 1px rgba(102, 126, 234, 0.1)",
              transform: "translateY(-4px) scale(1.01)",
            },
          }}
        >
          {/* Icon with animation */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "transparent",
                transition: "all 0.3s ease",
                "input:focus ~ &": {
                  background:
                    "radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)",
                  animation: "pulse 2s ease-in-out infinite",
                },
                "@keyframes pulse": {
                  "0%, 100%": { transform: "scale(1)", opacity: 0.5 },
                  "50%": { transform: "scale(1.2)", opacity: 0.2 },
                },
              }}
            />
            <SearchIcon
              sx={{
                fontSize: { xs: 26, sm: 28 },
                color: "#667eea",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                position: "relative",
                zIndex: 1,
              }}
            />
          </Box>

          {/* Input Field */}
          <InputBase
            placeholder="Search for tracks, artists, albums..."
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
              color: "#0f172a",
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

          {/* Enter hint with gradient */}
          {input && (
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                gap: 0.5,
                px: 2,
                py: 1,
                borderRadius: 2,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 4px 16px rgba(102, 126, 234, 0.3)",
                ml: 1,
                animation: "fadeIn 0.3s ease",
                "@keyframes fadeIn": {
                  from: { opacity: 0, transform: "scale(0.9)" },
                  to: { opacity: 1, transform: "scale(1)" },
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.5px",
                }}
              >
                Enter
              </Typography>
              <Typography sx={{ color: "#ffffff", fontSize: "0.9rem" }}>
                ↵
              </Typography>
            </Box>
          )}
        </Box>

        {/* Enhanced decorative gradient line */}
        <Box
          sx={{
            position: "absolute",
            bottom: -12,
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            height: 3,
            background:
              "linear-gradient(90deg, transparent 0%, #667eea 30%, #764ba2 50%, #667eea 70%, transparent 100%)",
            opacity: 0.3,
            borderRadius: 3,
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:has(~ * input:focus)": {
              opacity: 0.8,
              width: "80%",
              height: 4,
              boxShadow: "0 0 20px rgba(102, 126, 234, 0.4)",
            },
          }}
        />

        {/* Floating particles */}
        <Box
          sx={{
            position: "absolute",
            top: -10,
            left: "25%",
            width: 8,
            height: 8,
            bgcolor: "#a78bfa",
            borderRadius: "50%",
            opacity: 0,
            transition: "opacity 0.3s ease",
            "&:has(~ * input:focus)": {
              opacity: 0.4,
              animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
            },
            "@keyframes ping": {
              "0%": { transform: "scale(1)", opacity: 0.4 },
              "75%, 100%": { transform: "scale(2)", opacity: 0 },
            },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: -5,
            right: "30%",
            width: 6,
            height: 6,
            bgcolor: "#ec4899",
            borderRadius: "50%",
            opacity: 0,
            transition: "opacity 0.3s ease",
            "&:has(~ * input:focus)": {
              opacity: 0.4,
              animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite 0.3s",
            },
            "@keyframes ping": {
              "0%": { transform: "scale(1)", opacity: 0.4 },
              "75%, 100%": { transform: "scale(2)", opacity: 0 },
            },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -5,
            left: "35%",
            width: 5,
            height: 5,
            bgcolor: "#3b82f6",
            borderRadius: "50%",
            opacity: 0,
            transition: "opacity 0.3s ease",
            "&:has(~ * input:focus)": {
              opacity: 0.4,
              animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite 0.6s",
            },
            "@keyframes ping": {
              "0%": { transform: "scale(1)", opacity: 0.4 },
              "75%, 100%": { transform: "scale(2)", opacity: 0 },
            },
          }}
        />
      </Box>
    </Box>
  );
};
