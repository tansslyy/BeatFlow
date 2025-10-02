// import React from "react";
// import { Track } from "../api/track/models/Track";
// import { useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import SkipNextIcon from "@mui/icons-material/SkipNext";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { CardActions } from "@mui/material";

// interface TrackItemProps {
//   track: Track;
//   onDelete: (trackId: string) => void;
//   onPlay: (track: Track) => void;
// }

// export const TrackItem: React.FC<TrackItemProps> = ({
//   track,
//   onDelete,
//   onPlay,
// }) => {
//   const theme = useTheme();
//   return (
//     <Card
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         width: 300,
//         borderRadius: 3,
//         boxShadow: 3,
//         transition: "0.3s",
//         "&:hover": { boxShadow: 6, transform: "translate(-4px" },
//       }}
//     >
//       <CardMedia
//         component="img"
//         sx={{ width: 300 }}
//         image={
//           // track.coverImage ||
//           "https://media.istockphoto.com/id/1040315976/uk/%D1%84%D0%BE%D1%82%D0%BE/%D0%B6%D1%96%D0%BD%D0%BA%D0%B0-%D1%8F%D0%BA%D0%B0-%D0%B4%D0%B8%D0%B2%D0%B8%D1%82%D1%8C%D1%81%D1%8F-%D0%BD%D0%B0-%D0%B2%D0%B8%D0%B4-%D0%B7-%D0%BF%D0%B5%D1%87%D0%B5%D1%80%D0%B8-%D0%BC%D0%B0%D1%82%D0%B5%D1%80%D0%B0-%D0%B1%D0%B0%D0%B7%D0%B8%D0%BB%D1%96%D0%BA%D0%B0%D1%82%D0%B0-%D1%96%D1%82%D0%B0%D0%BB%D1%96%D1%8F.jpg?s=2048x2048&w=is&k=20&c=jna9JcLJx8f70hD0q4bJUqXe-bQLei_6IgJsmiYzZSs="
//         }
//         alt={track.title}
//       />

//       <CardContent>
//         <Typography gutterBottom variant="h6" component="div" noWrap>
//           {track.title}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {track.artist}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {track.album || "Unknown album"}
//         </Typography>
//         {track.audioFile && (
//           <audio
//             controls
//             style={{ width: "100%", marginTop: "10px", borderRadius: "8px" }}
//           >
//             <source src={track.audioFile} type="audio" />
//             Your browser does not support audio.
//           </audio>
//         )}
//       </CardContent>

//       <Box sx={{ display: "flex", flexDirection: "column" }}>
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: 1,
//             pl: 1,
//             pb: 1,
//           }}
//         >
//           <IconButton aria-label="previous">
//             {theme.direction === "rtl" ? (
//               <SkipNextIcon />
//             ) : (
//               <SkipPreviousIcon />
//             )}
//           </IconButton>

//           <IconButton aria-label="play/pause">
//             <PlayArrowIcon sx={{ height: 38, width: 38 }} />
//           </IconButton>

//           <IconButton aria-label="next">
//             {theme.direction === "rtl" ? (
//               <SkipPreviousIcon />
//             ) : (
//               <SkipNextIcon />
//             )}
//           </IconButton>
//           <CardActions sx={{ justifyContent: "space-between, pl:1, pb:1" }}>
//             <IconButton color="error" onClick={() => onDelete(track.id)}>
//               <DeleteIcon />
//             </IconButton>
//           </CardActions>
//         </Box>
//       </Box>
//     </Card>
//   );
// };

export const TrackItem = () => {
  return <div></div>;
};
