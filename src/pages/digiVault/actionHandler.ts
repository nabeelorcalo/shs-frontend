import React from "react";
// import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import { DigiVaultPasswordState, DigiVaultState } from "../../store";
import api from "../../api";
import { useRecoilState } from "recoil";
import endpoints from "../../config/apiEndpoints";

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_DIGIVAULT_DASHBOARD, POST_DIGIVAULT } = endpoints;
  const [studentVault, setStudentVault] = useRecoilState(DigiVaultState);
  const [newPassword, setNewPassword] = useRecoilState(DigiVaultPasswordState);

  const getDigiVaultDashboard = async () => {
    const { data } = await api.get(GET_DIGIVAULT_DASHBOARD,{password:newPassword});
    setStudentVault(data?.response);
  };
  const PostDigivalutData = async (values: any) => {
    const { data } = await api.post(POST_DIGIVAULT,values);
    setStudentVault(data)
  };
  
  return {
    getDigiVaultDashboard,
    studentVault,
    PostDigivalutData
  };
};

export default useCustomHook;