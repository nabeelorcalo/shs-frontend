import React from "react";
import api from "../../api";
import constants from "../../config/constants";
import { useRecoilState } from "recoil";
import { withDrawalRequestState } from "../../store/withDrawalRequest";
import apiEndPoints from "../../config/apiEndpoints";
import { getDelegateAdminState } from "../../store/delegate";

const useCustomHook = () => {
  const [withDrawalItem, setWithDrawalItems] = useRecoilState(withDrawalRequestState);
  const [getDelegate, setGetDelegate] = useRecoilState(getDelegateAdminState);
  const { WITH_DRAWAL_REQUEST , GET_DELEGATE_ADMIN_DASHBOARD} = apiEndPoints;
  const limit = 100;

  const getWithDrawalRequestData = async (page: any) => {
    const param = { page: page, limit: limit };
    const { data } = await api.get(WITH_DRAWAL_REQUEST, param);
    setWithDrawalItems(data);
  };
  const getDelegateAdmin = async () => {
    const { data } = await api.get(GET_DELEGATE_ADMIN_DASHBOARD);
    console.log(data,"??????data????")
    setGetDelegate(data);
  };

  return {
    getDelegateAdmin,
    getWithDrawalRequestData
  };
};

export default useCustomHook;