import type { Route } from "./+types/layout";
import { Header } from "../components";
import { Outlet } from "react-router";
import { AuthContextProvider, TimerContextProvider } from "../context";
import { useAuth } from "../hooks";

export const clientLoader = async () => {
  const {
    refreshSession
  } = useAuth();
  try {
    await refreshSession();
  } catch (e) {
    console.error(e);
  }
}

export const hydrateFallback = () => {
  return <div>LOADING...</div>
}

const Layout = ({ matches }: Route.ComponentProps) => {
  const showHeader = matches[2] && matches[2].pathname !== "/";
  return (
    <AuthContextProvider>
      <TimerContextProvider>
        {showHeader ? <Header /> : <></>}
        <Outlet />
      </TimerContextProvider>
    </AuthContextProvider>
  )
}

export default Layout;