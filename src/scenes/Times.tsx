import { TimesList } from "../components";
import { useAuth } from "../hooks";
import { useSceneContext } from "../context";

export const Times = () => {
  const {
    isAuthenticated,
  } = useAuth();
  const { setScene } = useSceneContext();
  if (!isAuthenticated) {
    setScene("HOME");
  }

  return (
    <>
      <TimesList />
    </>
  )
}