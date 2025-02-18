import { List } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  renderList: ReactNode;
};

const ListDisplay = ({ children, renderList }: Props) => {
  return (
    <List
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
      }}
    >
      {renderList}
      {children}
    </List>
  );
};

export default ListDisplay;
