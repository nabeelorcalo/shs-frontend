import { useRecoilState, useRecoilValue } from "recoil";
import {
  adminDashboardMembersDataState,
  adminDashboardRegionAnalyticsState,
  currentUserRoleState,
  growthAnalyticsDashboardState,
} from "../../../store";
import { getRecentActivities } from "../../../store/getListingState";
import constants from "../../../config/constants";
import endpoints from "../../../config/apiEndpoints";
import api from "../../../api";

const useCustomHook = () => {
  const [totalMembersData, setTotalMembersData] = useRecoilState(adminDashboardMembersDataState);
  const [growthAnalyticsData, setGrowthAnalyticsData] = useRecoilState(growthAnalyticsDashboardState);
  const [regionAnalytics, setRegionAnalytics] = useRecoilState(adminDashboardRegionAnalyticsState);
  const [adminActivity, setAdminActivity] = useRecoilState(getRecentActivities);

  //api's endpoints
  const { GET_SYSTEM_ADMIN_DASHBOARD, GET_GENERAL_ACTIVITY } = endpoints;

  const filterGraphData = (dateRange: string[]) => {
    api
      .get(GET_SYSTEM_ADMIN_DASHBOARD, {
        startDate: dateRange[0],
        endDate: dateRange[1],
      })
      .then(({ data }) => setGrowthAnalyticsData(data.graphData));
  };
  const fetchAdminDahsboardData = () => {
    api.get(GET_SYSTEM_ADMIN_DASHBOARD).then(({ data }) => {
      setTotalMembersData(data.totalMembersData);
      setGrowthAnalyticsData(data.graphData);
      setRegionAnalytics(data?.geographicalResponse);
    });
    api.get(GET_GENERAL_ACTIVITY, { page: 1, limit: 10 }).then(({ data }) => setAdminActivity(data));
  };

  return {
    totalMembersData,
    growthAnalyticsData,
    regionAnalytics,
    adminActivity,
    filterGraphData,
    fetchAdminDahsboardData,
  };
};

export default useCustomHook;
