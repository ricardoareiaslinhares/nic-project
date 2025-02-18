import { SxProps, Theme, MenuItem } from "@mui/material";
import { JSX } from "react";

type props = {
  onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
} & JSX.IntrinsicElements["button"];

const MenuContextItem = ({ onClose, children, sx, ...props }: props) => {
  return (
    <MenuItem
      component="button"
      onClick={onClose}
      disableRipple
      onMouseDown={(event) => event.stopPropagation()}
      {...props}
      sx={{
        outline: "none",
        "&:focus": { outline: "none" },
        "&:focus-visible": { outline: "none" },
        display: "flex",
        flex: 1,
        flexDirection: "row",
        columnGap: 2,
        width: "100%",
        ...sx,
      }}
    >
      {children}
    </MenuItem>
  );
};

export default MenuContextItem;
