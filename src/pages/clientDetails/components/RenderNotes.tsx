import { useCallback, useState } from "react";
import Note from "../../../entities/note";
import { ContentForModal, MenuItemOptions } from "../../../types";
import Modal from "../../../components/Modal/Modal";
import ModalContentDelete from "../../../components/Modal/ModalContentDelete";
import ListItemButtonCustom from "../../../components/ListItemButtonCustom";
import MenuContext from "../../../components/MenuContext/MenuContext";
import { Box, Typography } from "@mui/material";

type Props = {
  items: Note[];
  openNote: (id: number) => void;
  menuItemOptions: MenuItemOptions[];
  openModal: boolean;
  handleOpenModal: () => void;
  contentForModal: ContentForModal;
};

const RenderNotes = ({
  items,
  openNote,
  menuItemOptions,
  openModal,
  handleOpenModal,
  contentForModal,
}: Props) => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const selectItemId = useCallback((id: number) => {
    setSelectedItemId(id);
  }, []);

  return (
    <>
    {items.length === 0 && <Typography>Sem notas adicionadas</Typography>}
      {items.map((item: Note, index: number) => (
        <ListItemButtonCustom
          key={item.id}
          onClick={() => openNote(Number(index))}
        >
          <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
            <Typography variant="h6">Sessão {index + 1}</Typography>
            <Typography>({item.date})</Typography>
          </Box>
          <div>
            <MenuContext
              menuItemOptions={menuItemOptions}
              id={Number(item.id)}
              selectItemId={selectItemId}
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

export default RenderNotes;
