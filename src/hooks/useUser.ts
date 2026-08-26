import { useState } from "react";
import type { User } from "../types";
import { UserAPI } from "../api";

interface useUserResults {
  loading: boolean,
  error: Error | null,
  getUser: (user_id: number) => Promise<User>,
}

export const useUser = (): useUserResults => {
  // const {
  //   user,
  //   setUser
  // } = useAuthContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getUser = async (user_id: number) => {
    setLoading(true);
    setError(null);
    try {
      return await UserAPI.getUserRequest(user_id);
    } catch {
      const normalizedError = error instanceof Error ? error : new Error("Get request failed");
      setError(normalizedError);
      throw normalizedError;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    getUser
  }
}