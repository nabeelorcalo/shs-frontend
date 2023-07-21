import api from "../../api";
import apiEndpoints from "../../config/apiEndpoints";
import { lifeAssessmentState } from "../../store";
import { useRecoilState } from "recoil";
import { getDelegateAdminState } from "../../store/delegate";

const useCustomHook = () => {
  const [lifeAssessment, setLifeAssessment] = useRecoilState(lifeAssessmentState);
  const [getDelegate, setGetDelegate] = useRecoilState(getDelegateAdminState);
  const { DREAMUP,GET_DELEGATE_ADMIN_DASHBOARD } = apiEndpoints;
  const getData = async (type: string): Promise<any> => {
    const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  };

  const getLifeAssessment = async (val?: string) => {
    const hasValue = {month: val?.toLowerCase()} ?? {};
    const { data } = await api.get(DREAMUP.LIFE_ASSESSMENT, hasValue);
    setLifeAssessment(data);    
  };

  const postLifeAssessment = async (assessment: any) => {
    const { data } = await api.post(DREAMUP.UPDATE_LIFE_ASSESSMENT, assessment);
    getLifeAssessment(assessment.month)
    setLifeAssessment(data);
  };

  const getDelegateAdmin = async () => {
    const { data } = await api.get(GET_DELEGATE_ADMIN_DASHBOARD);
    setGetDelegate(data);
  };

  return {
    getData,
    postLifeAssessment,
    lifeAssessment,
    getDelegateAdmin
  };
};

export default useCustomHook;