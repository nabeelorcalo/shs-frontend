import React, { useEffect } from "react";
import Grievance from "../Common/grievances";
import useCustomHook from "./actionHandler";

const index = () => {
  const { dashbaordData, fetchDashbaordData, responseTime, feedbackChart, resolutionFeedBack, statsGraphData } =
    useCustomHook();
  useEffect(() => {
    fetchDashbaordData();
  }, []);

  return (
    <>
      <Grievance
        dashbaordData={dashbaordData}
        responseTime={responseTime}
        feedbackChart={feedbackChart}
        resolutionFeedBack={resolutionFeedBack}
        statsChart={statsGraphData}
      />
    </>
  );
};

export default index;
