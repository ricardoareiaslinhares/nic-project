import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { getClientById } from "../../api/clientsApi";
import validateParamsId from "../../utils/validateParamsId";
import ListDisplay from "../../components/List/ListDisplay";
import RenderNotesList from "./components/RenderNotesList";
import { getNotesByClientId } from "../../api/notesApi";
import { useCallback, useState } from "react";
import NoteDetails from "./components/NoteDetails";
import useQueryDetails from "../../hooks/useQueryDetails";



const ClientDetails = () => {
  const { id } = useParams();
  const numericId = validateParamsId(id);
  if (!numericId) return <p>Id de Cliente inválido</p>;

  const {
    data: clientData,
    error: clientError,
    isLoading: clientIsLoading,
  } = useQueryDetails({
    getByIdFn: getClientById,
    id: numericId,
    queryKey: "clients",
  });

  // Notes related

  const {
    data: notesData,
    error: notesError,
    isLoading: notesIsLoading,
  } = useQueryDetails({
    getByIdFn: getNotesByClientId,
    id: numericId,
    queryKey: "notes",
  });

  // Controls the NoteDetails componets
  const [openNote, setOpenNote] = useState<number | null>(null);

  const handleOpenNote = useCallback(
    (id: number | null) => {
      setOpenNote(id);
    },
    []
  );
  //

  if (clientIsLoading) return <p>Loading...</p>;
  if (clientError) return <p>{clientError.message}</p>;
  if (notesIsLoading) return <p>Loading...</p>;
  if (notesError) return <p>{notesError.message}</p>;

  return (
    <>
    <Box sx={{ display: "flex", flex: 1, flexDirection: "column", padding: 1 }}>
      <Box>
        <Typography>Nome: {clientData!.name}</Typography>
        <Typography>Id. de Cliente: {clientData!.id}</Typography>
        <Typography>Email: {clientData!.email}</Typography>
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
