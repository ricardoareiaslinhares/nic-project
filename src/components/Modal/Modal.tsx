import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import { Modal as ModalMui } from "@mui/material";
import Fade from "@mui/material/Fade";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type Props = {
  open: boolean;
  handleOpenModal: () => void;
  children: React.ReactNode;
};
const Modal = ({ open, handleOpenModal, children }: Props) => {
  return (
    <div>
      <ModalMui
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        disableEnforceFocus
        disableRestoreFocus
        open={open}
        onClose={handleOpenModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {children}
            </Box>
        </Fade>
      </ModalMui>
    </div>
  );
};
export default Modal;
