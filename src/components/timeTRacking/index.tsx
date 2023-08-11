import { Card } from "antd";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import "./style.scss";

export const TimeTracking = (props: any) => {
  const { vartical = false, attendenceClockin, handleAttendenceClockin, handleAttendenceClockout } = props;
  const [clockInTime, setClockInTime] = useState<any>("00:00:00");
  const [clockOutTime, setClockOutTime] = useState<any>("00:00:00");
  const [lapse, setLapse] = useLocalStorage("timer:time", 0, (v) => Number(v));
  const [running, setRunning] = useLocalStorage("timer:running", false, (string) => string === "true");
  const timerRef: any = useRef();
  useEffect(() => {
    (attendenceClockin?.clocking?.clockIn || attendenceClockin?.clockIn) &&
      setClockInTime((attendenceClockin?.clockIn || attendenceClockin?.clocking?.clockIn) ?? "00:00:00");
  }, [attendenceClockin, running]);

  const lapseCount = (h: string | number, m: string | number, s: string | number) => {
    return Number(h) * 3600000 + Number(m) * 60000 + Number(s) * 1000;
  };

  useEffect(() => {
    if (!running) {
      setLapse(
        lapseCount(
          attendenceClockin?.totalHoursToday,
          attendenceClockin?.totalMinutesToday,
          attendenceClockin?.totalSecondsToday
        )
      );
      (attendenceClockin?.clockOut || attendenceClockin?.clocking?.clockOut) &&
        setClockOutTime(attendenceClockin?.clocking?.clockOut || attendenceClockin?.clockOut || "00:00:00");
      return;
    }
    // if time tracking component is not rendering then it can't update timer,
    // and time tracking will stop on timer, to fix this issue blow code is written,
    // in this code we get last clockin time and current time then convert all to mili seconds
    // get the mili sec difference and set lapse in mili sec
    if (attendenceClockin?.clockIn) {
      const [clockInHours, clockInMinutes, clockInSeconds] = attendenceClockin?.clockIn?.split(":");
      const [currentHours, currentMinutes, currentSeconds] = dayjs(new Date()).format("HH:mm:ss").split(":");
      const totalClockInLapse = lapseCount(clockInHours, clockInMinutes, clockInSeconds);
      const totalCurrentLapse = lapseCount(currentHours, currentMinutes, currentSeconds);
      return setLapse(totalCurrentLapse - totalClockInLapse);
    }
  }, [attendenceClockin]);

  // time formater function
  const formatTime = (time: any) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - hours * 3600) / 60);
    const seconds = time - hours * 3600 - minutes * 60;
    return `${hours ? hours.toString().padStart(2, "0") : "00"}:${minutes ? minutes.toString().padStart(2, "0") : "00"
      }:${seconds ? seconds.toString().padStart(2, "0") : "00"}`;
  };
  // start timer / clockin
  const handleStart = () => {
    setRunning(true);
    setClockOutTime(`00:00:00`);
    // clockin api call
    handleAttendenceClockin(dayjs().format("HH:mm:ss"));
  };
  // stop timer / clockout
  const handleStop = () => {
    setRunning(false);
    setClockOutTime(dayjs().format("HH:mm:ss"));
    // clockout api call with attendance id
    if (attendenceClockin?.attendanceId || attendenceClockin?.attendance?.id) {
      handleAttendenceClockout(
        dayjs().format("HH:mm:ss"),
        attendenceClockin?.attendanceId || attendenceClockin?.attendance?.id
      );
    }
  };

  const formattedDate = dayjs(new Date()).format("dddd, DD MMMM");

  // presist timer
  function useLocalStorage(key: any, initialValue: any, parseValue = (v: any) => v) {
    const [item, setValue] = useState(() => {
      const value = parseValue(localStorage.getItem(key)) || initialValue;
      localStorage.setItem(key, value);
      return value;
    });
    const setItem = (newValue: any) => {
      setValue(newValue);
      window.localStorage.setItem(key, newValue);
    };
    return [item, setItem];
  }

  // update timer count
  useEffect(() => {
    const startTime = Date.now() - lapse;
    const timer = setInterval(() => {
      if (running) {
        setLapse(Math.round((Date.now() - startTime) / 1000) * 1000);
      }
    }, 1000);
    timerRef.current = timer;
    return () => clearInterval(timer);
  }, [running, lapse, setLapse]);

  return (
    <Card
      className={vartical ? "time-tracking w-full" : "timeTrackig-horizontal min-h-[240px] wrapper-shadow"}
      bordered={false}
    >
      <div className="time-tracking-body">
        <div className={vartical ? "time-title" : "text-start"}>
          <p className="font-medium text-lg text-[#4E4B66] mb-4">Time Tracking</p>
        </div>

        <div className={vartical ? "clock-time-main" : "clock-time-main-horizontal"}>
          <div className={vartical ? "clock-time flex justify-center items-center" : "mr-4 xl:mr-14"}>
            {!running ? (
              <div
                onClick={handleStart}
                className="time-clock-in flex justify-center items-center cursor-pointer bg-[#66AC8B]"
              >
                <p className="font-medium text-base text-white"> Clock in</p>
              </div>
            ) : (
              <div
                onClick={handleStop}
                className="time-clock-out flex justify-center items-center cursor-pointer bg-[#E94E5D]"
                style={{
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
                : "time font-medium text-4xl xs:text-[22px] sm:text-4xl text-center text-[#4E4B66] mt-4 md:mt-4"
            }
          >
            {formatTime(lapse / 1000)}
          </div>
        </div>

        <div
          className={
            vartical ? "date text-sm font-medium text-center mt-4" : "date text-sm font-medium text-end mt-2 sm:mt-0"
          }
        >
          {formattedDate}
        </div>

        {vartical ? (
          <div className="mt-4 p-4 bg-[#E6F4F9]" style={{ borderRadius: "10px" }}>
            <div className="flex justify-between">
              <div className="font-medium text-sm light-grey-color">Clock In</div>
              <div className="font-medium text-sm text-secondary-color">{clockInTime}</div>
            </div>

            <div className="flex justify-between mt-4">
              <div className="font-medium text-sm  light-grey-color">Clock Out</div>
              <div className="font-medium text-sm text-[#4E4B66]">{clockOutTime}</div>
            </div>
          </div>
        ) : (
          <div className="flex justify-end">
            <div className="font-medium text-sm mr-4 text-[#4E4B66]">{clockInTime}</div>
            <div className="font-medium text-sm text-[#4E4B66]">{clockOutTime}</div>
          </div>
        )}
      </div>
    </Card>
  );
};
