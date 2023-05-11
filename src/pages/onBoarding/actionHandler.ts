import React from "react";
import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
// import { currentUserState } from "../../../store";
import api from "../../api";
import constants from "../../config/constants";
import apiEndpoints from "../../config/apiEndpoints";

// Auth operation and save into store
const useCustomHook = () => {
  const { SIGNUP, VERIIFCATION_STUDENT } = apiEndpoints;
  const signup = async (body: any): Promise<any> => {
    const { data } = await api.post(SIGNUP, body);
    return data;
  };
  const verifcationStudent = async (body: any): Promise<any> => {
    const { data } = await api.post(VERIIFCATION_STUDENT, body);
    return data;
  };

  return {
    signup,
    verifcationStudent,
  };
};

export default useCustomHook;
