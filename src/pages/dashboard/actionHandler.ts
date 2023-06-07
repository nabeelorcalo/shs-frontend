import { useEffect } from "react";
import api from "../../api";
import endpoints from "../../config/apiEndpoints";
import { useRecoilState, useRecoilValue } from "recoil";
// import { agentDashboardWidgetsState, currentUserRoleState, , studentProfileState } from "../../store";
import {
  adminDashboardMembersDataState,
  adminDashboardRegionAnalyticsState,
  agentDashboardWidgetsState,
  studentProfileCompletionState,
  currentUserRoleState,
  delegateAgenetMembersState,
  delegateAgentDashbaordState,
  growthAnalyticsDashboardState,
  topPerformersListState,
  // internshipsSummaryState,
} from "../../store";
// import constants from "../../config/constants";
import apiEndpoints from "../../config/apiEndpoints";
import { dashboardWidgetState, recentJobState } from "../../store/dashboard/student";
// import { agent_dashboard_widgets } from "../../store";

// const { SYSTEM_ADMIN_DASHBOARD, AGENT_DASHBOARD_WIDGETS } = endpoints;
//   topPerformersListState,
// } from "../../store";
import constants from "../../config/constants";
import { getRecentActivities } from "../../store/getListingState";
import { Notifications } from "../../components";

// Chat operation and save into store

//api's endpoints
const { SYSTEM_ADMIN_DASHBOARD, AGENT_DASHBOARD_WIDGETS, GET_PERFORMANCE_LIST } = endpoints;

const {
  AGENT,
  MANAGER,
  COMPANY_ADMIN,
  DELEGATE_AGENT,
  STUDENT,
  SYSTEM_ADMIN,
  UNIVERSITY,
  INTERN,
} = constants;

const useCustomHook = () => {
  // const [countingCardData, setCountingCard] = useRecoilState(agentDashboardWidgetsState);
  const [studentWidget, setStudentWidget] = useRecoilState(dashboardWidgetState);
  const [getProfile, setGetProfile] = useRecoilState(studentProfileCompletionState);
  const [getjOB, setGetJob] = useRecoilState(recentJobState);
  
  //user roles
  const { AGENT, MANAGER, COMPANY_ADMIN, DELEGATE_AGENT, STUDENT, SYSTEM_ADMIN, UNIVERSITY, INTERN, } = constants;
 
  const {VERIIFCATION_STUDENT , STUDENT_PROFILE_COMPLETION, STUDENT_DASHBOARD_WIDGET ,STUDENT_RECENT_JOB } = apiEndpoints;
 
  //logged in user role
  const role = useRecoilValue(currentUserRoleState);
  const [countingCardData, setCountingCard] = useRecoilState(agentDashboardWidgetsState);
  //top performers list
  const [topPerformerList, setTopPerformersList] = useRecoilState(topPerformersListState)




  // get top performers list
  const getTopPerformerList = async (query?: any) => {
    let params: any = {
      limit: query?.limit ?? 4,
      sortByPerformance: true
    }
    if (query?.startDate && query?.endDate) {
      params.startDate = query?.startDate;
      params.endDate = query?.endDate;
    }
    await api.get(GET_PERFORMANCE_LIST, params).then(res => {
      setTopPerformersList(res?.data?.map((obj: any) => ({ image: obj?.avatar, name: obj?.userName, designation: obj?.department, progress: `${obj?.sumOverallRating?.toFixed(2)}%` })));
      console.log(res)
    }
    )
  }

  // const getData = async (type: string): Promise<any> => {
  //   const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  // };

  const loadMoreData = () => {
    fetch(
      "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
    )
      .then((res) => res.json())
      .then((body) => {
        return body.results;
      })
      .catch(() => { });
  };

  // agent dashboard
  useEffect(() => {
    // agent dashboard
    if (role === AGENT) {
      api
        .get(AGENT_DASHBOARD_WIDGETS)
        .then(({ data }) => setCountingCard(data[0]));
    }
  }, []);

  const verifcationStudentData = async (body: any, query: {
    skip: boolean,
    step:number
  }): Promise<any> => {
    const config ={headers: { 'Content-Type': 'multipart/form-data' }}
    const { data } = await api.post(`${VERIIFCATION_STUDENT}?step=${query.step}&skip=${query.skip}`, body, config);
    return data;
  };

  const getStudentProfile = async () => {
    const { data } = await api.get(STUDENT_PROFILE_COMPLETION);
    setGetProfile(data);
  };

  const getStudentWidget = async () => {
    const { data } = await api.get(STUDENT_DASHBOARD_WIDGET);
    setStudentWidget(data);
  };

  const getStudentJob = async () => {
    const { data } = await api.get(STUDENT_RECENT_JOB );
    setGetJob(data);
  };

  return {
    loadMoreData,
    countingCardData,
    verifcationStudentData,
    getStudentProfile,
    getStudentWidget,
    getStudentJob,
    topPerformerList,
    getTopPerformerList,
  };
};

export default useCustomHook;
