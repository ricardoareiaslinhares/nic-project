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
  minWidth: 400,
  bgcolor: "background.paper",  
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

type Props = {
  open: boolean;
  handleOpenModal: () => void;
  children: React.ReactNode;
  disableOutsideClick?: boolean;
};
const Modal = ({ open, handleOpenModal, children, disableOutsideClick=false }: Props) => {
  return (
    <div>
      <ModalMui
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        disableEnforceFocus
        disableRestoreFocus
        open={open}
        onClose={disableOutsideClick ? () => {} : handleOpenModal}
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
