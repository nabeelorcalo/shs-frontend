import { useEffect, useState } from "react";
import { TimerPlayIcon, TimerPauseIcon } from "../../assets/images";
import { Tooltip } from "antd";

export const SimpleTimer = (props: any) => {
  const { hideCounter, iconHiehgt = "50px", iconWidth = "51px", hideIcon, editRecord, form, addedId, updateTrigger, tooltipTitle } = props;

  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId: any;
    if (isRunning) {
      intervalId = setInterval(() => setTime((prevTime) => prevTime + 1000), 1000); // Update time every second
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

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
      setTime(0);
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
