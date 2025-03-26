import Home from "./pages/Home";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import NotFoundError from "./pages/NotFoundError";
import Clients from "./pages/clients/Clients";
import Layout from "./Layout";
import { UserProfile } from "./pages/userProfile/UserProfile";
import { NotesScreen } from "./sand-box/NotesScreen";
import { Record } from "./components/record/Record";
import { Records } from "./components/records/Records";
import {
  clientDetailsScreenConfig,
  clientsScreenConfig,
} from "./api_2/clientsConfig";
import { Client } from "./types/entities/client";
import { ClientDetails } from "./pages/clientDetailsNew/ClientDetails";

const clientsScreen = {
  path: "/clients",
  element: (
    <Records recordConfig={clientsScreenConfig} children={<Clients />} />
  ),
};

const clientDetailsScreen = {
  path: "/clients/:id",
  element: (
    <Record
      recordConfig={clientDetailsScreenConfig}
      children={<ClientDetails />}
    />
  ),
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundError />,
    children: [
      { index: true, element: <Home /> },
      { path: "/user", element: <UserProfile /> },
      { path: clientsScreen.path, element: clientsScreen.element },
      { path: clientDetailsScreen.path, element: clientDetailsScreen.element },
      { path: "/sandbox", element: <NotesScreen /> },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
