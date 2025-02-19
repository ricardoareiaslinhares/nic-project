import { Box } from '@mui/material'
import SearchBar from './SearchBar'
import AddNew from './AddNew'

type Props = {
  handleFilteredData:  (input: string) => void;
  searchPlaceHolder?: string
}

const ContentMenu = ({handleFilteredData, searchPlaceHolder}: Props) => {
  return (
    <Box sx={{display:"flex", flex:1, alignItems:"center", flexDirection:"row", justifyContent:"start" }}>
        <div>
        <SearchBar handleFilteredData={handleFilteredData} placeHolder={searchPlaceHolder}/>
        </div>
        <AddNew/>

    </Box>
  )
}

export default ContentMenu