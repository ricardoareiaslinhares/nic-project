import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { getClientById } from "../../api/clientsApi";
import validateParamsId from "../../utils/validateParamsId";
import ListDisplay from "../../components/List/ListDisplay";
import RenderNotesList from "./components/RenderNotesList";
import { deleteNote, getNotesByClientId } from "../../api/notesApi";
import { useCallback, useState } from "react";
import { MenuOptions } from "../../utils/menuItemOptions";
import { ContentForModalBase, ContentForModalDeleteFn } from "../../types";
import NoteDetails from "./components/NoteDetails";
import useQueryDetails from "../../hooks/useQueryDetails";
import Note from "../../entities/note";
import getItemFromListById from "../../utils/getItemFromListById";
import useQueryDelete from "../../hooks/useQueryDelete";

type Props = {};

const ClientDetails = (props: Props) => {
  console.log("ClientDetails rendered!");
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


  const [openNote, setOpenNote] = useState<number | null>(null);

  const handleOpenNote = useCallback(
    (id: number | null) => {
      setOpenNote(id);
    },
    [openNote]
  );

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = useCallback(() => {
    setOpenModal((prev) => !prev);
  }, []);

  const {
    mutate: mutateDelete,
    isError: isErrorDelete,
    isPending: isPendingDelete,
    isSuccess: isSuccessDelete,
  } = useQueryDelete({ deletefn: deleteNote, queryKey: "notes" });

  const contentForModalDeleteFn: ContentForModalDeleteFn<Note> = (data) => {
    return (id: number) => {
      const date = getItemFromListById(data, id).date
      return {
        title: "Apagar Nota",
        message: `Tem certeza que deseja apagar a nota de ${date} ?`,
        action: () => {
          toggleModalDelete(); // mudar isto, fazer como no outro
          mutateDelete(id);
        },
      };
    };
  };

  const NotesMenuOptions = new MenuOptions({
    editFn: handleOpenNote,
    deleteFn: handleOpenModal,
  }).getOptions();

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
              <RenderNotesList
                items={notesData ?? []}
                handleOpenNote={handleOpenNote}
                menuItemOptions={NotesMenuOptions}
                openModal={openModal}
                handleOpenModal={handleOpenModal}
                contentForModal={contentForModal}
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
  );
};

export default ClientDetails;
