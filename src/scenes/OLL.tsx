import { Timer, Case, Algorithms } from "../components"
import { AlgContextProvider } from "../context";
import type { TimerMode } from "../types";
import { useCallback, useEffect, useState } from "react";

export const OLL = () => {
  const [name, setName] = useState<String>("");
  const [case_id, setCase_id] = useState<number>(0);
  const [scramble, setScramble] = useState<String>("");
  const [solve, setSolve] = useState<String>("");
  const [mode, setMode] = useState<TimerMode>("RESET");
  const [displayHint, setDisplayHint] = useState<boolean>(false);
  const [displaySolve, setDisplaySolve] = useState<boolean>(false);
  const [displayAlgs, setDisplayAlgs] = useState<boolean>(false);

  var OLLCase: Case;
  var previousCases: Case[];
  const next = () => {
    console.log("NEXT:");
    if (OLLCase !== undefined) previousCases.push(OLLCase);
    OLLCase = new Case(0);
    setCase_id(OLLCase.number + 1);
    setName(OLLCase.name);
    setScramble(OLLCase.scramble);
    setSolve(OLLCase.solve);
    setMode("RESET");
  }

  const handleHint = () => {
    setDisplayHint(true);
    // fetch('/api/',)
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
      <span>case_id: {case_id}</span>
      <span>scramble: {scramble}</span>
      {(displayHint) ? (
        <>
          <span>Solution: {solve}</span>
          {(displayAlgs) ? (
            <AlgContextProvider>
              <Algorithms case_id={23} />
            </AlgContextProvider>
          ) : (
            <button
              onClick={() => setDisplayAlgs(true)}
            >
              Edit Solutions
            </button>
          )}
        </>
      ) : (
        <button onClick={handleHint}>
          Solution
        </button>
      )}
      <button onClick={next}>
        Next Case
      </button>
      <Timer
        mode={mode}
        setMode={timerModeCallback}
        case_id={case_id}
      />
    </>
  )
}