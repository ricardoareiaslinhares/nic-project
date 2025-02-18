import { Box, Paper, Typography } from "@mui/material";

type Props = {
  openNote: number;
  noteContent: string;
};

const NoteDetails = ({ openNote, noteContent }: Props) => {
    console.log(openNote, noteContent)
  return (
    <Box>
      <Typography variant="h5">Notas sessão {openNote + 1}</Typography>
      <Paper
        sx={{
          padding: 2,
          minWidth: { xs: "300px", md: "500px" },
          maxWidth: "500px",
        }}
      >
        {noteContent}
      </Paper>
    </Box>
  );
};

export default NoteDetails;
