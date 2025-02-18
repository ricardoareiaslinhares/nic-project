import { Box, ListItem, ListItemButton, Typography } from "@mui/material";
import MenuContext from "../../../components/MenuContext/MenuContext";
import Modal from "../../../components/Modal/Modal";
import { ContentForModal, MenuItemOptions } from "../../../types";
import ModalContentDelete from "../../../components/Modal/ModalContentDelete";
import { useCallback, useState } from "react";

interface Item {
  id: number;
  name: string;
  [key: string]: any;
}
type Props = {
  items: Item[];
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
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null)

  const selectItemId = useCallback((id:number)=>{
    setSelectedItemId(id)
  },[])
  
  return (
    <>
      {items.map((item: Item) => (
        <ListItem
          key={item.id}
          disablePadding
          sx={{ bgcolor: "#f5f5f5", marginBottom: "4px" }}
        >
          <ListItemButton
            onClick={() => navigate2ClientDetails(item.id)}
            sx={{
              display: "flex",
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              columnGap: 2,
            }}
          >
            <Typography variant="h6">{item.name}</Typography>
            <div>
              <MenuContext menuItemOptions={menuItemOptions} id={item.id} selectItemId={selectItemId} />
            </div>
          </ListItemButton>
        </ListItem>
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
