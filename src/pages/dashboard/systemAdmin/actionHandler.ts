import { useRecoilState } from "recoil";
import {
  adminDashboardIssueState,
  adminDashboardMembersDataState,
  adminDashboardRegionAnalyticsState,
  getRoleBaseUsers,
  growthAnalyticsDashboardState,
  helpDeskDetailState,
  helpdeskDetailComment,
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
  const [issueData, setIssueData] = useRecoilState(adminDashboardIssueState);
  const [helpDeskDetail, setHelpDeskDetail] = useRecoilState<any>(helpDeskDetailState);
  const [roleBaseUsers, setRoleBaseUsers] = useRecoilState(getRoleBaseUsers);
  const [helpdeskComments, setHelpdeskComments] = useRecoilState(helpdeskDetailComment);

  //api's endpoints
  const {
    GET_SYSTEM_ADMIN_DASHBOARD,
    GET_GENERAL_ACTIVITY,
    GET_HELP_DESK_LIST,
    VIEW_HELP_DESK_DETAILS,
    GET_ROLEBASE_USERS,
    EDIT_HELP_DESK,
    CREATE_HELPDESK_COMMENT,
    UPDATE_HELPDESK_COMMENT,
  } = endpoints;

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
      setTotalMembersData({ ...data.totalMembersData, totalStudents: data?.totalMembersData?.totalStudents || 0 });
      setGrowthAnalyticsData(data.graphData);
      setRegionAnalytics(data?.geographicalResponse);
    });
    api.get(GET_HELP_DESK_LIST, { sort: "DESC" }).then(({ data, count }) => {
      const totalCount = count || 0;
      const resolvedIssues = data?.filter((issue: any) => issue.status === "RESOLVED").length;
      const pendingIssues = data?.filter((issue: any) => issue.status === "PENDING").length;
      const inprogressIssues = data?.filter((issue: any) => issue.status === "INPROGRESS").length;
      const resolvedPercentage = parseFloat((resolvedIssues / totalCount).toFixed(2));
      const progressPercentage = parseFloat((inprogressIssues / totalCount).toFixed(2)) + resolvedPercentage;
      const guageData: any = [resolvedPercentage, progressPercentage, 1];
      setIssueData({ totalIssues: totalCount, resolvedIssues, pendingIssues, issues: data || [], guageData });
    });
    api.get(GET_GENERAL_ACTIVITY, { page: 1, limit: 10 }).then(({ data }) => setAdminActivity(data));
  };
  const getHepDeskDetail = (helpdeskId: string, onSuccess?: () => void) => {
    api.get(VIEW_HELP_DESK_DETAILS, { helpdeskId }).then(({ data }) => {
      if (data) setHelpDeskDetail(data);
      if (onSuccess) onSuccess();
    });
  };
  const getHelpDeskComment = (helpdeskId: string, onSuccess?: () => void) => {
    api.get(CREATE_HELPDESK_COMMENT, { entityId: helpdeskId, entityType: "HELPDESK_MESSAGES" }).then(({ data }) => {
      setHelpdeskComments(data);
      if (onSuccess) onSuccess();
      return data;
    });
  };

  const addHelpDeskComment = async (payload: any, onSuccess?: () => void) => {
    const formData = new FormData();
    formData.append('otherField', payload.otherField);
    formData.append("entityId", payload.entityId);
    formData.append("entityType", payload.entityType);
    formData.append("comment", payload.comment);
    payload?.parentId && (formData.append("parentId", payload?.parentId))
    formData.delete("media");
    if (payload?.media?.length > 0) {
      payload?.media?.forEach((file: any) => {
        formData.append("media", file);
      });
    }
    await api.post(CREATE_HELPDESK_COMMENT, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((result) => {
      if (onSuccess) onSuccess();
      return result;
    });
  };

  const updateHelpDeskComment = (payload: any, onSuccess?: () => void) => {
    api.put(UPDATE_HELPDESK_COMMENT, payload).then((result) => {
      if (onSuccess) onSuccess();
      return result;
    });
  };
  const fetchRoleBaseUsers = async () => {
    const { data } = await api.get(GET_ROLEBASE_USERS, { role: constants.SYSTEM_ADMIN });
    setRoleBaseUsers(data?.result);
  };
  const EditHelpDeskDetails = async (id: any, values: any = null, onSuccess?: () => void) => {
    api.patch(`${EDIT_HELP_DESK}?id=${id}`, values).then(({ data }) => {
      if (onSuccess) onSuccess();
      return data;
    });
  };

  return {
    totalMembersData,
    growthAnalyticsData,
    regionAnalytics,
    adminActivity,
    filterGraphData,
    fetchAdminDahsboardData,
    issueData,
    getHepDeskDetail,
    helpDeskDetail,
    fetchRoleBaseUsers,
    roleBaseUsers,
    EditHelpDeskDetails,
    getHelpDeskComment,
    helpdeskComments,
    addHelpDeskComment,
    updateHelpDeskComment,
  };
};

export default useCustomHook;
