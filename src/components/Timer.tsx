import { useEffect, useState } from "react"
import type { TimerMode } from "../types";

interface TimerProps {
  mode: TimerMode;
  setMode: (mode: TimerMode) => void;
}
export const Timer = ({mode, setMode}: TimerProps) => {
  const [time, setTime] = useState<Date>(new Date(0));
  const [display, setDisplay] = useState<String>("0");
  const [minutes, setMinutes] = useState<String>("0");
  const [seconds, setSeconds] = useState<String>("00");
  const [milliseconds, setMilliseconds] = useState<String>("000");
  const [intervalID, setIntervalID] = useState<number>(-1);
  const [running, setRunning] = useState<boolean>(false);

  let startTime: number;
  
  const update = () => {
    const delta = new Date(Date.now() - startTime);
    setMinutes(String(delta.getMinutes()));
    setSeconds(String(delta.getSeconds()).padStart(2, '0'));
    setMilliseconds(String(delta.getMilliseconds()).padStart(3, '0'));
    setTime(delta);
  }
  
  const timerStart = () => {
    if (running) return;
    setRunning(true);
    setMode("START");
    console.log("START");
    startTime = Date.now();
    setIntervalID(setInterval(update));
    console.log("  Starting interval ID:", intervalID);
  }

  const timerStop = () => {
    if (!running) return;
    setRunning(false);
    console.log("STOP");
    console.log("  Stopping interval ID:", intervalID);
    clearInterval(intervalID);
    console.log(startTime);
    setDisplay(String(time.valueOf()));
  }

  const timerDelete = () => {
    console.log("DELETE");
    setRunning(false);
    clearInterval(intervalID);
    setMinutes("0");
    setSeconds("00");
    setMilliseconds("000");
  }
  
  useEffect(() => {
    switch (mode) {
      case "RESET":
        return timerDelete();
      case "START":
        return timerStart();
      case "STOP":
        return timerStop();
    }
  }, [mode])
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
      <span>time in ms: {display}</span>
    </div>
  )
}