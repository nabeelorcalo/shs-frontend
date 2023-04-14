import { useEffect } from "react";

import api from "../../api";
import endpoints from "../../config/apiEndpoints";
import { useRecoilState, useRecoilValue } from "recoil";
import { agentDashboardWidgetsState, currentUserRoleState } from "../../store";
import constants from "../../config/constants";

// import { agent_dashboard_widgets } from "../../store";

// Chat operation and save into store
const useCustomHook = () => {

  //user roles
  const { AGENT, MANAGER, COMPANY_ADMIN, DELEGATE_AGENT, STUDENT, SYSTEM_ADMIN, UNIVERSITY, INTERN } = constants;

  //logged in user role
  const role = useRecoilValue(currentUserRoleState);

  //api's endpoints
  const { AGENT_DASHBOARD_WIDGETS } = endpoints;

  const getData = async (type: string): Promise<any> => {
    const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  };

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


  useEffect(() => {
    // agent dashboard
    if (role === AGENT) {
      api.get(AGENT_DASHBOARD_WIDGETS).then(({ data }) => setCountingCard(data[0]))
    }
  }, [])

  return {
    getData,
    loadMoreData,
    countingCardData,
  };
};

export default useCustomHook;