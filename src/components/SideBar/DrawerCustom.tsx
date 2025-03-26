import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer,
  CssBaseline,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  PeopleAlt as PeopleAltIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";

import NavBar from "./NavBar";
import { useNavigate } from "react-router";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { getClients } from "../../api/clients/clientsApi";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const isCacheReady = (queryClient: QueryClient, queryKey: string) => {
  const cacheList = queryClient.getQueryData([queryKey]) as any[];
  return cacheList && cacheList.length > 1;
};

type Props = {
  handleDrawer: () => void;
  open: boolean;
  drawerWidth: number;
  children?: React.ReactNode;
};
const DrawerCustom = ({ open, drawerWidth, handleDrawer, children }: Props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleClientsClick = (path: string) => {
    if (!isCacheReady(queryClient, "clients")) {
      queryClient.resetQueries({ queryKey: ["clients"] });
    }
    if (location.pathname !== path) {
      navigate(path);
    } else {
    }
  };

  // Prefetch Queries on hover, except if we are on the clients page
  const handleClientsHover = () => {
    if (location.pathname === "/clients") return;
    setTimeout(() => {
      queryClient.prefetchQuery({
        queryKey: ["clients"],
        queryFn: getClients,
      });
    }, 300);
  };

  const drawerItems = [
    { label: "Perfil", path: "/user", icon: <AccountCircleIcon /> },
    { label: "Clientes", path: "/clients", icon: <PeopleAltIcon /> },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar
        drawerWidth={drawerWidth}
        handleDrawer={handleDrawer}
        open={open}
      />
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: 4,
          }}
        >
          <Typography variant="h6" noWrap component="div">
            Logo
          </Typography>
          <IconButton onClick={handleDrawer}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          {drawerItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onMouseEnter={handleClientsHover}
                onClick={() => handleClientsClick(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {children}
    </Box>
  );
};

export default DrawerCustom;
