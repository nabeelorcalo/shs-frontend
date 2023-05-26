import React from "react";
import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
// import { currentUserState } from "../../../store";
import api from "../../api";
import constants, { ROUTES_CONSTANTS } from "../../config/constants";
import apiEndpoints from "../../config/apiEndpoints";
import { useNavigate } from "react-router";
import { Notifications } from "../../components";

// Auth operation and save into store
const useCustomHook = () => {
  const navigate = useNavigate();

  const { SIGNUP, VERIIFCATION_STUDENT } = apiEndpoints;
  const signup = async (body: any): Promise<any> => {
    const { data } = await api.post(SIGNUP, body);
    if (!data.error) {
      Notifications({
        title: "Success",
        description: "Sign Up Success",
        type: "success",
      });
      
      navigate(`/${ROUTES_CONSTANTS.VERIFICATION_STEPS}`);
      // navigate("/company-admin-verification");
    }
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
