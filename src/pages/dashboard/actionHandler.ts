import { useEffect } from "react";
import api from "../../api";
import endpoints from "../../config/apiEndpoints";
import { useRecoilState, useRecoilValue } from "recoil";
import { agentDashboardWidgetsState, currentUserRoleState, studentProfileCompletionState, studentProfileState } from "../../store";
import constants from "../../config/constants";
import apiEndpoints from "../../config/apiEndpoints";
// import { agent_dashboard_widgets } from "../../store";

const { SYSTEM_ADMIN_DASHBOARD, AGENT_DASHBOARD_WIDGETS } = endpoints;
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
  const [countingCardData, setCountingCard] = useRecoilState(
    agentDashboardWidgetsState
  );

  const [getProfile, setGetProfile] = useRecoilState(studentProfileCompletionState);
  //user roles
  const { AGENT, MANAGER, COMPANY_ADMIN, DELEGATE_AGENT, STUDENT, SYSTEM_ADMIN, UNIVERSITY, INTERN, } = constants;
 
  const {VERIIFCATION_STUDENT , STUDENT_PROFILE_COMPLETION} = apiEndpoints;
 
  //logged in user role
  const role = useRecoilValue(currentUserRoleState);

  //api's endpoints

  const loadMoreData = () => {
    fetch(
      "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
    )
      .then((res) => res.json())
      .then((body) => {
        return body.results;
      })
      .catch(() => {});
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

  return {
    loadMoreData,
    countingCardData,
    verifcationStudentData,
    getStudentProfile,
  };
};

export default useCustomHook;
