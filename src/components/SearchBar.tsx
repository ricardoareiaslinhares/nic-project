import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent} from "react";

type Props = {
  handleFilteredData: (input: string) => void;
  placeHolder?: string
};

const SearchBar = ({ handleFilteredData, placeHolder="Procurar por nome" }: Props) => {
  
  const inputHandle = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const lowerCase = event.target.value.toLowerCase();
    handleFilteredData(lowerCase);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        columnGap: 1,
        margin: 2,
      }}
    >
      <SearchIcon fontSize="large" />
      <TextField
        size="small"
        id="outlined-controlled"
        label={placeHolder}
        color="secondary"
        sx={{ width: { xs: "200px", sm: "400px" } }}
        onChange={(e) => inputHandle(e)}
      />
    </Box>
  );
};

export default SearchBar;
