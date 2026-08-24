import {
  Outlet,
  Scripts
} from 'react-router';
import {
  AuthContextProvider,
  SceneContextProvider,
} from './context';
import "./index.css";

export default function App() {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <AuthContextProvider>
          <SceneContextProvider>
            <Outlet />
            <Scripts />
          </SceneContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}