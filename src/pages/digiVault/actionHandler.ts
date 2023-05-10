import React from "react";
// import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import { DigiVaultPasswordSate, DigiVaultState } from "../../store";
import api from "../../api";
import { useRecoilState } from "recoil";
import endpoints from "../../config/apiEndpoints";

// Chat operation and save into store
const useCustomHook = () => {
  const { STUDENT_DIGIVAULT, POST_DIGIVAULT } = endpoints;
  const [studentVault, setStudentVault] = useRecoilState(DigiVaultState);
  const [newPassword, setNewPassword] = useRecoilState(DigiVaultPasswordSate);
  // const [chatId, setChatId] = useRecoilState(chatIdState);
  // const [personalChatMsgx, setPersonalChatMsgx] = useRecoilState(personalChatMsgxState);

  const getDigiVaultDashboard = async () => {
    const { data } = await api.get(STUDENT_DIGIVAULT);
    setStudentVault(data?.response)
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