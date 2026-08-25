import { TimesList } from "../components";
import { useAuth } from "../hooks";
import { redirect } from "react-router";

export const Times = () => {
  const {
    isAuthenticated,
  } = useAuth();
  if (!isAuthenticated) {
    redirect('/');
  }

  return (
    <>
      <TimesList />
    </>
  )
}

export default Times;