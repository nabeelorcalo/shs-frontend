import React from "react";
// import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import { DigiVaultPasswordState, DigiVaultState } from "../../store";
import api from "../../api";
import { useRecoilState } from "recoil";
import endpoints from "../../config/apiEndpoints";
import { useLocation } from "react-router-dom";
import { Notifications } from "../../components";

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_DIGIVAULT_DASHBOARD, POST_DIGIVAULT_PASSWORD, POST_CREATE_FOLDER_FILE } = endpoints;
  const [studentVault, setStudentVault] = useRecoilState(DigiVaultState);
  const [newPassword, setNewPassword] = useRecoilState<any>(DigiVaultPasswordState);

  const getDigiVaultDashboard = async (checkEnabled: any) => {
    if (checkEnabled) {
      Notifications({ title: 'Error', description: 'Please set your vault password', type: 'error' })
    }
    else {
      const { data } = await api.get(GET_DIGIVAULT_DASHBOARD, { password: newPassword?.password });
      setStudentVault(data?.response);
    }
  };
  const postDigivaultPassword = async (values: any) => {
    const { password, isLock } = values;
    const postData = {
      isLock: isLock,
      password: password,
      autoLockAfter: '15'
    }
    const { data } = await api.post(POST_DIGIVAULT_PASSWORD, postData);
    setStudentVault(data)
    setNewPassword(data)
  };
  const postCreateFolderFile = async (values: any) => {
    const { folderName, root } = values;
    const folderData = {
      folderName: folderName,
      root: root,
      mode: 'folder'
    }
    const { data } = await api.post(POST_CREATE_FOLDER_FILE, folderData);
    setStudentVault(data)
  }

  return {
    getDigiVaultDashboard,
    studentVault,
    postDigivaultPassword,
    postCreateFolderFile
  };
};

export default useCustomHook;