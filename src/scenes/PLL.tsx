import { Timer } from "../components"
import type { TimerMode } from "../types";
import { Case } from "../components/Case"
import { useCallback, useEffect, useState } from "react";

export const PLL = () => {
  const [name, setName] = useState<String>("");
  const [scramble, setScramble] = useState<String>("");
  const [solve, setSolve] = useState<String>("");
  const [mode, setMode] = useState<TimerMode>("RESET");
  var OLLCase: Case;
  var previousCases: Case[];
  const next = () => {
    console.log("NEXT:");
    if (OLLCase !== undefined) previousCases.push(OLLCase);
    OLLCase = new Case(1);
    setName(OLLCase.name);
    setScramble(OLLCase.scramble);
    setSolve(OLLCase.solve);
    setMode("RESET");
  }

  const timerModeCallback = useCallback((newMode: TimerMode) => {
    setMode(newMode);
  }, [setMode]);

  useEffect(() => {
    next();
    previousCases = [];      
  }, [])
  return (
    <>
      <span>name: {name}</span>
      <span>scramble: {scramble}</span>
      <span>solve: {solve}</span>
      <button onClick={next}>
        Next Case
      </button>
      <Timer
        mode={mode}
        setMode={timerModeCallback}
        case_id={57}
      />
    </>
  )
}