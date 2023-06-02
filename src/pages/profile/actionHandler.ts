import React from "react";
import api from "../../api";
import constants from "../../config/constants";
import apiEndpints from "../../config/apiEndpoints";
import { studentProfileState } from "../../store";
import { useRecoilState } from "recoil";

const useCustomHook = () => {
  const { PROFILE_CHANGE_PASSWORD, STUDENT_PROFILE } = apiEndpints;
  const [studentProfile, setStudentProfile] = useRecoilState(studentProfileState);
  const profilechangepassword = async (body: any): Promise<any> => {
    const { data } = await api.post(PROFILE_CHANGE_PASSWORD, body);
    return data;
  };

  const getStudentProfile = async (userId:number) => {
    //  const profile?userId=""
    const { data } = await api.get(`${STUDENT_PROFILE}?userId=${userId}`);
    console.log(data,'><><><><')
    setStudentProfile(data);
  };

  const getData = async (type: string): Promise<any> => {
    const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  };
  return {
    getData,
    profilechangepassword,
    getStudentProfile
  };
};

export default useCustomHook;
