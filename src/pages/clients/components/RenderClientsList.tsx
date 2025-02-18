import { Typography } from "@mui/material";
import MenuContext from "../../../components/MenuContext/MenuContext";
import Modal from "../../../components/Modal/Modal";
import { ContentForModal, MenuItemOptions } from "../../../types";
import ModalContentDelete from "../../../components/Modal/ModalContentDelete";
import { useCallback, useState } from "react";
import Client from "../../../entities/client";
import ListItemButtonCustom from "../../../components/ListItemButtonCustom";

type Props = {
  items: Client[];
  navigate2ClientDetails: (id: number) => void;
  menuItemOptions: MenuItemOptions[];
  openModal: boolean;
  handleOpenModal: () => void;
  contentForModal: ContentForModal;
};

const RenderClientsList = ({
  items,
  navigate2ClientDetails,
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
      {items.map((item: Client) => (
        <ListItemButtonCustom
          key={item.id}
          onClick={() => navigate2ClientDetails(Number(item.id))}
        >
          <Typography variant="h6">{item.name}</Typography>
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

export default RenderClientsList;
