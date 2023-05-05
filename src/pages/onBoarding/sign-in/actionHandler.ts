import React from "react";
import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import { currentUserState } from "../../../store";
import api from "../../../api";
import constants from "../../../config/constants";
import apiEndpints from "../../../config/apiEndpoints";

// Auth operation and save into store
const useCustomHook = () => {
  const { LOGIN } = apiEndpints;
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const login = async (body: any): Promise<any> => {
    const { data } = await api.post(LOGIN, body);
    localStorage.setItem("accessToken", data.accessToken);
    setCurrentUser(data.user);
    return data;
  };

  const { CHANGEPASSWORD } = apiEndpints;
  const changepassword = async (body: any): Promise<any> => {
    const { data } = await api.post(CHANGEPASSWORD, body);
    return data;
  };

  const { FORGOTPASSWORD } = apiEndpints;
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
