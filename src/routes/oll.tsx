import type { Route } from "@router-types/oll";
import { Timer, Case, Algorithms } from "../components";
import { AlgContextProvider } from "../context";
import { useAuth, useGrades, useTimes } from "../hooks";
import type { Grade, TimerMode } from "../types";
import { useCallback, useEffect, useState } from "react";
import { redirect, createContext } from "react-router";
import { useTimerContext } from "../context";

export const hydrateFallback = () => {
  return <div>LOADING...</div>
}

export const OLL = () => {
  const [OLLCase, setOLLCase] = useState<Case>(Case.OLL());
  const [previousCases, setPreviousCases] = useState<Case[]>([]);
  const { setMode } = useTimerContext();
  const [displayHint, setDisplayHint] = useState<boolean>(false);
  const [displayAlgs, setDisplayAlgs] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false)
  const { postTimes } = useTimes();
  const { updateGrades, getGrades } = useGrades();
  const { refreshSession } = useAuth();
  const [prevGrade, setPrevGrade] = useState<number>(1);

  var grade = prevGrade;
  const handleNext = async () => {
    setMode("RESET");
    if (OLLCase !== undefined) {
      setPreviousCases(prev => [...prev, OLLCase]);
    }
    setOLLCase(Case.OLL());
    try {
      const g = await getGrades(OLLCase!.case_id);
      if (!Number.isNaN(g.grade) && g.grade !== undefined) {
        grade = g.grade;
      }
    } catch (e) {
      if (!(e instanceof Error)) {
        console.error("Unknown error in getGrades");
      }
      if (e instanceof Error && e.name === "TokenExpiredError") {
        refreshSession()
          .then(() => handleNext())
          .catch(() => redirect("/"))
      }
    }
  }

  const onFinish = async (ms_elapsed: number) => {
    if (OLLCase === undefined) return;
    setLoading(true);
    try {
      await postTimes({
        case_id: OLLCase.case_id,
        ms_elapsed: ms_elapsed
      });
      grade = displayHint ? grade - 1 : grade + 1;

      console.log(grade);
      await updateGrades({ grade: grade, case_id: OLLCase.case_id });
      setPrevGrade(grade);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {

  }, [])

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
          <button onClick={() => setDisplayHint(true)}>
            Solution
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={loading}
        >
          Next Case
        </button>
        <Timer
          finishCallback={onFinish}
          case_id={OLLCase.case_id}
        />
        <div className="flex flex-row gap-2">
          {previousCases.map((item, i) => {
            return (
              <div key={i}>{item.case_id}</div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default OLL