import { Box, Button, Typography } from "@mui/material";

type Props = {
  deleteAction: () => void;
  cancelAction: () => void;
  title: string;
  message: string;
};
const ModalContentDelete = ({ deleteAction, cancelAction, title, message }: Props) => {
  return (
    <>
      <Typography id="transition-modal-title" variant="h6" component="h2">
        {title}
      </Typography>
      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
        {message}
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}
      >
        <Button onClick={deleteAction} sx={{ color: "red" }}>
          Apagar
        </Button>
        <Button onClick={cancelAction}>Cancelar</Button>
      </Box>
    </>
  );
};

export default ModalContentDelete;
