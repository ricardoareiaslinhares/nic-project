import MenuItem from "@mui/material/MenuItem";

type props = {
    onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    children: React.ReactNode
}
const MenuContextItem = ({ onClose, children, ...props }: props) => {
    return (
      <MenuItem
        component="button"
        onClick={onClose}
        disableRipple
        onMouseDown={(event) => event.stopPropagation()}
        sx={{
          outline: "none",
          "&:focus": { outline: "none" },
          "&:focus-visible": { outline: "none" },
          display: "flex",
          flex: 1,
          flexDirection: "row",
          columnGap:1,
          width: "100%",
        }}
        {...props}
      >
        {children}
      </MenuItem>
    );
  };

  export default MenuContextItem