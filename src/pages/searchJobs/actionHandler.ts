import { useRecoilState } from "recoil";
// import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
// import { peronalChatListState, personalChatMsgxState, chatIdState } from "../../store";
import api from "../../api";
import endpoints from "../../config/apiEndpoints";
import { detailsSearchJobsState, searchJobsState } from "../../store/searchJobs";


// Chat operation and save into store
const useCustomHook = () => {
  const { GET_SEARCHJOBS, GET_DETAILESEARCHJOBS } = endpoints;
  const [searchJobsData, setSearchJobsData] = useRecoilState(searchJobsState);
  const [detailsJobsData, setDetailsJobsData] = useRecoilState(detailsSearchJobsState);
  // const [chatId, setChatId] = useRecoilState(chatIdState);
  // const [personalChatMsgx, setPersonalChatMsgx] = useRecoilState(personalChatMsgxState);

  const getSearchJob = async (searchValue: any = null, workType: any = null, duration: any = null) => {
    const params: any = {
      limit: 5,
      page: 1,
      search: searchValue ? searchValue : null,
      duration: duration


    }

    if (workType === "PAID" || workType === "UNPIAD") {
      params["salaryType"] = workType === "ALL" ? null : workType
    } else {
      params["internType"] = workType === "ALL" ? null : workType
    }
    const { data } = await api.get(GET_SEARCHJOBS, params);
    setSearchJobsData(data)
  };
  const getDetailsJob = async (id: any) => {
    const param = { id: id }
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