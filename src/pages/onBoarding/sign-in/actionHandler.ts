import React from "react";
import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import { IconPColorState, IconSColorState, currentUserState, pColorState, sColorState, sbColorState } from "../../../store";
import api from "../../../api";
import constants, { ROUTES_CONSTANTS } from "../../../config/constants";
import apiEndpints from "../../../config/apiEndpoints";
import { Notifications } from "../../../components";
import { useNavigate } from "react-router-dom";

// Auth operation and save into store
const useCustomHook = () => {
  const navigate = useNavigate();
  const { LOGIN, CHANGEPASSWORD, FORGOTPASSWORD } = apiEndpints;
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  // theme
  const [pColor, setPColor] = useRecoilState<any>(pColorState);
  const [sColor, setSColor] = useRecoilState<any>(sColorState);
  const [sbColor, setSBColor] = useRecoilState<any>(sbColorState);
  const [pIconsColor, setPIconsColor] = useRecoilState<any>(IconPColorState);
  const [sIconsColor, setSIconsColor] = useRecoilState<any>(IconSColorState);

  const login = async (body: any): Promise<any> => {
    const { data } = await api.post(LOGIN, body);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("cognitoId", data?.user?.cognitoId)
    setCurrentUser(data.user);

    // set theme state on login
    setPColor(data?.user?.company?.buttonPrimaryColor)
    setSColor(data?.user?.company?.buttonSecondaryColor)
    setSBColor(data?.user?.company?.sideMenuColor)
    setPIconsColor(data?.user?.company?.sideMenuIconPrimaryColor)
    setSIconsColor(data?.user?.company?.sideMenuIconSecondaryColor)

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
