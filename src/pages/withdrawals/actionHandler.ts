import React from "react";
import api from "../../api";
import constants from "../../config/constants";
import { withDrawalRequestState } from "../../store/withDrawalRequest";
import { useRecoilState } from "recoil";
import apiEndPoints from "../../config/apiEndpoints";

const useCustomHook = () => {
  const [withDrawalItem, setWithDrawalItems] = useRecoilState(withDrawalRequestState);
  const { WITH_DRAWAL_REQUEST, } = apiEndPoints;
  const limit = 100;
  const getWithDrawalRequestData = async (page: any) => {
    const param = { page: page, limit: limit };
    const { data } = await api.get(WITH_DRAWAL_REQUEST, param);
    setWithDrawalItems(data);
  };

  return {
    getWithDrawalRequestData,
  };
};

export default useCustomHook;