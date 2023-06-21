import React, { useEffect } from "react";
import GrievancesDetails from "../../Common/grievancesDetails";
import useCustomHook from "../../Manager/actionHandler";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "../../../../components";

const index = () => {
  const { grievanceId } = useLocation()?.state;
  const navigation = useNavigate();
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

  if (!grievanceId) {
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
