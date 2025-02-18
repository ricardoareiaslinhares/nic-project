import { Box, Paper, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getClientById } from "../../api/clientsApi";
import validateParamsId from "../../utils/validateParamsId";
import ListDisplay from "../../components/ListDisplay";
import RenderNotes from "./components/RenderNotes";
import { getNotesByClientId } from "../../api/notesApi";
import { useCallback, useState } from "react";
import { MenuOptions } from "../../utils/menuItemOptions";
import { ContentForModal } from "../../types";
import NoteDetails from "./components/NoteDetails";

type Props = {};

const ClientDetails = (props: Props) => {
  const { id } = useParams();
  const numericId = validateParamsId(id);
  if (!numericId) return <p>Invalid client Id</p>;

  const {
    data: clientData,
    error: clientError,
    isLoading: clientIsLoading,
  } = useQuery({
    queryKey: ["clients", id],
    queryFn: () => getClientById(numericId),
  });

  const {
    data: notesData,
    error: notesError,
    isLoading: notesIsLoading,
  } = useQuery({
    queryKey: ["notes", numericId],
    queryFn: () => getNotesByClientId(numericId),
  });
  // Notes related
  const indexOfLastNote = (notesData && notesData.length>0) ? notesData.length-1 : null
  console.log(indexOfLastNote)
  const [openNote, setOpenNote] = useState<number | null>(indexOfLastNote);

  const handleOpenNote = useCallback((id: number) => {
    setOpenNote(id);
  }, []);


  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = useCallback(() => {
    setOpenModal((prev) => !prev);
  }, []);

  const NotesMenuOptions = new MenuOptions({
    openFn: handleOpenNote,
    editFn: handleOpenNote,
    deleteFn: handleOpenModal,
  }).getItem();

  const contentForModal: ContentForModal = {
    title: "Apagar Nota",
    message: "Tem certeza que deseja apagar esta Nota?",
    action: (id: number) => {
      console.log("apagar", id);
    },
  };
  if (clientIsLoading) return <p>Loading...</p>;
  if (clientError) return <p>{clientError.message}</p>;
  if (notesIsLoading) return <p>Loading...</p>;
  if (notesError) return <p>{notesError.message}</p>;




  return (
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
              <RenderNotes
                items={notesData ?? []}
                openNote={handleOpenNote}
                menuItemOptions={NotesMenuOptions}
                openModal={openModal}
                handleOpenModal={handleOpenModal}
                contentForModal={contentForModal}
              />
            }
          />

          {(openNote !== null && notesData) ? (
            <NoteDetails
              noteContent={notesData![openNote].note}
              openNote={openNote}
            />
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ClientDetails;
