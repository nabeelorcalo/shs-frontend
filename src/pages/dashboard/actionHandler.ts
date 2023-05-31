import { useEffect, useState } from "react";

import api from "../../api";
import endpoints from "../../config/apiEndpoints";
import { useRecoilState, useRecoilValue } from "recoil";
import { agentDashboardWidgetsState, currentUserRoleState } from "../../store";
import constants from "../../config/constants";

// import { agent_dashboard_widgets } from "../../store";

// Chat operation and save into store
const { SYSTEM_ADMIN_DASHBOARD, AGENT_DASHBOARD_WIDGETS } = endpoints;
const { AGENT, MANAGER, COMPANY_ADMIN, DELEGATE_AGENT, STUDENT, SYSTEM_ADMIN, UNIVERSITY, INTERN } = constants;
const useCustomHook = () => {
  //user roles
  //logged in user role
  const role = useRecoilValue(currentUserRoleState);

  const [totalUserData, setTotalUserData] = useState<any>({})
  const [analyticsData, setAnalyticsData] = useState<any>({})

  //api's endpoints

  // const getData = async (type: string): Promise<any> => {
  //   const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  // };

  const loadMoreData = () => {
    fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
      .then((res) => res.json())
      .then((body) => {
        return body.results
      })
      .catch(() => {

      });
  };

  // agent dashboard
  const [countingCardData, setCountingCard] = useRecoilState(agentDashboardWidgetsState);

  // get data 
  const getData = async () => {
    await api.get(SYSTEM_ADMIN_DASHBOARD).then(({ data }) => {
      console.log("system admin dashboard", data);
      const totalMembersData = data?.totalMembersData;
      setTotalUserData({
        interns: totalMembersData?.totalInterns,
        universities: totalMembersData?.totalUniversities,
        companies: totalMembersData?.totalCompanies,
        delegate_agents: totalMembersData?.totalDelegates,
        property_agents: totalMembersData?.totalPropertyAgents
      })
      setAnalyticsData({
        active_users: totalMembersData?.totalActiveUsers,
        internship_vacancies: totalMembersData?.intenrshipVacancies,
        issue_count: totalMembersData?.totalIssues ?? 0,
        issues_resolved: totalMembersData?.totalIssuesResolved ?? 0,
        issues_pending: totalMembersData?.totalIssuesPending ?? 0,
      })
    })
  }

  useEffect(() => {
    // agent dashboard
    if (role === AGENT) {
      api.get(AGENT_DASHBOARD_WIDGETS).then(({ data }) => setCountingCard(data[0]))
    }
  }, [])

  return {
    getData,
    loadMoreData,
    countingCardData, analyticsData, totalUserData
  };
};

export default useCustomHook;