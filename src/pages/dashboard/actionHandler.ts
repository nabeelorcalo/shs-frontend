import { useEffect } from "react";

import api from "../../api";
import endpoints from "../../config/apiEndpoints";
import { useRecoilState, useRecoilValue } from "recoil";
import { agentDashboardWidgetsState, currentUserRoleState, studentProfileCompletionState, studentProfileState } from "../../store";
import constants from "../../config/constants";
import apiEndpoints from "../../config/apiEndpoints";
// import { agent_dashboard_widgets } from "../../store";

// Chat operation and save into store
const useCustomHook = () => {

  const [getProfile, setGetProfile] = useRecoilState(studentProfileCompletionState);
  //user roles
  const { AGENT, MANAGER, COMPANY_ADMIN, DELEGATE_AGENT, STUDENT, SYSTEM_ADMIN, UNIVERSITY, INTERN, } = constants;
 
  const {VERIIFCATION_STUDENT , STUDENT_PROFILE_COMPLETION} = apiEndpoints;
 


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

  const verifcationStudentData = async (body: any, query: {
    skip: boolean,
    step:number
  }): Promise<any> => {
    const { data } = await api.post(`${VERIIFCATION_STUDENT}?step=${query.step}&skip=${query.skip}`, body,
      {
      headers: { 'Content-Type': 'multipart/form-data' }
      }
    );
    return data;
  };

  
  const getStudentProfile = async () => {
    const { data } = await api.get(STUDENT_PROFILE_COMPLETION);
    console.log(data,'><><><><')
    setGetProfile(data);
  };

  return {
    getData,
    loadMoreData,
    countingCardData,
    verifcationStudentData,
    getStudentProfile,
  };
};

export default useCustomHook;