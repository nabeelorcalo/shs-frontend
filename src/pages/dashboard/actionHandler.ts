import { useEffect } from "react";

import api from "../../api";
import endpoints from "../../config/apiEndpoints";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  adminDashboardMembersDataState,
  adminDashboardRegionAnalyticsState,
  agentDashboardWidgetsState,
  currentUserRoleState,
  delegateAgenetMembersState,
  delegateAgentDashbaordState,
  growthAnalyticsDashboardState,
  topPerformersListState,
} from "../../store";
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

  return {
    loadMoreData,
    countingCardData,
    topPerformerList,
    getTopPerformerList,
  };
};

export default useCustomHook;
