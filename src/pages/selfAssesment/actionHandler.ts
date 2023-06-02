import React from "react";
import api from "../../api";
import constants from "../../config/constants";
import apiEndpints from "../../config/apiEndpoints";
import { assessmentDataState } from "../../store";
import { useRecoilState } from "recoil";

const useCustomHook = () => {
  const { ASSESSMENT } = apiEndpints
  const [selfAssessment, setSelfAssessment] = useRecoilState(assessmentDataState);

  const getData = async (type: string): Promise<any> => {
    const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  };

  const getSelfAssessment = async (query: any) => {
    const { data } = await api.get(ASSESSMENT.GET_ASSESSMENTS, query);
    setSelfAssessment(data);
    console.log(query, data);
  };
  
  return {
    selfAssessment,
    getSelfAssessment,
    getData,
  };
};

export default useCustomHook;