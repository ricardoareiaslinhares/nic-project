import { List, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  renderList: ReactNode;
  sx?: SxProps<Theme>;
};

const ListDisplay = ({ children, renderList, sx }: Props) => {
  return (
    <List
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        ...sx
      }}
    >
      {renderList}
      {children}
    </List>
  );
};

export default ListDisplay;
