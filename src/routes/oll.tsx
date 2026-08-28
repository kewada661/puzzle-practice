import type { Route } from "@router-types/oll";
import { Timer, Case, Algorithms } from "../components";
import { AlgContextProvider } from "../context";
import { useGrades } from "../hooks";
import type { Grade, TimerMode } from "../types";
import { useCallback, useEffect, useState } from "react";
import { redirect } from "react-router";

export const OLL = ({ loaderData }: Route.ComponentProps) => {
  const [OLLCase, setOLLCase] = useState<Case>(Case.OLL());
  const [previousCases, setPreviousCases] = useState<Case[]>([]);
  const [mode, setMode] = useState<TimerMode>("RESET");
  const [displayHint, setDisplayHint] = useState<boolean>(false);
  const [displayAlgs, setDisplayAlgs] = useState<boolean>(false);
  const [grade, setGrade] = useState<Grade | null>(null);

  const next = () => {
    console.log("NEXT:");
    setPreviousCases(prev => [...prev, OLLCase]);
    setOLLCase(Case.OLL());
    setMode("RESET");
  }

  const handleNext = () => {
    //do grades
    //generate next case
    //
  }
  const handleHint = () => {
    setDisplayHint(true);
  }

  const timerModeCallback = useCallback((newMode: TimerMode) => {
    setMode(newMode);
  }, [setMode]);

  return (
    <>
      <div className="flex flex-col gap-2 mb-8 justify-center items-center">
        <span>name: {OLLCase.name}</span>
        <span>case_id: {OLLCase.case_id}</span>
        <span>scramble: {OLLCase.scramble}</span>
        {(displayHint) ? (
          <>
            <span>Solution: {OLLCase.solve}</span>
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
          case_id={OLLCase.case_id}
        />
        <div className="flex flex-row gap-2">
          {previousCases.map((item) => {
            return (
              <div>{item.case_id}</div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export const clientLoader = async () => {
  const {
    // loading: gradesLoading,
    getUserGrades,
    updateGrades,
  } = useGrades();
  try {
    const grades = await getUserGrades();
    return {
      updateGrades,
      grades
    }
  } catch (e) {
    console.error(e);
    if (e instanceof Error && (e.name === "TokenExpiredError" || e.name === "TypeError")) {
      throw redirect('/');
    }
  }

}

export default OLL