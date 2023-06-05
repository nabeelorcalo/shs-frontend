import React, { useState } from "react";
// import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
// import { peronalChatListState, personalChatMsgxState, chatIdState } from "../../store";
import api from "../../api";
import constants from "../../config/constants";
import endpoints from "../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import { delegateAgenetMembersState } from "../../store";

// Chat operation and save into store
const useCustomHook = () => {
  // const [peronalChatList, setPeronalChatList] = useRecoilState(peronalChatListState);
  // const [chatId, setChatId] = useRecoilState(chatIdState);
  // const [personalChatMsgx, setPersonalChatMsgx] = useRecoilState(personalChatMsgxState);
  const [membersData, setMembersData] = useRecoilState(delegateAgenetMembersState);
  const [totalCount, setTotalCount] = useState(0);
  const { GET_DELEGATE_MEMBERS } = endpoints;
  const getData = async (type: string): Promise<any> => {
    const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  };
  const getMembers = async (params: any) => {
    api.get(GET_DELEGATE_MEMBERS, params).then((result) => {
      setMembersData(result.data);
      setTotalCount(result.count);
    });
  };

  return {
    getData,
    getMembers,
    membersData,
    totalCount,
  };
};

export default useCustomHook;
