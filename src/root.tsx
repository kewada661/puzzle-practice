import {
  Outlet,
  Scripts
} from 'react-router';
import iconURL from "/favicon.svg";

import "./index.css";

export default function App() {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={iconURL} />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}