;
import { Box, List, Typography, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router";
import MenuContext from "./MenuContext/MenuContext";
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

  const handleListItemClick = (
    id: number,
  ) => {
    navigate(go2link+String(id))
    console.log(id);
  };


  return (
    <List
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
      }}
    >
      {items.map((item) => (
        <ListItemButton
          key={item.id}
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
                <ListItemText primary={item[prop]}  />
              </Box>
            ))}
          </Box>
        <div>
            <MenuContext menuItemOptions={menuItemOptions} id={item.id} />
          </div> 
        </ListItemButton>
      ))}
    </List>
  );
};

export default ListDisplay;
