import { createContext, useState, useContext, type ReactNode, type SetStateAction } from "react";
import type { Time } from "../types";

interface TimeContextValue {
  times: Time[];
  setTimes: React.Dispatch<SetStateAction<Time[]>>;
  forDeletion: Time[];
  setForDeletion: React.Dispatch<SetStateAction<Time[]>>;
}

const TimeContext = createContext<TimeContextValue | undefined>(undefined);

export const TimeContextProvider = ({ children }: { children: ReactNode }) => {
  const [times, setTimes] = useState<Time[]>([]);
  const [forDeletion, setForDeletion] = useState<Time[]>([]);
  <TimeContext.Provider
    value={{
      times,
      setTimes,
      forDeletion,
      setForDeletion
    }}
  >
    {children}
  </TimeContext.Provider>
}

export const useTimeContext = () => {
  const context = useContext(TimeContext);
  if (context === undefined) {
    throw new Error("useTImeContext must be used inside TimeContextProvider");
  }
  return context
}