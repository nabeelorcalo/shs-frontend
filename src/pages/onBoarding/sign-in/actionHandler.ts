import React from "react";
import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import {
  IconPColorState,
  IconSColorState,
  ButtonPrimaryColorState,
  ButtonSecondaryColorState,
  currentUserState,
  newPasswordUser,
  sbColorState,
  sbPreviewColorState,
  OrgLogoState,
  PreviewLogoState
} from "../../../store";
import api from "../../../api";
import constants, { ROUTES_CONSTANTS } from "../../../config/constants";
import apiEndpints from "../../../config/apiEndpoints";
import { Notifications } from "../../../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Auth operation and save into store
const useCustomHook = () => {
  const navigate = useNavigate();
  const { INIT_VERIFICATION, LOGIN, CHANGEPASSWORD, FORGOTPASSWORD } =
    apiEndpints;
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [newPassData, setNewPassData] = useRecoilState(newPasswordUser);
  // theme
  const setSBColor = useSetRecoilState(sbColorState);
  const setIconsPColor = useSetRecoilState(IconPColorState);
  const setIconsSColor = useSetRecoilState(IconSColorState);
  const setButtonPrimaryColor = useSetRecoilState(ButtonPrimaryColorState);
  const setButtonSecondaryColor = useSetRecoilState(ButtonSecondaryColorState);
  const setSbPreviewColor = useSetRecoilState(sbPreviewColorState);
  const setOrgLogo = useSetRecoilState(OrgLogoState);
  const setPreviewLogo = useSetRecoilState(PreviewLogoState);

  const login = async (body: any): Promise<any> => {
    let res: any;
    try {
      res = await axios.post(`${constants.APP_URL}/${LOGIN}`, body);
      const { data } = res.data;

      if (data.challengeName == "NEW_PASSWORD_REQUIRED") {
        setNewPassData(data);
        return {
          statusCode: 200,
          data,
          error: null,
        };
      }

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("cognitoId", data?.user?.cognitoId);
      setCurrentUser(data.user);

      // set theme state on login
      const companyLogo = data?.user?.company?.logo ?
        `${constants.MEDIA_URL}/${data?.user?.company?.logo?.mediaId}.${data?.user?.company?.logo?.metaData.extension}`
        : null
      setOrgLogo(companyLogo);
      setPreviewLogo(companyLogo);
      setSBColor(data?.user?.company?.sideMenuColor);
      setSbPreviewColor(data?.user?.company?.sideMenuColor);
      setIconsPColor(data?.user?.company?.sideMenuIconPrimaryColor);
      setIconsSColor(data?.user?.company?.sideMenuIconSecondaryColor);
      setButtonPrimaryColor(data?.user?.company?.buttonPrimaryColor);
      setButtonSecondaryColor(data?.user?.company?.buttonSecondaryColor);

      return res.data;
    } catch (error: any) {
      console.error(error);
      return error.response.data;
    }
  };

  const initVerifcation = async (payload: any): Promise<any> => {
    return api.post(INIT_VERIFICATION, payload);
  };

  const changepassword = async (body: any): Promise<any> => {
    const { data, error } = await api.post(CHANGEPASSWORD, body);
    if (!error) {
      Notifications({
        title: "Success",
        description: "Password changed successfully",
        type: "success",
      });
      navigate(`/${ROUTES_CONSTANTS.LOGIN}`);
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
    initVerifcation,
  };
};

export default useCustomHook;
