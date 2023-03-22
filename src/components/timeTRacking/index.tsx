import { Card } from "antd";
import React, { useRef, useState } from "react";
import "./style.scss";
import dayjs from "dayjs";

export const TimeTracking = (props: any) => {
  const { vartical } = props;

  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<any>(false);
  const intervalRef = useRef<any>(null);
  const startTimeRef = useRef<any>(null);
  const [clockInTime, setClockInTime] = useState<any>("00:00");
  const [clockOutTime, setClockOutTime] = useState<any>("00:00");

  const formatTime = (time: any) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - hours * 3600) / 60);
    const seconds = time - hours * 3600 - minutes * 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    setClockInTime(dayjs().format("HH:mm"));
    setIsRunning(true);
    startTimeRef.current = Date.now() - time * 1000;
    intervalRef.current = setInterval(() => {
      setTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
  };

  const handleStop = () => {
    setClockOutTime(dayjs().format("HH:mm"));
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleReset = () => {
    setTime(0);
  };

  const formattedDate = dayjs(new Date()).format("dddd, D MMMM");

  return (
    <Card
      className={
        vartical ? "time-tracking my-2" : "timeTrackig-horizontal my-2"
      }
      bordered={false}
    >
      <div className="time-tracking-body">
        <div className={vartical ? "time-title" : "text-center sm:text-start"}>
          <p className="font-medium text-lg text-secondary-color mb-4">
            Time Tracking
          </p>
        </div>

        <div
          className={
            vartical ? "clock-time-main" : "clock-time-main-horizontal"
          }
        >
          <div
            className={
              vartical
                ? "clock-time flex justify-center items-center"
                : "mr-4 xl:mr-14"
            }
          >
            {!isRunning ? (
              <div
                onClick={handleStart}
                className="time-clock-in flex justify-center items-center cursor-pointer bg-[#66AC8B]"
              >
                <p className="font-medium text-base white-color"> Clock in</p>
              </div>
            ) : (
              <div
                onClick={handleStop}
                className="time-clock-out flex justify-center items-center cursor-pointer bg-[#E94E5D]"
              >
                <p className="font-medium text-base white-color">Clock out</p>
              </div>
            )}
          </div>

          <div
            className={
              vartical
                ? "time font-medium text-4xl text-center mt-4"
                : "time font-medium text-4xl text-center text-secondary-color mt-4 md:mt-0"
            }
          >
            {formatTime(time)}
          </div>
        </div>

        <div
          className={
            vartical
              ? "date text-sm font-medium text-center mt-4"
              : "date text-sm font-medium text-end mt-2 sm:mt-0"
          }
        >
          {formattedDate}
        </div>

        {vartical ? (
          <div className="mt-4 p-4 bg-[#E6F4F9] rounded-[10px]">
            <div className="flex justify-between">
              <div className="font-medium text-sm text-success-color">
                Clock In
              </div>
              <div className="font-medium text-sm text-secondary-color">
                {clockInTime}
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <div className="font-medium text-sm  text-secondary-color">
                Clock Out
              </div>
              <div className="font-medium text-sm text-secondary-color">
                {clockOutTime}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center sm:justify-end mt-4">
            <div className="font-medium text-sm mr-4 text-secondary-color">
              {clockInTime}
            </div>
            <div className="font-medium text-sm text-secondary-color">
              {clockOutTime}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}; 
