import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, ListItem, List, Typography, ListItemButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

interface Item {
  id: number;
  name: string;
  [key: string]: any;
}

interface Props<T extends Item> {
  items: T[];
  proprieties: (keyof T)[];
  go2link: string;
}

const ListDisplay = <T extends Item>({ items, proprieties, go2link }: Props<T>) => {
  const navigate = useNavigate()

  const handleListItemClick = (
    id: number,
  ) => {
    navigate(go2link+String(id))
    console.log(id);
  };

  const handleListButtonClick = (
    id: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setSelectedId(id);
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
          className="flex flex-1 flex-row border-b-1 hover:bg-slate-300 hover:cursor-pointer justify-end items-center "
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

          <ListItemButton
            onClick={(event) => handleListButtonClick(item.id, event)}
            onMouseDown={(event) => event.stopPropagation()} //stops parent ripple effect
            sx={{
              display: "flex",
              flex: 0,
              alignItems: "center",
              minWidth: "unset",
              justifyContent: "center",
              borderRadius: "9999px",
              bgcolor: "transparent",
              transition: "background-color 0.2s ease-in-out",
              ":hover": { cursor: "pointer", bgcolor: "aquamarine" },
              ml: 4,
              p: 2,
            }}
          >
            <MoreVertIcon />
          </ListItemButton>
        </ListItemButton>
      ))}
    </List>
  );
};

export default ListDisplay;
