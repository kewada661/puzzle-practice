import { useState, type FormEvent, type SubmitEventHandler } from "react";
import { useAuth } from "../hooks";

export const Auth = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  } = useAuth();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      await login({username: username, password: password});
    } catch (e) {
      console.error(e);
    }
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <>
      <p>Hello, {isAuthenticated && user ? (user.username) : ("world")}!</p>
      {(isAuthenticated) ? (
        <button
          className="counter"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        (loading) ? (
          "Logging you in..."
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
        </form>

        )
      )}
    </>
  )
}