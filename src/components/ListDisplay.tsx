;
import { Box, List, Typography, ListItemButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import MenuContext from "./MenuContext";
import { MenuItemOptions } from "../types";

interface Item {
  id: number;
  name: string;
  [key: string]: any;
}

interface Props<T extends Item> {
  items: T[];
  proprieties: (keyof T)[];
  go2link: string;
  menuItemOptions: MenuItemOptions[]
}

const ListDisplay = <T extends Item>({ items, proprieties, go2link, menuItemOptions }: Props<T>) => {
  const navigate = useNavigate()
  const [openMenuContext, setOpenMenuContext] = useState(false);

  const handleListItemClick = (
    id: number,
  ) => {
    navigate(go2link+String(id))
    console.log(id);
  };

  const handleMenuContextClick = (
    id: number,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setOpenMenuContext(false)
    console.log(id, "from menu");
  };

  return (
    <List
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        height: "60px",
      }}
    >
      {items.map((item) => (
        <ListItemButton
          key={item.id}
          onClick={() => handleListItemClick(item.id)}
        >
          <Typography variant="h6" mr={2}>
            {item.name}
          </Typography>
          <Box display="flex" flex={1} gap={2}>
            {proprieties.map((prop) => (
              <Box key={prop.toString()}>
                <Typography>{item[prop]}</Typography>
              </Box>
            ))}
          </Box>
        <div>
            <MenuContext isOpen={openMenuContext} menuItemOptions={menuItemOptions} id={item.id} />
          </div> 
        </ListItemButton>
      ))}
    </List>
  );
};

export default ListDisplay;
