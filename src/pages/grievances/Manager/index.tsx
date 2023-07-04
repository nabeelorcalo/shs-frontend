import React, { useEffect } from "react";
import Grievance from "../Common/grievances";
import useCustomHook from "./actionHandler";

const index = () => {
  const {
    dashbaordData,
    fetchDashbaordData,
    responseTime,
    feedbackChart,
    resolutionFeedBack,
    statsGraphData,
    getGreviencesList,
    grievanceList,
  } = useCustomHook();
  useEffect(() => {
    fetchDashbaordData();
    getGreviencesList({ page: 1, limit: 10 });
  }, []);

  return (
    <>
      <Grievance
        dashbaordData={dashbaordData}
        responseTime={responseTime}
        feedbackChart={feedbackChart}
        resolutionFeedBack={resolutionFeedBack}
        statsChart={statsGraphData}
        grievanceList={grievanceList}
      />
    </>
  );
};

export default index;
