import React from "react";
// import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
// import { peronalChatListState, personalChatMsgxState, chatIdState } from "../../store";
import api from "../../api";
import apiEndpints from "../../config/apiEndpoints";
import constants from "../../config/constants";
import { lifeAssessmentState } from "../../store";
import { useRecoilState } from "recoil";

// Chat operation and save into store
const useCustomHook = () => {
  // const [peronalChatList, setPeronalChatList] = useRecoilState(peronalChatListState);
  // const [chatId, setChatId] = useRecoilState(chatIdState);
  // const [personalChatMsgx, setPersonalChatMsgx] = useRecoilState(personalChatMsgxState);
  const [lifeAssessment, setLifeAssessment] = useRecoilState(lifeAssessmentState);
  const { DREAMUP } = apiEndpints
  const getData = async (type: string): Promise<any> => {
    const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  };

  const getLifeAssessment = async (val?: string) => {
    const hasValue = {month: val?.toLowerCase() || 'march'} ?? {};
    const { data } = await api.get(DREAMUP.LIFE_ASSESSMENT, hasValue);
    setLifeAssessment(data);    
  };

  const postLifeAssessment = async (assessment: any) => {
    console.log('assessment',assessment);
    const { data } = await api.post(DREAMUP.UPDATE_LIFE_ASSESSMENT, assessment);
    getLifeAssessment(assessment.month)
    setLifeAssessment(data);
  };

  return {
    getData,
    postLifeAssessment,
    lifeAssessment,
  };
};

export default useCustomHook;