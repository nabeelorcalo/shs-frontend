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
  const [getDelegateAgents, setGetDelegateAgents] = useRecoilState(
    getDelegateAgentsState
  );
  const [currentReward, setCurrentReward] = useRecoilState(addDelegateRewardState);
  const [rewardData, setRewardData] = useRecoilState(getRewardState)

  const {
    WITH_DRAWAL_REQUEST,
    GET_DELEGATE_ADMIN_DASHBOARD,
    GET_DELEGATE_AGENTS_DASHBOARD,
    ADD_DELEGATE_REWARDS,
    GET_ALL_REWARD_DATA
  } = apiEndPoints;

  const limit = 100;

  const getWithDrawalRequestData = async (page: any) => {
    const param = { page: page, limit: limit };
    const { data } = await api.get(WITH_DRAWAL_REQUEST, param);
    setWithDrawalItems(data);
  };
  const getDelegateAdmin = async () => {
    const { data } = await api.get(GET_DELEGATE_ADMIN_DASHBOARD);
    setGetDelegate(data);
  };

  const getAgentDelegate = async () => {
    const { data } = await api.get(GET_DELEGATE_AGENTS_DASHBOARD);
    console.log(data, "??????data????");
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

  const getAllRewards = async (page:any, limit:any) => {
    const param = { page: page, limit: limit };
    const { data } = await api.get(GET_ALL_REWARD_DATA, param)
    setRewardData(data)
  }

  return {
    getDelegateAdmin,
    getWithDrawalRequestData,
    getAgentDelegate,
    addRewards,
    getAllRewards
  };
};

export default useCustomHook;
