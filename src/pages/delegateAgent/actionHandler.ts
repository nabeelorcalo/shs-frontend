import React from "react";
import api from "../../api";
import constants from "../../config/constants";
import { useRecoilState } from "recoil";
import { withDrawalRequestState } from "../../store/withDrawalRequest";
import apiEndPoints from "../../config/apiEndpoints";
import {
  addDelegateRewardState,
  getDelegateAdminState,
  getDelegateAgentsState,
  getRewardState,
} from "../../store/delegate";
import { Notifications } from "../../components";

const useCustomHook = () => {
  const [withDrawalItem, setWithDrawalItems] = useRecoilState(
    withDrawalRequestState
  );
  const [getDelegate, setGetDelegate] = useRecoilState(getDelegateAdminState);
  const [getDelegateAgents, setGetDelegateAgents] = useRecoilState(getDelegateAgentsState);
  const [currentReward, setCurrentReward] = useRecoilState(addDelegateRewardState);
  const [rewardData, setRewardData] = useRecoilState(getRewardState);

  const {
    WITH_DRAWAL_REQUEST,
    GET_DELEGATE_ADMIN_DASHBOARD,
    GET_DELEGATE_AGENTS_DASHBOARD,
    ADD_DELEGATE_REWARDS,
    GET_ALL_REWARD_DATA,
    FORGOTPASSWORD,
    DELEGATE_ACCESS
  } = apiEndPoints;

  const limit = 100;

  const getWithDrawalRequestData = async (param: any) => {
    const { data } = await api.get(WITH_DRAWAL_REQUEST, param);
    setWithDrawalItems(data);
  };
  const getDelegateAdmin = async () => {
    const { data } = await api.get(GET_DELEGATE_ADMIN_DASHBOARD);
    setGetDelegate(data);
  };

  const getAgentDelegate = async (param:any) => {
    const { data } = await api.get(GET_DELEGATE_AGENTS_DASHBOARD, param);
    setGetDelegateAgents(data);
  };

  const addRewards = async (body: any): Promise<any> => {
    const { data } = await api.post(ADD_DELEGATE_REWARDS, body);
    if (!data.error) {
      setCurrentReward(data.user);
      Notifications({
        title: "Success",
        description: "Data Added",
        type: "success",
      });
    }
    return data;
  };

  const getAllRewards = async (page: any = 1) => {
    const param = { page: page, limit: limit };
    const { data } = await api.get(GET_ALL_REWARD_DATA, param);
    setRewardData(data);
  };

  const forgotpassword = async (body: any): Promise<any> => {
    const { data } = await api.post(FORGOTPASSWORD, body);
    return data;
  };

  const delegateAccess = async (id:any,values:any,onSuccess?:()=>void) => {
    const response = await api.patch(`${DELEGATE_ACCESS}/${parseInt(id)}`, values)
    if (onSuccess) onSuccess();
      return response;
  };

  return {
    getDelegateAdmin,
    getWithDrawalRequestData,
    getAgentDelegate,
    addRewards,
    getAllRewards,
    forgotpassword,
    delegateAccess
  };
};

export default useCustomHook;
