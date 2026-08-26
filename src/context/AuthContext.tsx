import { createContext, useContext, useState, type ReactNode, type SetStateAction } from "react";
import type { User } from "../types";

interface AuthContextValue {
  user: User | null,
  setUser: React.Dispatch<SetStateAction<User | null>>,
}
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used inside AuthContextProvider");
  }
  return context;
}