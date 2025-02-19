import { useCallback, useState } from "react";
import Note from "../../../entities/note";
import { ContentForModal, MenuItemOptions } from "../../../types";
import Modal from "../../../components/Modal/Modal";
import ModalContentDelete from "../../../components/Modal/ModalContentDelete";
import ListItemButtonCustom from "../../../components/List/ListItemButtonCustom";
import MenuContext from "../../../components/MenuContext/MenuContext";
import { Box, Typography } from "@mui/material";
import ContentMenu from "../../../components/ContentMenu";

type Props = {
  items: Note[];
  handleOpenNote: (id: number | null) => void;
  menuItemOptions: MenuItemOptions[];
  openModal: boolean;
  handleOpenModal: () => void;
  contentForModal: ContentForModal;
};

const RenderNotesList = ({
  items,
  handleOpenNote,
  menuItemOptions,
  openModal,
  handleOpenModal,
  contentForModal,
}: Props) => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const handleSelectItemId = useCallback((id: number) => {
    setSelectedItemId(id);
  }, []);

  const [filteredData, setFilteredData] = useState<Note[]>(items);

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

  console.log(selectedItemId);

  return (
    <>
      {items.length === 0 && <Typography>Sem notas adicionadas</Typography>}
      <ContentMenu
        handleFilteredData={handleFilteredData}
        searchPlaceHolder={"Procurar por palavras-chave"}
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
              menuItemOptions={menuItemOptions}
              id={Number(item.id)}
              selectItemId={handleSelectItemId}
            />
          </div>
        </ListItemButtonCustom>
      ))}
      <Modal open={openModal} handleOpenModal={handleOpenModal}>
        {selectedItemId !== null && (
          <ModalContentDelete
            deleteAction={() => contentForModal.action(selectedItemId)}
            cancelAction={handleOpenModal}
            title={contentForModal.title}
            message={contentForModal.message}
          />
        )}
      </Modal>
    </>
  );
};

export default RenderNotesList;
