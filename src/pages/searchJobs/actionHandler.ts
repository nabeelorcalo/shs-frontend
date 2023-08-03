import { useRecoilState } from "recoil";
// import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
// import { peronalChatListState, personalChatMsgxState, chatIdState } from "../../store";
import api from "../../api";
import endpoints from "../../config/apiEndpoints";
import {
  detailsSearchJobsState,
  jobsApplyInternship,
  searchJobsState,
  departmentJobsData,
} from "../../store/searchJobs";
import { Notifications } from "../../components";

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_SEARCHJOBS, GET_DETAILESEARCHJOBS, GET_APPLICATION_INTERN, GET_DEPARTMENT_JOBS } = endpoints;
  const [searchJobsData, setSearchJobsData] = useRecoilState(searchJobsState);
  const [detailsJobsData, setDetailsJobsData] = useRecoilState(detailsSearchJobsState);
  const [jobsApplyInternshipData, setJobsApplyInternshipData] = useRecoilState(jobsApplyInternship);
  const [serachJobsDepData, setSerachJobsDepData] = useRecoilState(departmentJobsData);
  // const [chatId, setChatId] = useRecoilState(chatIdState);
  // const [personalChatMsgx, setPersonalChatMsgx] = useRecoilState(personalChatMsgxState);

  const getSearchJob = async (
    searchValue: any = null,
    workType: any = null,
    duration: any = null,
    departmentId: any = null
  ) => {
    const params: any = {
      search: searchValue ? searchValue : null,
      duration: duration ? `${duration} ${duration > 1 ? 'months' : 'month'}` : null,
    };
    if (workType === "PAID" || workType === "UNPIAD") {
      params["salaryType"] = workType === "ALL" ? null : workType;
    } else {
      params["internType"] = workType === "ALL" ? null : workType;
    }
    if (departmentId) {
      params["departmentName"] = departmentId;
    }
    const { data } = await api.get(GET_SEARCHJOBS, params);
    setSearchJobsData(data);
  };
  const getDetailsJob = async (interId: any, companyId: any) => {
    const param = { id: interId, companyId: companyId };
    const { data } = await api.get(GET_DETAILESEARCHJOBS, param);
    setDetailsJobsData(data);
  };
  const jobsApplicationApply = async (companyId: any, internshipId: any) => {
    const param = {
      companyId: companyId,
      internshipId: internshipId,
    };
    const { data } = await api.post(GET_APPLICATION_INTERN, param);
    setJobsApplyInternshipData(data);
    Notifications({ title: "Success", description: "Successfully Applied InternShip", type: "success" });
  };
  const getSearchJobsDepartment = async () => {
    const param = { page: 1, limit: 10 };
    const { data } = await api.get(GET_DEPARTMENT_JOBS, param);
    console.log(data, "data");
    setSerachJobsDepData(data);
  };

  return {
    getSearchJob,
    setSearchJobsData,
    searchJobsData,
    getDetailsJob,
    setDetailsJobsData,
    detailsJobsData,
    jobsApplicationApply,
    setJobsApplyInternshipData,
    getSearchJobsDepartment,
    serachJobsDepData,
  };
};

export default useCustomHook;
