import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box, IconButton } from "@mui/material";

type Props = {};

const AddNew = (props: Props) => {
  return (
    <Box>
      <IconButton color="primary">
        <AddCircleOutlineIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default AddNew;
