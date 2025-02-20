import {  useState } from "react";
import { Button, Menu } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuContextItem from "./MenuContextItem";
import { MenuItemOptions } from "../../types";

type Props = {
  menuItemOptions: MenuItemOptions[];
  id: number;
  selectItemId: (id: number) => void;
};

const MenuContext = ({
  menuItemOptions,
  id,
  selectItemId,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);



  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    selectItemId(id);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  type MenuItemClientProps = {
    options: MenuItemOptions[];
    handleClose: () => void;
  };
  const onClickAlsoClose = (fn:()=>void) => {
    setAnchorEl(null);
    fn();
  }
  const MenuItemClient = ({ options, handleClose }: MenuItemClientProps) => {
    return (
      <>
        {options.map((item, index) => (
          <MenuContextItem
            key={index}
            onClose={handleClose}
            onClick={() => onClickAlsoClose(() => item.onClick(id))}
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
        <MoreVertIcon color="primary" />
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
