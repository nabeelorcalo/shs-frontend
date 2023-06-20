import React, { useEffect } from "react";
import Grievances from "../Common/grievances";
import useCustomHook from "../Manager/actionHandler";

const index = () => {
  const {
    dashbaordData,
    fetchDashbaordData,
    responseTime,
    feedbackChart,
    resolutionFeedBack,
    getGreviencesList,
    grievanceList,
  } = useCustomHook();
  useEffect(() => {
    fetchDashbaordData();
    getGreviencesList({ page: 1, limit: 10 });
  }, []);
  return (
    <>
      <Grievances
        dashbaordData={dashbaordData}
        responseTime={responseTime}
        feedbackChart={feedbackChart}
        resolutionFeedBack={resolutionFeedBack}
        grievanceList={grievanceList}
      />
    </>
  );
};

export default index;
