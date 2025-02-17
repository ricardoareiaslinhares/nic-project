import {
  Button,
  Divider,
  MenuItem,
  Menu,
  ListItemButton,
  MenuProps,
} from "@mui/material";

import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuContextItem from "./MenuContextItem";

type Props = {
  isOpen: boolean;
  onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const MenuContext = ({ isOpen, onClose }: Props) => {
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
        anchorEl={anchorEl}
        open={open}
        onClick={(event) => event.stopPropagation()}
        onMouseDown={(event) => event.stopPropagation()}
        onClose={handleClose}
      >
        <MenuContextItem onClose={handleClose}>
          <EditIcon />
          Edit
        </MenuContextItem>
        <MenuContextItem onClose={handleClose}>
          <FileCopyIcon />
          Duplicate
        </MenuContextItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuContextItem onClose={handleClose}>
          <ArchiveIcon />
          Archive
        </MenuContextItem>
        <MenuContextItem onClose={handleClose}>
          <MoreHorizIcon />
          More
        </MenuContextItem>
      </Menu>
    </div>
  );
};

export default MenuContext;
