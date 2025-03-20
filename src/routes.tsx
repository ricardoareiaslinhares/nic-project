import Home from "./pages/Home";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import NotFoundError from "./pages/NotFoundError";
import Clients from "./pages/clients/Clients";
import ClientDetails from "./pages/clientDetails/ClientDetails";
import Layout from "./Layout";
import { UserProfile } from "./pages/userProfile/UserProfile";
import { NotesScreen } from "./sand-box/NotesScreen";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundError />,
    children: [
      { index: true, element: <Home /> },
      { path: "/user", element: <UserProfile /> },
      { path: "/clients", element: <Clients /> },
      { path: "/clients/:id", element: <ClientDetails /> },
      { path: "sandbox", element: <NotesScreen /> },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
