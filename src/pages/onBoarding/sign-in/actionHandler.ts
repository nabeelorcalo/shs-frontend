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
import constants, { ROUTES_CONSTANTS, personalizeColorTheme } from "../../../config/constants";
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

  const login = async (body: any, salesPath?: string): Promise<any> => {
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
      // set timer running false if user don't clockout 
      data?.user?.role === constants?.INTERN && localStorage.setItem("timer:running", "false");
      setCurrentUser(data.user);
      
      // set theme state on login
      const companyLogo = data?.user?.company?.logo
        ? {
            uid: data?.user?.company?.logo?.id,
            name: data?.user?.company?.logo?.filename,
            url: `${constants.MEDIA_URL}/${data?.user?.company?.logo?.mediaId}.${data?.user?.company?.logo?.metaData.extension}`,
          }
        : null;
        const previewLogo = data?.user?.company?.logo
        ? `${constants.MEDIA_URL}/${data?.user?.company?.logo?.mediaId}.${data?.user?.company?.logo?.metaData.extension}`
        : null;

        setOrgLogo(companyLogo ?? null);
        setPreviewLogo(previewLogo ?? null);
        setSBColor(data?.user?.company?.sideMenuColor ?? personalizeColorTheme.defaultSIdeBarColor);
        setSbPreviewColor(data?.user?.company?.sideMenuColor ?? personalizeColorTheme.defaultSIdeBarColor);
        setIconsPColor(data?.user?.company?.sideMenuIconPrimaryColor ?? personalizeColorTheme.defaultPrimIconColor);
        setIconsSColor(data?.user?.company?.sideMenuIconSecondaryColor ?? personalizeColorTheme.defaultSecIconColor);
        setButtonPrimaryColor(data?.user?.company?.buttonPrimaryColor ?? personalizeColorTheme.defaultBtnPrimColor);
        setButtonSecondaryColor(data?.user?.company?.buttonSecondaryColor ?? personalizeColorTheme.defaultBtnSecColor);

      console.log("salesPath", salesPath);


      // if (salesPath) {
      //   // window.location.href = `https://studenthelpsquad.co.uk/${salesPath}`
      //   window.location.href = `http://localhost:8080//${salesPath}`
      // }

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
