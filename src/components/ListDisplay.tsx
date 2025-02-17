import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, ListItem, List } from "@mui/material";

interface Item {
  id: number;
  name: string;
  [key: string]: any;
}

interface Props<T extends Item> {
  items: T[];
  proprieties: (keyof T)[];
}

const ListDisplay = <T extends Item>({ items, proprieties }: Props<T>) => {

  return (
    <List
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        gap: 1,
        height: "60px",
      }}
    >
      {items.map((item) => (
        <ListItem
          key={item.id}
          className="flex flex-1 flex-row bg-amber-800 hover:bg-slate-300 hover:cursor-pointer justify-between items-center "
        >
            <p className="font-bold mr-4"> {item.name}</p>
          <div className=" flex flex-1 gap-4">
            {proprieties.map((prop) => (
              <Box key={prop.toString()}>
                <p>{item[prop]}</p>
              </Box>
            ))}
          </div>
          <Box className="ml-4 hover:bg-amber-100 hover:rounded-full p-2">
            <MoreVertIcon />
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default ListDisplay;
