import React from "react";
import { useRecoilState } from "recoil";
// import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
// import { peronalChatListState, personalChatMsgxState, chatIdState } from "../../store";
import api from "../../api";
import constants from "../../config/constants";
import endpoints from "../../config/apiEndpoints";
import { detailsSearchJobsState, searchJobsState } from "../../store/searchJobs";


// Chat operation and save into store
const useCustomHook = () => {
  const { GET_SEARCHJOBS, GET_DETAILESEARCHJOBS } = endpoints;
  const [searchJobsData, setSearchJobsData] = useRecoilState(searchJobsState);
  const [detailsJobsData, setDetailsJobsData] = useRecoilState(detailsSearchJobsState);
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
  const getDetailsJob = async (id: any) => {
    const param = { id: 1 }
    const { data } = await api.get(GET_DETAILESEARCHJOBS, param);
    setDetailsJobsData(data)
  };
  return {
    getSearchJob,
    setSearchJobsData,
    searchJobsData,
    getDetailsJob,
    setDetailsJobsData,
    detailsJobsData
  };
};

export default useCustomHook;