import { useCallback, useEffect, useMemo, useState } from "react";
import Note from "../../../entities/note";
import Modal from "../../../components/Modal/Modal";
import ModalContentDelete from "../../../components/Modal/ModalContentDelete";
import ListItemButtonCustom from "../../../components/List/ListItemButtonCustom";
import MenuContext from "../../../components/MenuContext/MenuContext";
import { Box, Typography } from "@mui/material";
import ContentMenu from "../../../components/ContentMenu";
import {
  ContentForModalBase,
  ContentForModalDeleteFn,
  MenuItemOptions,
  ModalsControl,
} from "../../../types";
import useQueryDelete from "../../../hooks/useQueryDelete";
import getItemFromListById from "../../../utils/getItemFromListById";
import { deleteNote, getNotes } from "../../../api/notesApi";
import ModalContentNote from "./ModalContentNote";
import FormNote from "./FormNote";
import getIdOfLastListItem from "../../../utils/getIdOfLastListItem";
import { MenuOptions } from "../../../utils/menuItemOptions";
import useNoteModals from "../../../hooks/useNoteModals";
import useQueryGet from "../../../hooks/useQueryGet";
import Toast from "../../../components/Toast";
import useToast from "../../../hooks/useToast";

type Props = {
  items: Note[];
  clientId: number;
  handleOpenNote: (id: number | null) => void;
  //noteModals: ModalsControl; // expandir isto e substituir
};

const RenderNotesList = ({
  items,
  handleOpenNote,
  clientId,
}: //noteModals,
Props) => {
  // This query and fn are to get the last id of a note,
  //  to simulate the creation of a new note with a new id
  const { data, error, isLoading } = useQueryGet({
    queryKey: "notes",
    getFn: getNotes,
  });

  const newNoteId = getIdOfLastListItem(data ?? []) + 1;

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const {
    isCreateEditModalOpen,
    isCreateMode,
    openCreateModal,
    closeModal,
    isDeleteModalOpen,
    toggleModalDelete,
    openEditModal,
  } = useNoteModals();


  const NotesMenuOptions = new MenuOptions({
    editFn: openEditModal!,
    deleteFn: toggleModalDelete,
  }).getOptions();

  const handleSelectItemId = useCallback((idNote: number) => {
    setSelectedItemId(idNote);
  }, []);

  const [filteredData, setFilteredData] = useState<Note[]>(items);

  useEffect(() => {
    console.log("items by usef");
    setFilteredData(items);
  }, [items]);

  const handleFilteredData = useCallback((input: string) => {
    if (input) {
      const newData = items.filter((item) =>
        item.note.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredData(newData);

      if (newData.length === 0) {
        handleOpenNote(null);
      }
      handleOpenNote(Number(newData[0].id));
    } else {
      setFilteredData(items);
    }
  }, []);

  // Modal Delete
  const {
    mutate: mutateDelete,
    isError: isErrorDelete,
    isPending: isPendingDelete,
    isSuccess: isSuccessDelete,
  } = useQueryDelete({ deletefn: deleteNote, queryKey: ["notes", clientId] });

  const {openToast, showToast, closeToast} = useToast()
  useEffect(() => {
    showToast(isSuccessDelete, isErrorDelete);
  }, [isSuccessDelete, isErrorDelete]);

  const contentForModalDeleteFn: ContentForModalDeleteFn<Note> = (data) => {
    console.log("contentForModalDeleteFn");
    return (id: number) => {
      const date = getItemFromListById(data, id.toString())?.date || "";
      return {
        title: "Apagar Nota",
        message: `Tem certeza que deseja apagar a nota de ${date} ?`,
        action: () => {
          toggleModalDelete();
          mutateDelete(id);
        },
      };
    };
  };
  const contentForModalDelete = contentForModalDeleteFn(items);

  const contentForModalNote: ContentForModalBase = {
    title: isCreateMode ? "Adicionar Nota" : "Editar Nota",
    message: isCreateMode
      ? "Por favor preencha todos os campos"
      : "Por favor modifique os campos que pretende atualizar",
  };
  //HERE

  const fallBackNote: Note = {
    id: "0",
    clientId: "0",
    date: "",
    note: "",
  };
  const selectNoteForEdit = useMemo(() => {
    return (id: number) => getItemFromListById<Note>(items, id.toString()) ?? fallBackNote;
  }, [items]);

  
  if (error) return <div>Error loading notes data for simulating last id</div>;
  if (isLoading) return <div>Loading data for simulating last id</div>;
  return (
    <>
      {items.length === 0 && <Typography>Sem notas adicionadas</Typography>}

      <ContentMenu
        handleFilteredData={items.length > 0 ? handleFilteredData : undefined}
        searchPlaceHolder={"Procurar por palavras-chave"}
        addNewClick={openCreateModal}
      />
      {filteredData.map((item: Note) => (
        <ListItemButtonCustom
          key={item.id}
          onClick={() => handleOpenNote(Number(item.id))}
        >
          <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
            <Typography variant="h6">Sessão - {item.date} </Typography>
          </Box>
          <div>
            <MenuContext
              menuItemOptions={NotesMenuOptions}
              id={Number(item.id)}
              selectItemId={handleSelectItemId}
            />
          </div>
        </ListItemButtonCustom>
      ))}
      <Modal open={isDeleteModalOpen} handleOpenModal={toggleModalDelete}>
        {selectedItemId !== null && (
          <ModalContentDelete
            cancelAction={toggleModalDelete}
            selectedId={selectedItemId}
            content={contentForModalDelete}
          />
        )}
      </Modal>
      <Modal
        open={isCreateEditModalOpen}
        handleOpenModal={openCreateModal}
        disableOutsideClick
      >
        <ModalContentNote
          cancelAction={closeModal}
          content={contentForModalNote}
        >
          <FormNote
            create={isCreateMode}
            newId={newNoteId}
            selectedId={selectedItemId}
            clientId={clientId}
            getNoteData={selectNoteForEdit}
            modalControl={closeModal}
            showToast={showToast}
          />
        </ModalContentNote>
      </Modal>
      <Toast openToast={openToast} closeToast={closeToast}/>
    </>
  );
};

export default RenderNotesList;
