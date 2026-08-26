import { NavLink } from "react-router";

export const Header = () => {
  return (
    <div className="flex flex-row gap-4">
      <NavLink
        className="counter"
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className="counter"
        to="/oll"
      >
        OLL
      </NavLink>
      <NavLink
        className="counter"
        to="/pll"
      >
        PLL
      </NavLink>
      <NavLink
        className="counter"
        to="/times"
      >
        Times
      </NavLink>
    </div>
  )
}