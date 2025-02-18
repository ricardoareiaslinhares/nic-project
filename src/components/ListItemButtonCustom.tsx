import { ListItem, ListItemButton } from "@mui/material";

type Props = {
  onClick: () => void;
  children: React.ReactNode;
}

const ListItemButtonCustom = ({ onClick, children, ...props }:Props) => {
  return (
    <ListItem disablePadding sx={{ bgcolor: "#f5f5f5", marginBottom: "4px" }} {...props}>
      <ListItemButton
        onClick={onClick}
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          columnGap: 2
        }}
      >
        {children}
      </ListItemButton>
    </ListItem>
  );
};

export default ListItemButtonCustom;