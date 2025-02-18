import {
  Box,
  List,
  Typography,
  ListItemButton,
  ListItemText,
  ListItem,
} from "@mui/material";
import { useNavigate } from "react-router";
import MenuContext from "./MenuContext/MenuContext";
import { MenuItemOptions } from "../types";
import SearchBar from "./SearchBar";
import Modal from "./Modal/Modal";
import { useCallback, useState } from "react";
import ModalContentDelete from "./Modal/ModalContentDelete";

interface Item {
  id: number;
  name: string;
  [key: string]: any;
}

interface Props<T extends Item> {
  items: T[];
  proprieties: (keyof T)[];
  go2link: string;
  menuItemOptions: MenuItemOptions[];
}

const ListDisplay = <T extends Item>({
  items,
  proprieties,
  go2link,
  menuItemOptions,
}: Props<T>) => {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = useCallback(() => {
    console.log("called");
    setOpenModal((prev) => !prev);
  }, []);

  const handleListItemClick = (id: number) => {
    navigate(go2link + String(id));
    console.log(id);
  };

  const deleteClientForModal = (id:number) => {
    // deleteClient(id)
    console.log(id)
    //handleOpenModal();
  };

  let menuItemOptionsModified = [...menuItemOptions];
  menuItemOptionsModified[2].onClick = handleOpenModal;

  return (
    <>
      <List
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
        <SearchBar />
        {items.map((item) => (
          <ListItem
            key={item.id}
            disablePadding
            sx={{ bgcolor: "#f5f5f5", marginBottom: "4px" }}
          >
            <ListItemButton
              onClick={() => handleListItemClick(item.id)}
              sx={{
                display: "flex",
                flex: 1,
                flexDirection: "row",
                columnGap: 2,
              }}
            >
              <Typography variant="h6">{item.name}</Typography>
              <Box display={{ xs: "none", md: "flex" }} flex={1} gap={2}>
                {proprieties.map((prop) => (
                  <Box key={prop.toString()}>
                    <ListItemText primary={item[prop]} />
                  </Box>
                ))}
              </Box>
              <div>
                <MenuContext menuItemOptions={menuItemOptionsModified} id={item.id} />
              </div>
            </ListItemButton>
            <Modal open={openModal} handleOpenModal={handleOpenModal}>
              <ModalContentDelete
                deleteAction={() => deleteClientForModal(item.id)}
                cancelAction={handleOpenModal}
                title="Apagar Cliente"
                message="Tem certeza que deseja apagar esse cliente?"
              />
            </Modal>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ListDisplay;
