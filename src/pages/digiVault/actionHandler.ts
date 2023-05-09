import React from "react";
// import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import { DigiVaultState } from "../../store";
import api from "../../api";
// import constants from "../../config/constants";
import { useRecoilState } from "recoil";
import endpoints from "../../config/apiEndpoints";

// Chat operation and save into store
const useCustomHook = () => {
  const { STUDENT_DIGIVAULT } = endpoints;
  const [studentVault, setStudentVault] = useRecoilState(DigiVaultState);
  // const [chatId, setChatId] = useRecoilState(chatIdState);
  // const [personalChatMsgx, setPersonalChatMsgx] = useRecoilState(personalChatMsgxState);

  const getData = async () => {
    const { data } = await api.get(STUDENT_DIGIVAULT);
    setStudentVault(data?.response)
  };


  return {
    getData, studentVault
  };
};

export default useCustomHook;