import React from "react";
import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
// import { currentUserState } from "../../../store";
import api from "../../api";
import constants, { ROUTES_CONSTANTS } from "../../config/constants";
import apiEndpoints from "../../config/apiEndpoints";
import { useNavigate } from "react-router";
import { Notifications } from "../../components";
import { authVerificationState } from "../../store";

// Auth operation and save into store
const useCustomHook = () => {
  const navigate = useNavigate();
  const [verfifInitial, setVerfifInitial] = useRecoilState(
    authVerificationState
  );

  const {
    SIGNUP,
    EMAIL_VERIFY,
    VERIIFCATION_STUDENT,
    AUTH_VERIFF,
    GET_ALL_UNIVERSITIES,
    COMPANY_VERIFICATION_STEP_1,
    COMPANY_VERIFICATION_STEP_2,
    COMPANY_VERIFICATION_STEP_3,
    SEARCH_COMPANY_HOUSE,
  } = apiEndpoints;
  const signup = async (body: any): Promise<any> => {
    const { data } = await api.post(SIGNUP, body);
    if (!data.error) {
      Notifications({
        title: "Success",
        description: "Sign Up Success",
        type: "success",
      });

      if (body.role == constants.STUDENT)
        navigate(`/${ROUTES_CONSTANTS.VERIFICATION_LINK_SENT}`);
      if (body.role == constants.COMPANY_ADMIN)
        navigate(`/${ROUTES_CONSTANTS.VERIFICATION_LINK_SENT}`);
      // navigate("/company-admin-verification");
    }
    return data;
  };

  const verifcationStudent = async (
    body: any,
    query: {
      skip: boolean;
      step: number;
    }
  ): Promise<any> => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const data = await api.post(
      `${VERIIFCATION_STUDENT}?step=${query.step}&skip=${query.skip}`,
      body,
      config
    );
    return data;
  };

  const initiateVeriff = async (body: any) => {
    const { cognitoId } = body;
    delete body.cognitoId;
    const res: any = api.post(`${AUTH_VERIFF}/${cognitoId}`, body);
    return res;
  };

  const getUniversitiesList = async (text: any): Promise<any> => {
    if (!text || text.length == 0)
      return api.get(`${GET_ALL_UNIVERSITIES}?page=1&limit=10`);
    return api.get(`${GET_ALL_UNIVERSITIES}?q=${text}&page=1&limit=10`);
  };

  const getCompanyList = async (text: any): Promise<any> => {
    console.log(text);
    return api.get(`${SEARCH_COMPANY_HOUSE}/${text}`);
  };

  const companyVerification = async (body: any, step: number) => {
    const urlMapper: any = {
      1: COMPANY_VERIFICATION_STEP_1,
      2: COMPANY_VERIFICATION_STEP_2,
      3: COMPANY_VERIFICATION_STEP_3,
    };

    console.log();

    const data = await api.post(urlMapper[step], body);
    return data;
  };

  return {
    signup,
    verifcationStudent,
    initiateVeriff,
    getUniversitiesList,
    companyVerification,
    getCompanyList,
    // verifStudent
  };
};

export default useCustomHook;
