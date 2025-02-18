import { useCallback, useState } from "react";
import { Outlet } from "react-router";

import DrawerCustom from "./components/SideBar/DrawerCustom";
import { Box, styled } from "@mui/material";

const Layout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const drawerWidth = 240;
  const handleDrawer = useCallback(() => {
    setIsDrawerOpen((prev) => !prev);
  }, []);

  const Main = styled("main", {
    shouldForwardProp: (prop) => prop !== "open",
  })<{
    open?: boolean;
  }>(({ theme, open }) => ({
    display: "flex",
    flex: 1,
    flexGrow: 1,
    marginTop:"70px",
    minHeight: "calc(100vh - 70px)",
    flexDirection: "column",
    justifyContent: "space-between",

    paddingInline: 2,
    marginLeft: open ? 0 : `-${drawerWidth}px`,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }));

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
        drawerWidth={drawerWidth}
      >
        <Main open={isDrawerOpen}>
          <div className="w-full ">

          <Outlet />
          </div>
          <div className="w-full ">
            <h3>Footer</h3>
          </div>
        </Main>
      </DrawerCustom>
    </Box>
  );
};

export default Layout;
