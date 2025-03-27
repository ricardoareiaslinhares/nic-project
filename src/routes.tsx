import Home from "./pages/Home";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import NotFoundError from "./pages/NotFoundError";
import Layout from "./Layout";
import { UserProfile } from "./pages/userProfile/UserProfile";
import { NotesScreen } from "./sand-box/NotesScreen";
import { clientRoutes } from "./screens/clients/clientRoutes";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundError />,
    children: [
      { index: true, element: <Home /> },
      { path: "/user", element: <UserProfile /> },
      { path: "/sandbox", element: <NotesScreen /> },
      ...clientRoutes, // TODO Do Auth
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
