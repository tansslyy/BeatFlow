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
        background: "linear-gradient(to bottom, #f0f2f5, #e3e7f0)",
        padding: "30px",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      {/* Header */}
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          padding: { xs: "16px 20px", sm: "20px 30px" },
          borderRadius: "30px",
          background: "linear-gradient(145deg, #f5f5f5, #ffffff)",
          mb: 5,
          boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
          textAlign: "center",
        }}
      >
        {/* Left Side: Icon + Title */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: { xs: 2, sm: 0 },
            justifyContent: "center",
            width: "100%",
          }}
        >
          <LibraryMusicIcon
            sx={{
              fontSize: { xs: 40, sm: 50 },
              background: "linear-gradient(135deg, #5c6bc0, #8e99f3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#2e3a59",
              letterSpacing: "1px",
              fontSize: { xs: "1.6rem", sm: "2rem" },
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
            background: "linear-gradient(135deg, #5c6bc0, #8e99f3)",
            fontWeight: "bold",
            borderRadius: "30px",
            px: { xs: 2.5, sm: 3 },
            py: { xs: 1, sm: 1.2 },
            textTransform: "none",
            fontSize: { xs: "0.9rem", sm: "1rem" },
            boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(135deg, #3f51b5, #7e8cf5)",
              transform: "translateY(-2px) scale(1.02)",
              boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
            },
            mt: { xs: 1, sm: 0 },
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
          margin: "0 auto 24px",
          gap: { xs: 2, md: 3 },
        }}
      >
        {/* Search */}
        <Paper
          elevation={6}
          sx={{
            flex: { xs: "1 1 100%", md: "0 0 70%" },
            padding: { xs: "12px 16px", sm: "16px 24px" },
            borderRadius: "30px",
            background: "linear-gradient(145deg, #f9f9f9, #fff0f5)",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            input: {
              width: "100%",
              padding: { xs: "10px 14px", sm: "12px 16px" },
              borderRadius: "20px",
              border: "none",
              background: "#fff",
              boxShadow: "inset 0 2px 6px rgba(0,0,0,0.1)",
              "&:focus": {
                outline: "none",
                boxShadow: "0 0 8px rgba(92,107,192,0.4)",
              },
            },
          }}
        >
          <SearchAppBar
            onSearch={(response) => {
              setTracks(response);
              setPage(0);
            }}
          />
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
            elevation={3}
            sx={{
              borderRadius: "50px",
              padding: "4px 8px",
              width: { xs: "100%", md: 120 },
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
                transform: "translateY(-2px)",
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
        <Typography
          variant="h6"
          align="center"
          sx={{ color: "#9e9e9e", fontStyle: "italic", mt: 5 }}
        >
          Немає треків 💤
        </Typography>
      ) : (
        <TrackList
          tracks={tracks}
          onTrackDelete={handleTrackDelete}
          onTrackUpdated={handleTrackUpdated}
        />
      )}

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <TablePagination
          component="div"
          count={tracks?.meta.total || 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            background: "#fff",
            borderRadius: "20px",
            px: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            "& .MuiTablePagination-toolbar": { minHeight: 60 },
          }}
        />
      </Box>
    </Box>
  );
};
