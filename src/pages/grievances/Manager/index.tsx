import React, { useEffect } from "react";
import Grievance from "../Common/grievances";
import useCustomHook from "./actionHandler";

const index = () => {
  const { dashbaordData, fetchDashbaordData, responseTime, feedbackChart, resolutionFeedBack } = useCustomHook();
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
      />
    </>
  );
};

export default index;
