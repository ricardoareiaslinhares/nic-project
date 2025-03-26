import { Box, Typography } from "@mui/material";
import ListDisplay from "../../components/List/ListDisplay";
import RenderNotesList from "./components/RenderNotesList";
import { getNotesByClientId } from "../../api/notes/notesApi";
import { useCallback, useState } from "react";
import NoteDetails from "./components/NoteDetails";
import useQueryDetails from "../../api/react-query-hooks/useQueryDetails";

// meter isto num custom hook
import { useParams } from "react-router";
import { validateParamsId } from "../../utils/validateParamsId";
import { Client } from "../../types/entities/client";

type ClientDetailsProps = {
  data: Client;
};

const ClientDetails = ({ data }: ClientDetailsProps) => {
  const { id } = useParams();
  const numericId = validateParamsId(id);
  if (!numericId) return null; //better error here; like a redirect???

  console.log("CLIENT DETAILS;", data);

  // Notes related

  /*   const {
    data: notesData,
    error: notesError,
    isLoading: notesIsLoading,
  } = useQueryDetails({
    getByIdFn: getNotesByClientId,
    id: numericId,
    queryKey: "notes",
  }); */

  // Controls the NoteDetails componets
  const [openNote, setOpenNote] = useState<number | null>(null);

  const handleOpenNote = useCallback((id: number | null) => {
    setOpenNote(id);
  }, []);
  //

  /*   if (notesIsLoading) return <p>Loading...</p>;
  if (notesError) return <p>{notesError.message}</p>;
 */

  const notesData = [];
  return (
    <>
      <Box
        sx={{ display: "flex", flex: 1, flexDirection: "column", padding: 1 }}
      >
        <Box>
          <Typography>Nome: {data.id}</Typography>
          <Typography>Id. de Cliente: {data.name}</Typography>
          <Typography>Email: {data.email}</Typography>
        </Box>
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h5">Notas das Sessões</Typography>
          <Box
            sx={{
              display: "flex",
              flex: 1,
              flexDirection: { xs: "column", md: "row" },
              gap: 6,
            }}
          >
            <ListDisplay
              sx={{
                display: "flex",
                flex: 1,
                minWidth: { xs: "300px", md: "500px" },
                maxWidth: "500px",
              }}
              renderList={
                <RenderNotesList
                  items={notesData ?? []}
                  handleOpenNote={handleOpenNote}
                  clientId={numericId}
                />
              }
            />
            {openNote !== null && notesData ? (
              <NoteDetails
                note={notesData.find((note) => Number(note.id) === openNote)!}
              />
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ClientDetails;
