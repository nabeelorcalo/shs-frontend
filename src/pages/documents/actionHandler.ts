import React from "react";
// import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
// import { peronalChatListState, personalChatMsgxState, chatIdState } from "../../store";
import api from "../../api";
import constants from "../../config/constants";
import apiEndpoints from "../../config/apiEndpoints";

// Chat operation and save into store
const useCustomHook = () => {
  // const [peronalChatList, setPeronalChatList] = useRecoilState(peronalChatListState);
  // const [chatId, setChatId] = useRecoilState(chatIdState);
  // const [personalChatMsgx, setPersonalChatMsgx] = useRecoilState(personalChatMsgxState);

  const getData = async (type: string): Promise<any> => {
    const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  };

  const getInternList = async (): Promise<any> => {
    return api.get(apiEndpoints.INTERN_LIST);
  };

  const getInternDocumentList = async (payload: any): Promise<any> => {
    return api.get(apiEndpoints.DOCUMENTS_LIST, { ...payload });
  };

  return {
    getData,
    getInternList,
    getInternDocumentList
  };
};

export default useCustomHook;