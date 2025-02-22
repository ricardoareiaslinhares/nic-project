import { Box } from '@mui/material'
import SearchBar from './SearchBar'
import AddNew from './AddNew'

type Props = {
  handleFilteredData?:  (input: string) => void;
  searchPlaceHolder?: string
  addNewClick: () => void
}

const ContentMenu = ({handleFilteredData, searchPlaceHolder, addNewClick}: Props) => {
  return (
    <Box sx={{display:"flex", flex:1, alignItems:"center", flexDirection:"row", justifyContent:"start" }}>
        <div>
          {handleFilteredData &&
        <SearchBar handleFilteredData={handleFilteredData} placeHolder={searchPlaceHolder}/>
          }
        </div>
        <AddNew onClick={addNewClick}/>
    </Box>
  )
}

export default ContentMenu