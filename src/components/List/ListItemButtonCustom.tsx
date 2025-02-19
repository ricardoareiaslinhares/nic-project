import { ListItem, ListItemButton, SxProps, Theme } from "@mui/material";

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

const ListItemButtonCustom = ({ onClick, children, sx, ...props }:Props) => {
  return (
    <ListItem disablePadding sx={{ bgcolor: "#f5f5f5", marginBottom: "4px" }} {...props}>
      <ListItemButton
        onClick={onClick}
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          columnGap: 2,
          ...sx
        }}
      >
        {children}
      </ListItemButton>
    </ListItem>
  );
};

export default ListItemButtonCustom;