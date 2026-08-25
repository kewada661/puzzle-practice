import { useEffect, useState } from "react";
import { useAuth } from "../hooks";

export const Auth = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string | null>(localStorage.getItem("username"));
  const {
    isAuthenticated,
    loading,
    login,
    logout
  } = useAuth();

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
      setUsername("");
      setPassword("");
      setName(null);
      await logout();
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <>
      <p>Hello, {name ?? "world"}!</p>
      {(isAuthenticated || name) ? (
        <button
          className="counter" 
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <form 
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
            disabled={loading}
          >
            Auth
          </button>
          <div className="h-3">{loading ? `...` : ``}</div>
        </form>
      )}
    </>
  )
}