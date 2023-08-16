import React from 'react';
import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';
import {
  IconPColorState,
  IconSColorState,
  currentUserState,
  newPasswordUser,
  pColorState,
  sColorState,
  sbColorState,
} from '../../../store';
import api from '../../../api';
import constants, { ROUTES_CONSTANTS } from '../../../config/constants';
import apiEndpints from '../../../config/apiEndpoints';
import { Notifications } from '../../../components';
import { useNavigate } from 'react-router-dom';

// Auth operation and save into store
const useCustomHook = () => {
  const navigate = useNavigate();
  const { LOGIN, CHANGEPASSWORD, FORGOTPASSWORD } = apiEndpints;
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [newPassData, setNewPassData] = useRecoilState(newPasswordUser);
  // theme
  const [pColor, setPColor] = useRecoilState<any>(pColorState);
  const [sColor, setSColor] = useRecoilState<any>(sColorState);
  const [sbColor, setSBColor] = useRecoilState<any>(sbColorState);
  const setIconsPColor = useSetRecoilState(IconPColorState);
  const setIconsSColor = useSetRecoilState(IconSColorState);

  const login = async (body: any): Promise<any> => {
    const { data } = await api.post(LOGIN, body);

    if(data.challengeName == 'NEW_PASSWORD_REQUIRED') {
      setNewPassData(data)
      return data
    }

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('cognitoId', data?.user?.cognitoId);
    setCurrentUser(data.user);

    // set theme state on login
    setPColor(data?.user?.company?.buttonPrimaryColor);
    setSColor(data?.user?.company?.buttonSecondaryColor);
    setSBColor(data?.user?.company?.sideMenuColor);
    setIconsPColor(data?.user?.company?.sideMenuIconPrimaryColor);
    setIconsSColor(data?.user?.company?.sideMenuIconSecondaryColor);

    return data;
  };

  const changepassword = async (body: any): Promise<any> => {
    const { data, error} = await api.post(CHANGEPASSWORD, body);
    if (!error) {
      Notifications({
        title: 'Success',
        description: 'Password changed successfully',
        type: 'success',
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
  };
};

export default useCustomHook;
