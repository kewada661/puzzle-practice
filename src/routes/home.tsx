import type { Route } from "../../.react-router/types/src/routes/+types/home";
import App from "../App";

const Home = ({}: Route.ComponentProps) => {
  return <App />;
}

export const loader = () => {
  return { message: "Hello world!"};
}

export default Home