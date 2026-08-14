import type { Algorithm } from "../types";
import { createContext, useContext, useState, type ReactNode, type SetStateAction } from "react";

interface AlgContextValue {
  algs: Algorithm[];
  setAlgs: React.Dispatch<SetStateAction<Algorithm[]>>;
  forDeletion: Algorithm[];
  setForDeletion: React.Dispatch<SetStateAction<Algorithm[]>>;
}

const AlgContext = createContext<AlgContextValue | undefined>(undefined)

export const AlgContextProvider = ({ children }: { children: ReactNode }) => {
  const [algs, setAlgs] = useState<Algorithm[]>([]);
  const [forDeletion, setForDeletion] = useState<Algorithm[]>([]);

  return (
    <AlgContext.Provider
      value={{
        algs,
        setAlgs,
        forDeletion,
        setForDeletion
      }}
    >
      {children}
    </AlgContext.Provider>
  )
}

export const useAlgContext = () => {
  const context = useContext(AlgContext);
  if (context === undefined) {
    throw new Error("useAlgContext must be used inside AlgContextProvider");
  }
  return context;
}