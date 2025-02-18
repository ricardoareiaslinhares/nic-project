import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getClientById } from "../../api/clientsApi";
import validateParamsId from "../../utils/validateParamsId";
import ListDisplay from "../../components/ListDisplay";
import RenderNotes from "./components/RenderNotes";

type Props = {}

const ClientDetails = (props: Props) => {
  const { id } = useParams();
  const numericId = validateParamsId(id)
  if (!numericId) return <p>Invalid client Id</p>
  
  const {data, error, isLoading} = useQuery({
    queryKey:["clients", id],
    queryFn: () => getClientById(numericId)
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>
  return (

    <Box sx={{ display: "flex", flex: 1, flexDirection: "column", padding:1 }}>
      <Box>
        
      <Typography>Nome: {data!.name}</Typography>
      <Typography>Id. de Cliente: {data!.id}</Typography>
      <Typography>Email: {data!.email}</Typography>
      </Box>
      <Box>
        <ListDisplay
        renderList={<RenderNotes/>}
        >

        </ListDisplay>
      </Box>
    </Box>
  )
}

export default ClientDetails