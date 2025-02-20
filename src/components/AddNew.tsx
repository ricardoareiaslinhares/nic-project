import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box, IconButton } from "@mui/material";

type Props = {
  onClick: () => void
};

const AddNew = ({onClick}: Props) => {
  return (
    <Box>
      <IconButton color="primary" onClick={onClick}>
        <AddCircleOutlineIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default AddNew;
