import { Box, Button, Typography } from "@mui/material";
import { ContentForModalBase } from "../../../types";

type Props = {
  cancelAction: () => void;
  content: ContentForModalBase;
  children: React.ReactNode;
};
const ModalContentNote = ({ cancelAction, content, children }: Props) => {
  const { title, message } = content;
  console.log("content", content)
  return (
    <Box
      sx={{
        minHeight: { xs: "900px", sm: "600px", md: "400px" },
        width: { xs: "300px", sm: "500px", md: "800px" },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography id="transition-modal-title" variant="h6" component="h2">
        {title}
      </Typography>
      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
        {message}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "space-between",
          marginTop: 2,
        }}
      >
        {children}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            columnGap: 6,
          }}
        >
          <Button onClick={cancelAction}>Cancelar</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ModalContentNote;
