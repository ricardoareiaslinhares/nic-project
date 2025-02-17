import { AppBar, styled, Toolbar, Typography } from '@mui/material'

type Props = {}
const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between'
})

const NavBar = (props: Props) => {
  return (
    <AppBar position='sticky'>
        <StyledToolbar>
            <Typography variant='h6'>NavBar</Typography>

        </StyledToolbar>
    </AppBar>
  )
}

export default NavBar