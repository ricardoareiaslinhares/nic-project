import { useCallback, useState } from "react";
import { Outlet } from "react-router";

import DrawerCustom from "./components/SideBar/DrawerCustom";
import { Box, styled } from "@mui/material";


const DRAWER_WIDTH = 240;

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  display: "flex",
  flex: 1,
  flexGrow: 1,
  marginTop: "70px",
  minHeight: "calc(100vh - 70px)",
  flexDirection: "column",
  justifyContent: "space-between",

  paddingInline: 2,
  marginLeft: open ? 0 : `-${DRAWER_WIDTH}px`,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Layout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const handleDrawer = useCallback(() => {
    setIsDrawerOpen((prev) => !prev);
  }, []);

  return (
    <Box
      sx={{
        width: "100vw",
        paddingBottom: 1,
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <DrawerCustom
        open={isDrawerOpen}
        handleDrawer={handleDrawer}
        drawerWidth={DRAWER_WIDTH}
      >
        <Main open={isDrawerOpen}>
          <div>
            <Outlet />
          </div>
          <Box
            sx={{
              bgcolor: "yellow",
              display: "flex",
              justifyContent: "center",
              padding: 1,
            }}
          >
            <h3>Footer</h3>
          </Box>
        </Main>
      </DrawerCustom>
    </Box>
  );
};

export default Layout;
