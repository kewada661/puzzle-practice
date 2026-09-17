import { createContext, useState, useContext, type ReactNode, type SetStateAction } from "react";
import type { Time, TimerMode } from "../types";

interface TimeContextValue {
  times: Time[];
  setTimes: React.Dispatch<SetStateAction<Time[]>>;
}

interface TimerContextValue {
  mode: TimerMode;
  setMode: React.Dispatch<SetStateAction<TimerMode>>;
}

const TimerContext = createContext<TimerContextValue | undefined>(undefined);

export const TimerContextProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<TimerMode>("RESET");
  return (
    <TimerContext.Provider
      value={{
        mode,
        setMode
      }}
    >
      {children}
    </TimerContext.Provider>
  )
}

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTImerContext must be used inside TimerContextProvider");
  }
  return context
}