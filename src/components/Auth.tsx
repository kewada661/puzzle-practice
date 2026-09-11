import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { useAuth } from "../hooks";

export const Auth = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string | null>(null);
  const {
    // isAuthenticated,
    // loading,
    login,
    logout
  } = useAuth();
  const fetcher = useFetcher();

  useEffect(() => {
    setName(localStorage.getItem("username"));
  })

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (username === "" || password === "") {
      return;
    }
    try {
      await login({username: username, password: password});
    } catch (e) {
      console.error(e);
    } finally {
      setUsername("");
      setPassword("");
      setName(localStorage.getItem("username"))
    }
  }

  const handleLogout = async () => {
    try {
      await logout();
      setUsername("");
      setPassword("");
      setName(null);
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <>
      <p>Hello, {name ?? "world"}!</p>
      {(name !== null) ? (
        <button
          className="counter" 
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <fetcher.Form
          className="flex flex-col place-items-center gap-4"
          onSubmit={handleSubmit}
        >
          <input
            id="username"
            autoComplete="on"
            className="text-purple-900 bg-purple-200 opacity-80 rounded p-1.5 placeholder:text-purple-400"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            id="foo"
            autoComplete="on"
            className="text-purple-900 bg-purple-200 opacity-80 rounded p-1.5 placeholder:text-purple-400 "
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="counter"
            disabled={fetcher.state !== "idle"}
          >
            Auth
          </button>
          <div className="h-3">{fetcher.state !== "idle" ? `...` : ``}</div>
        </fetcher.Form>
      )}
    </>
  )
}