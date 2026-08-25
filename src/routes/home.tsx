import type { Route } from "../../.react-router/types/src/routes/+types/home";
import { NavLink } from "react-router";
import {
  AuthContextProvider,
} from '../context';

import { Auth } from "../components";
import "../index.css";
import { useState } from "react";

export const Home = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <>
      <section id="center">
        <Auth />
        <button
          // type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
        <NavLink
          className="counter"
          to="/oll"
        >
          Practice OLL
        </NavLink>
        <NavLink
          className="counter"
          to="/pll"
        >
          Practice PLL
        </NavLink>
        <NavLink
          className="counter"
          to="/times"
        >
          View times
        </NavLink>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default Home;