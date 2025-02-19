import TextField from '@mui/material/TextField';

type Props = {}

const SearchBar = (props: Props) => {
  return (
    <TextField
    id="outlined-controlled"
    label="Controlled"
    value={name}
    //onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
     // setName(event.target.value);
  //  }}
  />
  )
}

export default SearchBar