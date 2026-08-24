import {
  Outlet,
  Scripts
} from 'react-router';
import iconURL from "/favicon.svg";

import style from "./index.css?url";

export default function App() {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={iconURL} />
        <link rel="stylesheet" href={style} />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}