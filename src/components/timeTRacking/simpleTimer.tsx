import { useEffect, useRef, useState } from "react";
import { TimerPlayIcon, TimerPauseIcon } from "../../assets/images";
import { Tooltip } from "antd";
import { useTimeLocalStorage } from "./storageHook";

export const SimpleTimer = (props: any) => {
  const {
    hideCounter,
    iconHiehgt = "50px",
    iconWidth = "51px",
    hideIcon,
    editRecord,
    form,
    addedId,
    updateTrigger,
    tooltipTitle,
    isRunning,
    setIsRunning,
    lapse,
    setLapse,
  } = props;

  // const [time, setTime] = useState(0);
  const startTimeRef = useRef<any>(null);

  useEffect(() => {
    const startTime = Date.now() - lapse;
    const timer = setInterval(() => {
      if (isRunning) {
        setLapse(Math.round((Date.now() - startTime) / 1000) * 1000);
      }
    }, 1000);

    startTimeRef.current = timer;

    return () => clearInterval(timer);
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
        setLapse(0);
        setIsRunning(true);
      });
    } else if (form && isRunning && addedId) {
      updateTrigger();
      clearInterval(startTimeRef.current);
      setLapse(0);
      setIsRunning(false);
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
