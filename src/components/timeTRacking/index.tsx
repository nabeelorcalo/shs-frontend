import { Card } from "antd";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import "./style.scss";

export const TimeTracking = (props: any) => {
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);
  const { vartical, attendenceClockin, handleAttendenceClockin, handleAttendenceClockout } = props;
  const [clockInTime, setClockInTime] = useState<any>("00:00");
  const [clockOutTime, setClockOutTime] = useState<any>("00:00");
  const [lapse, setLapse] = useLocalStorage("timer:time", 0, (v) => Number(v));
  const [running, setRunning] = useLocalStorage("timer:running", false, (string) => string === "true");
  const timerRef: any = useRef();
  // console.log("attendenceClockin", attendenceClockin);

  useEffect(() => {
    (attendenceClockin?.clocking?.clockIn || attendenceClockin?.clockIn) &&
      setClockInTime((attendenceClockin?.clocking?.clockIn || attendenceClockin?.clockIn) ?? "00:00");

    (running ? setClockOutTime("00:00") : attendenceClockin?.clocking?.clockOut || attendenceClockin?.clockOut) &&
      setClockOutTime(attendenceClockin?.clocking?.clockOut || attendenceClockin?.clockOut || "00:00");
  }, [attendenceClockin, running]);

  useEffect(() => {
    if (shouldLoogged.current) {
      // lapse && (shouldLoogged.current = false);
      setLapse(
        Number(attendenceClockin?.totalHoursToday) * 3600000 + Number(attendenceClockin?.totalMinutesToday) * 60000
      );
      // console.log("attendenceClockin?.totalHoursToday * 3600000", attendenceClockin?.totalHoursToday * 3600000);
      // console.log("attendenceClockin?.totalMinutesToday", attendenceClockin?.totalMinutesToday);
      console.log("lapse", lapse);
    }
  }, [attendenceClockin]);

  // time formater function
  const formatTime = (time: any) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - hours * 3600) / 60);
    const seconds = time - hours * 3600 - minutes * 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  // start timer / clockin
  const handleStart = () => {
    setRunning(true);
    // setClockInTime(dayjs().format("HH:mm"));
    // clockin api call
    handleAttendenceClockin(dayjs().format("HH:mm"));
  };
  // stop timer / clockout
  const handleStop = () => {
    setRunning(false);
    setClockOutTime(dayjs().format("HH:mm"));
    // clockin data from local.storage
    const attendance = JSON.parse(localStorage.getItem("clockin") ?? "");
    // clockout api call with attendance id
    if (attendance?.attendance?.id) {
      handleAttendenceClockout(dayjs().format("HH:mm"), attendance?.attendance?.id);
    }
  };

  const formattedDate = dayjs(new Date()).format("dddd, D MMMM");

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
    // console.log("startTime", startTime);

    const timer = setInterval(() => {
      if (running) {
        // console.log(
        //   "Math.round((Date.now() - startTime) / 1000) * 1000",
        //   Math.round((Date.now() - startTime) / 1000) * 1000
        // );

        setLapse(Math.round((Date.now() - startTime) / 1000) * 1000);
      }
    }, 1000);
    // console.log("timer", timer);

    timerRef.current = timer;

    return () => clearInterval(timer);
  }, [running, lapse, setLapse]);

  return (
    <>
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
              {/* {formatTime(time)} */}
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
    </>
  );
};
