import { Button, Divider, Menu } from "@mui/material";

import { useEffect, useState } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuContextItem from "./MenuContextItem";
import { MenuItemOptions } from "../types";

type Props = {
  isOpen: boolean;
  menuItemOptions: MenuItemOptions[];
  id: number;
};

const MenuContext = ({ isOpen, menuItemOptions, id }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (!isOpen) setAnchorEl(null);
  }, [isOpen]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  type MenuItemClientProps = {
    options: MenuItemOptions[];
    handleClose: () => void;
  };
  const MenuItemClient = ({ options, handleClose }: MenuItemClientProps) => {
    return (
      <>
        {options.map((item, index) => (
          <MenuContextItem
            key={index}
            onClose={handleClose}
            onClick={() => item.onClick(id)}
            sx={{ color: item.label === "Apagar" ? "red" : "black" }}
          >
            {item.icon}
            {item.label}
          </MenuContextItem>
        ))}
      </>
    );
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onMouseDown={(event) => event.stopPropagation()} //stops parent ripple effect
        sx={{
          outline: "none",
          "&:focus": { outline: "none" },
          "&:focus-visible": { outline: "none" },
          display: "flex",
          flex: 0,
          alignItems: "center",
          minWidth: "unset",
          justifyContent: "center",
          borderRadius: "9999px",
          bgcolor: "transparent",
          color: "black",
          transition: "background-color 0.2s ease-in-out",
          ":hover": { cursor: "pointer", bgcolor: "aquamarine" },
          ml: 4,
          p: 2,
        }}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl} //MUI prop for popups
        open={open}
        onClick={(event) => event.stopPropagation()}
        onMouseDown={(event) => event.stopPropagation()}
        onClose={handleClose}
      >
        <MenuItemClient options={menuItemOptions} handleClose={handleClose} />
      </Menu>
    </div>
  );
};

export default MenuContext;
