import React from "react";
// import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
// import { peronalChatListState, personalChatMsgxState, chatIdState } from "../../store";
import api from "../../api";
import constants from "../../config/constants";
import { useRecoilState } from "recoil";
import { bankAccountListState, currentBalanceState } from "../../store/dashboard/delageteAgent";
import endpoints from "../../config/apiEndpoints";
import { Notifications } from "../../components";

// Chat operation and save into store
const useCustomHook = () => {
  // const [peronalChatList, setPeronalChatList] = useRecoilState(peronalChatListState);
  // const [chatId, setChatId] = useRecoilState(chatIdState);
  // const [personalChatMsgx, setPersonalChatMsgx] = useRecoilState(personalChatMsgxState);
  const [currentBalance, setCurrentBalance] = useRecoilState(currentBalanceState);
  const [bankList, setBankList] = useRecoilState<any>(bankAccountListState);

  const {
    GET_CURRENT_BALANCE,
    GET_BANK_ACCOUNT_LIST,
    LINK_BANK_ACCOUNT,
    UPDATE_BANK_ACCOUNT,
    GET_BANK_ACCOUNT_DETAIL,
    ADD_WITH_DRAWL_REQUEST,
  } = endpoints;

  const getData = async (type: string): Promise<any> => {
    const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  };
  const fetchBalance = () => {
    api.get(GET_CURRENT_BALANCE).then(({ data }) => setCurrentBalance(data?.currentBalance));
  };
  const fetchBankList = () => {
    api.get(GET_BANK_ACCOUNT_LIST).then(({ data }) => {
      if (data?.data?.length) setBankList(data?.data);
    });
  };
  const linkAccount = async (payload: any) => {
    return api.post(LINK_BANK_ACCOUNT, payload).then((response) => {
      if (response.error) {
        Notifications({
          title: "Error",
          description: response.message,
          type: "error",
        });
      }
      return response;
    });
  };
  const updateBankAccount = async (payload: any, bankId: string) => {
    return api.patch(`${UPDATE_BANK_ACCOUNT}/${bankId}`, payload).then((response) => {
      if (response.error) {
        Notifications({
          title: "Error",
          description: response.message || response.error,
          type: "error",
        });
      }
      return response;
    });
  };
  const addWithDrawl = async (payload: any) => {
    return api.post(ADD_WITH_DRAWL_REQUEST, payload).then((response) => {
      if (response.error) {
        Notifications({
          title: "Error",
          description: response.message || response.error,
          type: "error",
        });
      }
      return response;
    });
  };

  return {
    getData,
    currentBalance,
    fetchBalance,
    fetchBankList,
    bankList,
    linkAccount,
    addWithDrawl,
    updateBankAccount,
  };
};

export default useCustomHook;
