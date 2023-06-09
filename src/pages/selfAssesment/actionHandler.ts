import React from "react";
import api from "../../api";
import constants, { ROUTES_CONSTANTS } from "../../config/constants";
import apiEndpints from "../../config/apiEndpoints";
import { useNavigate } from 'react-router-dom'
import { assessmentDataState, filterData, remarkedByData } from "../../store";
import { useRecoilState } from "recoil";
import _ from "lodash";
import { Notifications } from "../../components";

const useCustomHook = () => {
  const { ASSESSMENT, MEDIA_UPLOAD } = apiEndpints
  const navigate = useNavigate();
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

  const saveSelfAssessment = async (assessment: any) => {
    const asses = _.drop(assessment?.assessmentForm, 1)
    assessment.assessmentForm = asses;
    const { data } = await api.post(ASSESSMENT.ADD_ASSESSMENT, assessment);
    if (data) {
      await getSelfAssessment();
      Notifications({ title: "Success", description: "Assessment added", type: "success" });
      navigate(`/${ROUTES_CONSTANTS.SELF_ASSESSMENT}`)
    }
  };

  const downloadAssessment = async (assessment: {id: number, downloadType: string}) => {
    console.log(assessment);
    
    const { data } = await api.get(`${ASSESSMENT.GET_ASSESSMENT}/${assessment.id}`, {downloadType: assessment.downloadType});
    console.log(data);
    // To be implemented
  };

  const handleFileUpload = async (file: any) => {
    // media upload
    const formData = new FormData();
    // custom header for "multipart/form-data"
    let headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
    if (file) {
      formData.append('file', file);
      const fileData = await api.post(MEDIA_UPLOAD, formData, headerConfig);
      return fileData?.data
    }
  }

  const deleteAssessment = async (assessment: {id: number}) => {
    console.log(assessment);
    const data = await api.delete(`${ASSESSMENT.DELETE_ASSESSMENT}/${assessment.id}`);
    if (data.message === 'Success' || data.statusCode === 200) {
      await getSelfAssessment();
      Notifications({ title: "Success", description: "Assessment Deleted", type: "success" });
    }
  };
  
  return {
    selfAssessment,
    remarkedBy,
    getSelfAssessment,
    downloadAssessment,
    saveSelfAssessment,
    deleteAssessment,
    handleFileUpload,
  };
};

export default useCustomHook;