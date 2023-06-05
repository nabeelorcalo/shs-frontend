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
  // const getData = async (type: string): Promise<any> => {
  //   const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  // };

  const pick = (object: { [x: string]: any }, keys: any[]): object => {
    return keys.reduce((obj: { [x: string]: any }, key: string | number) => {
      if (object && Object.prototype.hasOwnProperty.call(object, key)) {
        obj[key] = object[key];
      }
      return obj;
    }, {});
  }

  const getSelfAssessment = async () => {
    const filters = pick(filter, ['status', 'remarkedBy', 'month']);
    const { data } = await api.get(ASSESSMENT.GET_ASSESSMENTS, filters);
    setSelfAssessment(data);
    const remarkedObj = _.uniqBy(data, (obj: any)=> obj.remarkedBy)
    console.log(filter, data, remarkedObj);
    setRemarkedBy(remarkedObj as any);
  };
  
  return {
    selfAssessment,
    getSelfAssessment,
    remarkedBy,
    // getData,
  };
};

export default useCustomHook;