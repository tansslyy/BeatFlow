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
  limit: 100,
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
        elevation={4}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 30px",
          borderRadius: "25px",
          background: "#fff",
          mb: 5,
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <LibraryMusicIcon sx={{ fontSize: "45px", color: "#5c6bc0" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "700", color: "#2e3a59", letterSpacing: "1px" }}
          >
            Track Manager
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => setShowModal(true)}
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
          }}
        >
          + Add Track
        </Button>
      </Paper>

      {/* Search and Filter*/}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "80%",
          maxWidth: 900,
          margin: "24px auto",
          padding: "8px 16px",
          backgroundColor: "#f5f5f5",
          borderRadius: 4,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          gap: 2,
        }}
      >
        {/* Search */}
        <Box
          sx={{
            flex: 1,
            input: {
              padding: "10px 14px",
              borderRadius: 3,
              backgroundColor: "#fff",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
            },
          }}
        >
          <SearchAppBar
            onSearch={(response) => {
              setTracks(response);
              setPage(0);
            }}
          />
        </Box>

        {/* Filter */}
        <Box
          sx={{
            minWidth: 180,
            borderRadius: 3,
            padding: "6px 12px",
            cursor: "pointer",
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
