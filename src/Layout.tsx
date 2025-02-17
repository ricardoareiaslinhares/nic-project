import { Outlet } from "react-router";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";

const Layout = () => {
  return (
    <main className="flex flex-1 flex-col  bg-red-200w-screen min-h-screen w-screen">
        <NavBar />
      <section className="flex flex-1 flex-row itens-start bg-amber-200">
        <SideBar />
        <Outlet />
      </section>

      <h3>Footer</h3>
    </main>
  );
};

export default Layout;
