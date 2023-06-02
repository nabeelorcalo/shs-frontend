import api from "../../api";
import apiEndpoints from "../../config/apiEndpoints";
import { lifeAssessmentState } from "../../store";
import { useRecoilState } from "recoil";

const useCustomHook = () => {
  const [lifeAssessment, setLifeAssessment] = useRecoilState(lifeAssessmentState);
  const { DREAMUP } = apiEndpoints;
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

  return {
    getData,
    postLifeAssessment,
    lifeAssessment,
  };
};

export default useCustomHook;