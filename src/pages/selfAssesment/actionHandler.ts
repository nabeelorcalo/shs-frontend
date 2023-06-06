import React from "react";
import api from "../../api";
import constants from "../../config/constants";
import apiEndpints from "../../config/apiEndpoints";
import { assessmentDataState, filterData, remarkedByData } from "../../store";
import { useRecoilState } from "recoil";
import _ from "lodash";

const useCustomHook = () => {
  const { ASSESSMENT } = apiEndpints
  const [selfAssessment, setSelfAssessment] = useRecoilState(assessmentDataState);
  const [remarkedBy, setRemarkedBy] = useRecoilState(remarkedByData);
  const [filter, setFilter] = useRecoilState(filterData);

  const getSelfAssessment = async () => {
    const { data } = await api.get(ASSESSMENT.GET_ASSESSMENTS, filter);
    setSelfAssessment(data);
    if(_.isEmpty(filter)) {
      const remarkedObj = _.uniqBy(data, (obj: any)=> obj.remarkedBy)
      setRemarkedBy(remarkedObj as any);
    }
  };
  
  return {
    selfAssessment,
    remarkedBy,
    getSelfAssessment,
  };
};

export default useCustomHook;