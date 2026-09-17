import { useEffect, useState } from "react";
import type { TimerMode, Time } from "../types";
import { useTimerContext } from "../context";

interface TimerProps {
  finishCallback: (ms_elapsed: number) => void;
  case_id: number
}
export const Timer = ({ finishCallback, case_id }: TimerProps) => {
  const [minutes, setMinutes] = useState<String>("0");
  const [seconds, setSeconds] = useState<String>("00");
  const [milliseconds, setMilliseconds] = useState<String>("000");
  const [ms_elapsed, setMs_elapsed] = useState<number>(0);
  const [intervalID, setIntervalID] = useState<number>(-1);
  const [running, setRunning] = useState<boolean>(false);
  const { mode } = useTimerContext();

  var startTime: number;
  var time: Time = {};
  useEffect(() => {
    time.case_id = case_id;
  }, [case_id])

  const update = () => {
    const delta = new Date(Date.now() - startTime);
    setMinutes(String(delta.getMinutes()));
    setSeconds(String(delta.getSeconds()).padStart(2, '0'));
    setMilliseconds(String(delta.getMilliseconds()).padStart(3, '0'));
    setMs_elapsed(delta.valueOf())
  }

  const timerStart = () => {
    if (running) return;
    setRunning(true);
    startTime = Date.now();
    setIntervalID(setInterval(update));
  }

  const timerStop = async () => {
    if (!running) return;
    setRunning(false);
    clearInterval(intervalID);
    finishCallback(ms_elapsed);
  }

  const timerDelete = () => {
    console.log("DELETE TIMER");
    setRunning(false);
    clearInterval(intervalID);
    setMinutes("0");
    setSeconds("00");
    setMilliseconds("000");
  }

  useEffect(() => {
    switch (mode) {
      case "RESET":
        timerDelete();
        break;
      case "START":
        timerStart();
        break;
      case "STOP":
        timerStop();
        break;
    }
  }, [mode]);
  return (
    <div className="flex flex-col mt-60">
      <span>{minutes}:{seconds}.{milliseconds}</span>
      <div className="flex flex-row gap-4 items-center justify-center">
        <button onClick={timerStart}>
          START
        </button>
        <button onClick={timerStop}>
          STOP
        </button>
        <button onClick={timerDelete}>
          DELETE
        </button>
      </div>
    </div>
  )
}