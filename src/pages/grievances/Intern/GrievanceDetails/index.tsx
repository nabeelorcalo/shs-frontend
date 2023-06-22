import React, { useEffect } from "react";
import GrievancesDetails from "../../Common/grievancesDetails";
import useCustomHook from "../../Manager/actionHandler";
import { useLocation } from "react-router-dom";
import { Loader } from "../../../../components";

const index = () => {
  const { grievanceId } = useLocation()?.state;
  const {
    fetchGrievanceDetail,
    grievanceDetail,
    managersList,
    getManagerList,
    addReply,
    updateGrievance,
    loading,
    replyList,
    getGrievanceReplyList,
    getFeedbackList,
    addFeedBack,
    feedbackList,
  } = useCustomHook();

  useEffect(() => {
    fetchGreivanceDetailData();
  }, [grievanceId]);

  const fetchGreivanceDetailData = () => {
    if (grievanceId) {
      fetchGrievanceDetail(grievanceId);
      getFeedbackList({ grievanceId });
      getGrievanceReplyList({ grievanceId });
    }
    if (!managersList.length) getManagerList({});
  };
  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      <GrievancesDetails
        grievanceDetail={grievanceDetail}
        managers={managersList}
        addReply={addReply}
        fetchGrievanceDetail={fetchGrievanceDetail}
        grievanceId={grievanceId}
        updateGrievance={updateGrievance}
        addFeedBack={addFeedBack}
        replyList={replyList}
        feedbackList={feedbackList}
        fetchGreivanceDetailData={fetchGreivanceDetailData}
      />
    </>
  );
};

export default index;
