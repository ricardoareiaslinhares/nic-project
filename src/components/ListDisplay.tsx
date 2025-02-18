import { Box, List } from "@mui/material";
import SearchBar from "./SearchBar";

import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  renderList: ReactNode;
};

const ListDisplay = ({ children, renderList }: Props) => {
  const deleteClientForModal = (id: number) => {
    // deleteClient(id)
    console.log(id);
    //handleOpenModal();
  };

  /*   let menuItemOptionsModified = [...menuItemOptions];
  menuItemOptionsModified[2].onClick = handleOpenModal; */

  return (
    <List
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
      }}
    > {renderList}

    </List>
  );
};

export default ListDisplay;
