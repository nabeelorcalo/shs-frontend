import { Card } from "antd";
import React, { useRef, useState } from "react";
import "./TimeTracking.scss";
import dayjs from "dayjs";

const TimeTracking = (props: any) => {
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
      className={vartical ? "time-tracking" : "timeTrackig-horizontal"}
      bordered={false}
    >
      <div className="time-tracking-body">
        <div className="time-title">
          <p className="font-medium text-lg" style={{ color: "#4E4B66" }}>
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
              vartical ? "clock-time flex justify-center items-center" : "mr-8"
            }
          >
            {!isRunning ? (
              <div
                onClick={handleStart}
                className="time-clock-in flex justify-center items-center cursor-pointer"
                style={{
                  background: "#66AC8B",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                }}
              >
                <p className="font-medium text-base text-white"> Clock in</p>
              </div>
            ) : (
              <div
                onClick={handleStop}
                className="time-clock-out flex justify-center items-center cursor-pointer"
                style={{
                  background: "#E94E5D",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                }}
              >
                <p className="font-medium text-base text-white">Clock out</p>
              </div>
            )}
          </div>
          <div
            className={
              vartical
                ? "time font-medium text-4xl text-center mt-4"
                : "time font-medium text-4xl text-center"
            }
            style={{ color: "#4E4B66" }}
          >
            {formatTime(time)}
          </div>
        </div>

        <div
          className={
            vartical
              ? "date text-sm font-medium text-center mt-4"
              : "date text-sm font-medium text-end mt-4"
          }
        >
          {formattedDate}
        </div>

        {vartical ? (
          <div
            className="mt-4 p-4"
            style={{ background: "#E6F4F9", borderRadius: "10px" }}
          >
            <div className="flex justify-between">
              <div className="font-medium text-sm" style={{ color: "#A0A3BD" }}>
                Clock In
              </div>
              <div className="font-medium text-sm" style={{ color: "#4E4B66" }}>
                {clockInTime}
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <div
                className="font-medium text-sm text-white"
                style={{ color: "#A0A3BD" }}
              >
                Clock Out
              </div>
              <div className="font-medium text-sm" style={{ color: "#4E4B66" }}>
                {clockOutTime}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-end mt-4">
            <div
              className="font-medium text-sm mr-4"
              style={{ color: "#4E4B66" }}
            >
              {clockInTime}
            </div>
            <div className="font-medium text-sm " style={{ color: "#4E4B66" }}>
              {clockOutTime}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TimeTracking;
