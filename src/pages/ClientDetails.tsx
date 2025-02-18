import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

type Props = {}

const ClientDetails = (props: Props) => {
  const { id } = useParams();
  if (!id) return <p>Cliente não existe!</p>;

  return (

    <Box sx={{ display: "flex", flex: 1, flexDirection: "column", padding:1 }}>
      <Typography>Clientid: {id}</Typography>
    </Box>
  )
}

export default ClientDetails