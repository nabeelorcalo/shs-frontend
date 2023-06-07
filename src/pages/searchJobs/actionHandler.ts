import React from "react";
import { useRecoilState } from "recoil";
// import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
// import { peronalChatListState, personalChatMsgxState, chatIdState } from "../../store";
import api from "../../api";
import constants from "../../config/constants";
import endpoints from "../../config/apiEndpoints";
import { searchJobsState } from "../../store/searchJobs";


// Chat operation and save into store
const useCustomHook = () => {
  const { GET_SEARCHJOBS } = endpoints;
  const [searchJobsData, setSearchJobsData] = useRecoilState(searchJobsState);
  // const [chatId, setChatId] = useRecoilState(chatIdState);
  // const [personalChatMsgx, setPersonalChatMsgx] = useRecoilState(personalChatMsgxState);

  const getSearchJob = async () => {
    const param = {
      limit: 5,
      page: 1,
    }
    const { data } = await api.get(GET_SEARCHJOBS, param);
    setSearchJobsData(data)
  };

  return {
    getSearchJob,
    setSearchJobsData,
    searchJobsData
  };
};

export default useCustomHook;