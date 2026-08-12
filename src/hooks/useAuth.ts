import { useState } from "react";
import { useAuthContext } from "../context";
import type { LoginCredentials, User } from "../types";
import { AuthAPI } from "../api";

interface useAuthResults {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: Error | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

export const useAuth = (): useAuthResults => {
  const {
    user,
    setUser
  } = useAuthContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    try {
      const user = await AuthAPI.loginRequest(credentials);
      setUser(user);
    } catch (error) {
      const normalizedError = error instanceof Error ? error : new Error("Login failed");
      setError(normalizedError);
      throw normalizedError;
    } finally {
      setLoading(false);
    }
  }

  const logout = async () => {
    try {
      await AuthAPI.logoutRequest();
      setUser(null);
    } catch (error) {
      const normalizedError = error instanceof Error ? error : new Error("Logout failed");
      setError(normalizedError);
      throw normalizedError;
    } finally {
      setLoading(false);
    }
  }

  const refreshSession = async () => {
    try {
      const user = await AuthAPI.refreshTokenRequest();
      setUser(user);
    } catch (error) {
      const normalizedError = error instanceof Error ? error : new Error("Session refresh failed");
      setError(normalizedError);
      throw normalizedError;
    } finally {
      setLoading(false);
    }
  }

  return {
    user,
    isAuthenticated: user !== null,
    loading,
    error,
    login,
    logout,
    refreshSession
  }
}