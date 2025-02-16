import { Outlet } from "react-router"

const Layout = () => {
  return (
    <main className="flex flex-1 flex-col items-center bg-red-200 ml-[250px] p-4 w-screen min-h-screen">
        <h1>Header</h1>
        <Outlet />
        <h3>Footer</h3>
    </main>
  )
}

export default Layout