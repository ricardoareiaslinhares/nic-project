import { Outlet } from "react-router";
import SideBar from "./components/SideBar";

const Layout = () => {
  return (
    <main className="flex flex-1 flex-col  bg-red-200w-screen min-h-screen">
      <div className="h-12 bg-blue-900 w-screen">navbar</div>
      <section className="flex flex-1 flex-row itens-start bg-amber-200">
        <SideBar />
        <Outlet />
      </section>

      <h3>Footer</h3>
    </main>
  );
};

export default Layout;
