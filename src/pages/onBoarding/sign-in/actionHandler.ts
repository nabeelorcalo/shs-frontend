import React from "react";
import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import { currentUserState } from "../../../store";
import api from "../../../api";
import constants, { ROUTES_CONSTANTS } from "../../../config/constants";
import apiEndpints from "../../../config/apiEndpoints";
import { Notifications } from "../../../components";
import { useNavigate } from "react-router-dom";

// Auth operation and save into store
const useCustomHook = () => {
  const navigate = useNavigate();
  const { LOGIN,CHANGEPASSWORD ,FORGOTPASSWORD } = apiEndpints;
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const login = async (body: any): Promise<any> => {
    const { data } = await api.post(LOGIN, body);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("cognitoId", data?.user?.cognitoId)
    setCurrentUser(data.user);
    return data;
  };

  const changepassword = async (body: any): Promise<any> => {
    const { data } = await api.post(CHANGEPASSWORD, body);
    if (!data.error) {
      Notifications({
        title: "Success",
        description: "Password changed",
        type: "success",
      });   
      navigate(`${ROUTES_CONSTANTS.LOGIN}`);
    }
    return data;
  };

  const forgotpassword = async (body: any): Promise<any> => {
    const { data } = await api.post(FORGOTPASSWORD, body);
    return data;
  };

  return {
    login,
    changepassword,
    forgotpassword,
  };
};

export default useCustomHook;
