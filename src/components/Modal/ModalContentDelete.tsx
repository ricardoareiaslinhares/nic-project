import { Box, Button, Typography } from "@mui/material";
import { ContentForModalDelete } from "../../types";

type Props = {
  cancelAction: () => void;
  content: (itemId: number) => ContentForModalDelete;
  selectedId: number;
};
const ModalContentDelete = ({ cancelAction, content, selectedId }: Props) => {
  const { title, message, action } = content(selectedId);
  if (selectedId === null)
    throw new Error("ModalContentDelete: valid id is required");
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
        <Button onClick={action} sx={{ color: "red" }}>
          Apagar
        </Button>
        <Button onClick={cancelAction}>Cancelar</Button>
      </Box>
    </>
  );
};

export default ModalContentDelete;
