import {
  AppBar as MuiAppBar,
  IconButton,
  styled,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";

type Props = {
  handleDrawer: () => void;
  drawerWidth: number;
  open: boolean;
};
const NavBar = ({ handleDrawer, open, drawerWidth }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const goBack = () => {
    if (location.pathname !== "/") {
      navigate(-1);
    }
  };

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<{ open?: boolean }>(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
    marginLeft: open ? `${drawerWidth}px` : 0,
  }));

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={handleDrawer}
          edge="start"
          sx={{ mr: 4, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            columnGap: 2,
            alignItems: "center",
          }}
        >
          <Box sx={{
            display: location.pathname === "/" ? "hidden" : "flex",
          }}>
          <IconButton
            onClick={goBack}
            sx={{
              opacity: location.pathname === "/" ? 0 : 1,
              transition: "opacity 0.3s ease-in-out",
              pointerEvents: location.pathname === "/" ? "none" : "auto",
            }}
          >
            <ArrowBackIcon fontSize="large" sx={{ color: "black" }} />
          </IconButton>

          </Box>

          <IconButton onClick={() => navigate("/")}>
            <Typography variant="h6" noWrap>
              NIC - Project
            </Typography>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
