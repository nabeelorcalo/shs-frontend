import { Card } from "antd";
import React, { useState } from "react";

const DashboardTimeTracking = () => {
  const [timeStart, setTimeStart] = useState<boolean>(false);

  const timeTrackingHandler = () => {
    setTimeStart(!timeStart);
  };
  return (
    <Card
      className="Dashbord-time-tracking"
      bordered={false}
      style={{ width: 462 }}
    >
      <div className="time-tracking-body">
        <div className="time-title">
          <p className="font-medium text-lg" style={{ color: "#4E4B66" }}>
            Time Tracking
          </p>
        </div>

        <div className="flex  items-center">
          <div
            onClick={timeTrackingHandler}
            className="clock-time flex justify-center items-center mr-8"
          >
            {!timeStart && (
              <div
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
            )}

            {timeStart && (
              <div
                className="time-clock-out time-clock-in flex justify-center items-center cursor-pointer"
                style={{
                  background: "#E94E5D",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                }}
              >
                <p className="font-medium text-base text-white">Clock Out</p>
              </div>
            )}
          </div>
          <div
            className="time font-medium text-4xl text-center"
            style={{ color: "#4E4B66" }}
          >
            09:00:26
          </div>
        </div>

        <div className="date text-sm font-medium text-end mt-4">
          Wednesday, 21 September
        </div>
        <div
          className="text-sm font-medium text-end mt-4"
          style={{ color: "#4E4B66" }}
        >
          00:00 - 00:00
        </div>

        {/* <div
          className="mt-4 p-4"
          style={{ background: "#E6F4F9", borderRadius: "10px" }}
        >
          <div className="flex justify-between">
            <div className="font-medium text-sm" style={{ color: "#A0A3BD" }}>
              Clock In
            </div>
            <div className="font-medium text-sm" style={{ color: "#4E4B66" }}>
              09:00
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <div
              className="font-medium text-sm text-white"
              style={{ color: "#A0A3BD" }}
            >
              Clock Out
            </div>
            <div className="font-medium text-sm " style={{ color: "#4E4B66" }}>
              09:00
            </div>
          </div>
        </div> */}
      </div>
    </Card>
  );
};

export default DashboardTimeTracking;
