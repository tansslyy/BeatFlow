import React from "react";
import { Modal as MuiModal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <MuiModal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
          width: "90%",
          maxWidth: 500,
          outline: "none",
        }}
      >
        {/* Кнопка закриття */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "grey.600",
            "&:hover": { color: "grey.900" },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Контент */}
        {children}
      </Box>
    </MuiModal>
  );
};

export default Modal;
