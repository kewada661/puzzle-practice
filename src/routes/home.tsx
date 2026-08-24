import type { Route } from "../../.react-router/types/src/routes/+types/home";
import {
  AuthContextProvider,
  SceneContextProvider,
} from '../context';

import App from "../App";
import "../index.css";

const Home = ({ loaderData }: Route.ComponentProps) => {
  return (
    <AuthContextProvider>
      <SceneContextProvider>
        <App />
      </SceneContextProvider>
    </AuthContextProvider>

  )
}

export const loader = () => {
  return { func: () => console.log("CLICK") };
}

export default Home