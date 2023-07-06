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

  const getManagersList = async (): Promise<any> => {
    return api.get(apiEndpoints.GET_COMPANY_MANAGERS_LIST);
  };

  const getInternDocumentList = async (payload: any): Promise<any> => {
    return api.get(apiEndpoints.DOCUMENTS_LIST, { ...payload });
  };

  const internDocumentCreate = async (payload: any): Promise<any> => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    return api.post(apiEndpoints.DOCUMENTS_LIST, payload, config);
  };

  const starOrHideDocument = async ({ id, action }: any): Promise<any> => {
    return api.get(apiEndpoints.DOCUMENTS_LIST + `/${id}`, { action });
  };

  const deleteDocument = async ({ id }: any): Promise<any> => {
    return api.delete(apiEndpoints.DOCUMENTS_LIST + `/${id}`);
  };

  return {
    getData,
    getInternList,
    getInternDocumentList,
    internDocumentCreate,
    getManagersList,
    starOrHideDocument,
    deleteDocument,
  };
};

export default useCustomHook;
