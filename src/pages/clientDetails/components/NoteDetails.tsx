import { Box, Paper, Typography } from "@mui/material";
import Note from "../../../entities/note";

type Props = {
  note: Note;
};

const NoteDetails = ({ note }: Props) => {
  if (!note) return <></>
  return (
    <Box>
      <Typography variant="h5">Notas sessão de {note.date}</Typography>
      <Paper
        sx={{
          padding: 2,
          minWidth: { xs: "300px", md: "500px" },
          maxWidth: "500px",
        }}
      >
        {note.note}
      </Paper>
    </Box>
  );
};

export default NoteDetails;
