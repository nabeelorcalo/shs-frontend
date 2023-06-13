import React from "react";
// import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
// import { peronalChatListState, personalChatMsgxState, chatIdState } from "../../store";
import api from "../../api";
import endpoints from "../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import { structureState } from "../../store";

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_STRUCTURE_HEIRARACHY } = endpoints;
  const [structureData, setStructureData] = useRecoilState(structureState);
  // const [chatId, setChatId] = useRecoilState(chatIdState);
  // const [personalChatMsgx, setPersonalChatMsgx] = useRecoilState(personalChatMsgxState);

  const getStructureData = async () => {
    const { data } = await api.get(GET_STRUCTURE_HEIRARACHY);
    setStructureData(data)
  };

  return {
    getStructureData,
    structureData,
    setStructureData
  };
};

export default useCustomHook;