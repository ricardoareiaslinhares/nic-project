import * as React from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";

type Props = {
  openToast: {
    open: boolean;
    message: string
  };
  closeToast: () => void;
};

const Toast = ({ openToast, closeToast }: Props) => {
  const { open, message } = openToast;


  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    closeToast();
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </div>
  );
};

export default Toast;
