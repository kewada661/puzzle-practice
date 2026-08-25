import type { Route } from "../../.react-router/types/src/routes/+types/layout";
import { Header } from "../components";
import { Outlet } from "react-router";
import { AuthContextProvider } from "../context";

const Layout = ({ matches }: Route.ComponentProps) => {
  const showHeader = matches[2] && matches[2].pathname !== "/";
  return (
    <AuthContextProvider>
      {showHeader ? <Header /> : <></>}
      <Outlet />
    </AuthContextProvider>
  )
}

export default Layout;