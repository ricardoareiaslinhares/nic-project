import Home from "./pages/Home";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import NotFoundError from "./pages/NotFoundError";
import Clients from "./pages/clients/Clients";
import ClientDetails from "./pages/ClientDetails";
import Layout from "./Layout";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFoundError />,
        children: [
            {index: true, element: <Home />},
            {path: "/clients", element: <Clients />},
            {path: "/clients/:id", element: <ClientDetails />},
        ]
    },

];

const router = createBrowserRouter(routes);
export default router;