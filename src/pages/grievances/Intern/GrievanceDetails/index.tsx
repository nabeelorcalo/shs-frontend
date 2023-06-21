import React, { useEffect } from "react";
import GrievancesDetails from "../../Common/grievancesDetails";
import useCustomHook from "../../Manager/actionHandler";
import { useLocation } from "react-router-dom";
import { Loader } from "../../../../components";

const index = () => {
  const { grievanceId } = useLocation()?.state;
  const { fetchGrievanceDetail, grievanceDetail, managersList, getManagerList, addReply, updateGrievance, loading } =
    useCustomHook();

  useEffect(() => {
    if (grievanceId) fetchGrievanceDetail(grievanceId);
    if (!managersList.length) getManagerList({});
  }, [grievanceId]);
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
      />
    </>
  );
};

export default index;
