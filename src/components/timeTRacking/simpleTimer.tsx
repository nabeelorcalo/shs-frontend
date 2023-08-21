import { useEffect, useRef, useState } from "react";
import { TimerPlayIcon, TimerPauseIcon } from "../../assets/images";
import { Tooltip } from "antd";
import { useTimeLocalStorage } from "./storageHook";

export const SimpleTimer = (props: any) => {
  const { hideCounter, iconHiehgt = "50px", iconWidth = "51px", hideIcon, editRecord, form, addedId, updateTrigger, tooltipTitle } = props;

  const [lapse, setLapse] = useTimeLocalStorage("timer:sampleTime", 0, (v) => Number(v));
  const [isRunning, setIsRunning] = useTimeLocalStorage("timer:sampleRunning", false, (string) => string === "true");
  // const [time, setTime] = useState(0);
  const startTimeRef = useRef<any>(null);

  useEffect(() => {
    let intervalId: any;
    if (isRunning) {
      if (startTimeRef.current === null) {
        startTimeRef.current = Date.now() - lapse;
      }

      intervalId = setInterval(() => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTimeRef.current;
        setLapse(elapsed);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, lapse, setLapse]);

  const hours = Math.floor(lapse / 3600000);
  const minutes = Math.floor((lapse % 3600000) / 60000);
  const seconds = Math.floor((lapse % 60000) / 1000);

  useEffect(() => {}, [editRecord]);

  const handleStart = () => {
    // setIsRunning(!isRunning);
    if (form && !isRunning) {
      form.validateFields().then(() => {
        form.submit();
        setIsRunning(!isRunning);
      });
    } else if (form && isRunning && addedId) {
      updateTrigger();
      setLapse(0);
      setIsRunning(!isRunning);
    } else setIsRunning(!isRunning);
  };

  return (
    <div className="simple-tracker-wrapper flex items-center gap-3">
      {!hideCounter && (
        <p className="timer text-3xl font-medium text-[#4E4B66] flex items-center">
          {hours.toString().padStart(2, "0")}
          &nbsp;<span className="mt-[-7px]">:</span>&nbsp;
          {minutes.toString().padStart(2, "0")}
          &nbsp;<span className="mt-[-7px]">:</span>&nbsp;
          {seconds.toString().padStart(2, "0")}
        </p>
      )}
      {!hideIcon && (
        <Tooltip placement="top" title={tooltipTitle}>
          {typeof editRecord !== "boolean" ? (
            <span
              onClick={handleStart}
              style={{ height: iconHiehgt, width: iconWidth }}
              className={`cursor-pointer rounded-full bg-[#E9F8E7] flex items-center justify-center`}
            >
              {!isRunning ? <TimerPlayIcon className="h-[40px] w-[40px]" /> : <TimerPauseIcon className="h-[40px] w-[40px]" />}
            </span>
          ) : (
            <span
              // onClick={handleStart}
              style={{ height: iconHiehgt, width: iconWidth }}
              className={`cursor-pointer rounded-full bg-[#E9F8E7] flex items-center justify-center`}
            >
              {!editRecord ? <TimerPlayIcon className="h-[40px] w-[40px]" /> : <TimerPauseIcon className="h-[40px] w-[40px]" />}
            </span>
          )}
        </Tooltip>
      )}
    </div>
  );
};
