import { useEffect, useState } from "react";
import { PageList } from "../types/PageList";
import { deleteTrack, fetchTracks } from "../api/track/trackApi";
import { CreateTrackModal } from "../components/createTrackForm/CreateTrackModal";
import { TrackList } from "../components/TrackList/TrackList";
import { Track } from "../api/track/models/Track";
import { GetModel } from "../api/track/models/CreateTrack";
import { Box, Typography, Button, Paper } from "@mui/material";
import { SearchAppBar } from "../components/SeachBar/SearchBar";
import TablePagination from "@mui/material/TablePagination";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { TrackFilterBar } from "../components/TrackFilterSortBar/TrackFilterBar";

const model: GetModel = {
  page: 1,
  limit: 10,
  order: "",
  sort: "",
  genre: "",
  artist: "",
  search: "",
};

export const HomePage = () => {
  const [tracks, setTracks] = useState<PageList<Track>>();
  const [showModal, setShowModal] = useState(false);

  const handleTrackCreated = (newTrack: Track) => {
    if (tracks) {
      setTracks({
        ...tracks,
        data: [newTrack, ...tracks.data],
      });
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const tracks = await fetchTracks(model);

      if (tracks) {
        setTracks(tracks);
      }
    };

    fetch();
  }, []);

  const handleTrackDelete = async (trackId: string) => {
    try {
      await deleteTrack({ id: trackId });
      setTracks((prev) =>
        prev
          ? { ...prev, data: prev.data.filter((track) => track.id !== trackId) }
          : prev
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleTrackUpdated = (updatedTrack: Track) => {
    setTracks((prev) =>
      prev
        ? {
            ...prev,
            data: prev.data.map((t) =>
              t.id === updatedTrack.id ? updatedTrack : t
            ),
          }
        : prev
    );
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetch = async () => {
      const tracks = await fetchTracks({
        ...model,
        page: page + 1,
        limit: rowsPerPage,
      });

      if (tracks) {
        setTracks(tracks);
      }
    };
    fetch();
  }, [page, rowsPerPage]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #fff5f7 0%, #fef5f8 50%, #fff8fa 100%)",
        padding: "30px",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          padding: { xs: "24px 28px", sm: "28px 40px" },
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(20px)",
          mb: 4,
          border: "1px solid rgba(255, 126, 179, 0.15)",
          boxShadow: "0 8px 32px rgba(255, 126, 179, 0.08)",
        }}
      >
        {/* Left Side: Icon + Title */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2.5,
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: { xs: 44, sm: 52 },
              height: { xs: 44, sm: 52 },
              borderRadius: "14px",
              background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(255, 126, 179, 0.3)",
            }}
          >
            <LibraryMusicIcon
              sx={{
                fontSize: { xs: 26, sm: 30 },
                color: "#ffffff",
              }}
            />
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#2a2a2a",
              letterSpacing: "-0.8px",
              fontSize: { xs: "1.5rem", sm: "1.9rem" },
            }}
          >
            Track Manager
          </Typography>
        </Box>

        {/* Right Side: Add Track Button */}
        <Button
          variant="contained"
          onClick={() => setShowModal(true)}
          sx={{
            background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
            fontWeight: 600,
            borderRadius: "14px",
            px: { xs: 3, sm: 3.5 },
            py: { xs: 1.2, sm: 1.4 },
            textTransform: "none",
            fontSize: { xs: "0.9rem", sm: "1rem" },
            boxShadow: "0 4px 16px rgba(255, 126, 179, 0.3)",
            transition: "all 0.2s ease",
            "&:hover": {
              background: "linear-gradient(135deg, #ff6a7f 0%, #ff71a6 100%)",
              boxShadow: "0 6px 20px rgba(255, 126, 179, 0.4)",
              transform: "translateY(-2px)",
            },
            mt: { xs: 2, sm: 0 },
          }}
        >
          + Add Track
        </Button>
      </Paper>

      {/* Search + Filter */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          margin: "0 auto 28px",
          gap: { xs: 2, md: 3 },
        }}
      >
        {/* Search */}
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: { xs: "1 1 100%", md: "0 0 70%" },
            padding: { xs: "14px 20px", sm: "16px 24px" },
            borderRadius: "12px",
            background: "#ffffff",
            border: "1px solid #f0f0f0",
            transition: "all 0.2s ease",
            "&:hover": {
              borderColor: "#ff7eb3",
            },
            input: {
              width: "100%",
              padding: { xs: "10px 14px", sm: "12px 16px" },
              border: "none",
              background: "transparent",
              fontSize: "0.95rem",
              color: "#2a2a2a",
              "&:focus": {
                outline: "none",
              },
              "&::placeholder": {
                color: "#b0b0b0",
              },
            },
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 1200, my: "auto" }}>
            <SearchAppBar
              onSearch={(response) => {
                setTracks(response);
                setPage(0);
              }}
            />
          </Box>
        </Paper>

        {/* Filter */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              borderRadius: "12px",
              padding: "8px 12px",
              width: { xs: "100%", md: 140 },
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#ffffff",
              border: "1px solid #f0f0f0",
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: "#ff7eb3",
              },
            }}
          >
            <TrackFilterBar
              tracks={tracks?.data || []}
              onFilter={(filteredTracks) => {
                if (tracks) {
                  setTracks({
                    ...tracks,
                    data: filteredTracks,
                    meta: { ...tracks.meta, total: filteredTracks.length },
                  });
                }
              }}
            />
          </Paper>
        </Box>
      </Box>

      {/* Modal */}
      <CreateTrackModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onTrackCreated={handleTrackCreated}
      />

      {/* Track List */}
      {tracks?.data.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mt: 8,
            mb: 8,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#9e9e9e",
              fontWeight: 400,
              mb: 0.5,
            }}
          >
            Немає треків 💤
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#c0c0c0", fontSize: "0.9rem" }}
          >
            Додайте свій перший трек
          </Typography>
        </Box>
      ) : (
        <TrackList
          tracks={tracks}
          onTrackDelete={handleTrackDelete}
          onTrackUpdated={handleTrackUpdated}
        />
      )}

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
        }}
      >
        <TablePagination
          component="div"
          count={tracks?.meta.total || 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            background: "#ffffff",
            borderRadius: "12px",
            px: 3,
            py: 1,
            border: "1px solid #f0f0f0",
            "& .MuiTablePagination-toolbar": {
              minHeight: 64,
            },
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
              {
                color: "#666",
                fontWeight: 400,
              },
            "& .MuiTablePagination-select": {
              color: "#2a2a2a",
            },
            "& .MuiIconButton-root": {
              color: "#ff7eb3",
              transition: "all 0.2s ease",
              "&:hover": {
                background: "rgba(255, 126, 179, 0.08)",
              },
              "&.Mui-disabled": {
                color: "#d0d0d0",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};
