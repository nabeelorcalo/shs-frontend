import React from "react";
import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
// import { currentUserState } from "../../../store";
import api from "../../api";
import constants, { ROUTES_CONSTANTS } from "../../config/constants";
import apiEndpoints from "../../config/apiEndpoints";
import { useNavigate } from "react-router";
import { Notifications } from "../../components";
import { authVerificationState, currentUserState } from "../../store";

// Auth operation and save into store
const useCustomHook = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [verfifInitial, setVerfifInitial] = useRecoilState(
    authVerificationState
  );

  const {
    SIGNUP,
    EMAIL_VERIFY,
    NEW_PASSWORD,
    VERIIFCATION_STUDENT,
    AUTH_VERIFF,
    GET_ALL_UNIVERSITIES,
    GET_INTERNAL_UNIVERSITIES,
    COMPANY_INFO,
    COMPANY_VERIFICATION,
    USER_PROFILE,
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
      navigate(`/${ROUTES_CONSTANTS.VERIFICATION_LINK_SENT}`);
    }
    return data;
  };

  const newPasswordSetup = async (body: any): Promise<any> => {
    const { data } = await api.post(NEW_PASSWORD, body);
    if (!data.error) {
      Notifications({
        title: "Success",
        description: "New Password Successfully Created!",
        type: "success",
      });
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('cognitoId', data?.user?.cognitoId);
      setCurrentUser(data.user);
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
      return api.get(GET_INTERNAL_UNIVERSITIES, { page: 1, limit: 10 });
    return api.get(GET_INTERNAL_UNIVERSITIES, { page: 1, limit: 10, q: text });
  };

  const globalUniList = async ({ country, text }: any): Promise<any> => {
    if (!text || text.length == 0)
      return api.get(GET_ALL_UNIVERSITIES, { page: 1, limit: 10, country });
    return api.get(GET_ALL_UNIVERSITIES, {
      page: 1,
      limit: 10,
      country,
      q: text,
    });
  };

  const getCompanyList = async (text: any): Promise<any> => {
    console.log(text);
    return api.get(`${SEARCH_COMPANY_HOUSE}/${text}`);
  };

  const companyVerification = async (payload: any): Promise<any> => {
    return api.get(COMPANY_VERIFICATION, payload);
  };

  const updateUserProfile = async (id: any, payload: any): Promise<any> => {
    return api.patch(`${USER_PROFILE}?userId=${id}`,  payload);
  };

  const addCompanyInfo = async (body: any) => {
    const data = await api.post(COMPANY_INFO, body);
    return data;
  };

  return {
    signup,
    verifcationStudent,
    initiateVeriff,
    getUniversitiesList,
    globalUniList,
    newPasswordSetup,
    updateUserProfile,
    companyVerification,
    addCompanyInfo,
    getCompanyList,
    // verifStudent
  };
};

export default useCustomHook;
