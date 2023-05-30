import { useEffect } from 'react';

import api from '../../api';
import endpoints from '../../config/apiEndpoints';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  adminDashboardMembersDataState,
  adminDashboardRegionAnalyticsState,
  agentDashboardWidgetsState,
  currentUserRoleState,
  growthAnalyticsDashboardState,
} from '../../store';
import constants from '../../config/constants';
import { getRecentActivities } from '../../store/getListingState';

// import { agent_dashboard_widgets } from "../../store";

// Chat operation and save into store
const useCustomHook = () => {
  //user roles
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

  //logged in user role
  const role = useRecoilValue(currentUserRoleState);

  //api's endpoints
  const {
    AGENT_DASHBOARD_WIDGETS,
    GET_SYSTEM_ADMIN_DASHBOARD,
    GET_GENERAL_ACTIVITY,
  } = endpoints;

  const getData = async (type: string): Promise<any> => {
    const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  };

  const loadMoreData = () => {
    fetch(
      'https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo'
    )
      .then((res) => res.json())
      .then((body) => {
        return body.results;
      })
      .catch(() => {});
  };

  // agent dashboard
  const [countingCardData, setCountingCard] = useRecoilState(
    agentDashboardWidgetsState
  );
  const [totalMembersData, setTotalMembersData] = useRecoilState(
    adminDashboardMembersDataState
  );
  const [growthAnalyticsData, setGrowthAnalyticsData] = useRecoilState(
    growthAnalyticsDashboardState
  );
  const [regionAnalytics, setRegionAnalytics] = useRecoilState(
    adminDashboardRegionAnalyticsState
  );
  const [adminActivity, setAdminActivity] = useRecoilState(getRecentActivities);

  const filterGraphData = (dateRange: string[]) => {
    api
      .get(GET_SYSTEM_ADMIN_DASHBOARD, {
        startDate: dateRange[0],
        endDate: dateRange[1],
      })
      .then(({ data }) => setGrowthAnalyticsData(data.graphData));
  };

  useEffect(() => {
    // agent dashboard
    if (role === AGENT) {
      api
        .get(AGENT_DASHBOARD_WIDGETS)
        .then(({ data }) => setCountingCard(data[0]));
    }
    if (role === SYSTEM_ADMIN) {
      api.get(GET_SYSTEM_ADMIN_DASHBOARD).then(({ data }) => {
        setTotalMembersData(data.totalMembersData);
        setGrowthAnalyticsData(data.graphData);
        setRegionAnalytics(data?.geographicalResponse);
      });
      api
        .get(GET_GENERAL_ACTIVITY, { page: 1, limit: 10 })
        .then(({ data }) => setAdminActivity(data));
    }
  }, []);

  return {
    getData,
    loadMoreData,
    countingCardData,
    totalMembersData,
    growthAnalyticsData,
    regionAnalytics,
    adminActivity,
    filterGraphData,
  };
};

export default useCustomHook;
