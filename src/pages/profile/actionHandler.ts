import React from "react";
import api from "../../api";
import constants from "../../config/constants";
import apiEndpints from "../../config/apiEndpoints";
import {
  allPaymentCardsState,
  currentUserState,
  getImmigrationState,
  studentProfileState,
} from "../../store";
import { useRecoilState, useRecoilValue } from "recoil";

const useCustomHook = () => {
  const {
    PROFILE_CHANGE_PASSWORD,
    STUDENT_PROFILE,
    UPDATE_STUDENT_PROFILE,
    STUDENT_IMMIGRATION_STATUS_WITHOUT_SHARECODE,
    GET_IMMIGRATION_STATUS_WITHOUT_SHARECODE,
    CREATE_PAYMENT_CARD,
    GET_PAYMENT_CARDS,
    DELETE_PAYMENT_CARD
  } = apiEndpints;
  const [studentProfile, setStudentProfile] =useRecoilState(studentProfileState);
  const [immigrationData, setImmigrationData] =useRecoilState(getImmigrationState);
  const [paymentData, setPaymentData] =useRecoilState(allPaymentCardsState);
  const { id } = useRecoilValue(currentUserState);

  const profilechangepassword = async (body: any): Promise<any> => {
    const { data } = await api.post(PROFILE_CHANGE_PASSWORD, body);
    return data;
  };

  const getStudentProfile = async () => {
    const { data } = await api.get(`${STUDENT_PROFILE}?userId=${id}`);
    setStudentProfile(data);
    return data;
  };

  const updateStudentProfile = async (values: any) => {
    const response = await api.patch(UPDATE_STUDENT_PROFILE, values);
    return response;
  };

  const immigrationStatus = async (body: any): Promise<any> => {
    const { data } = await api.post(
      STUDENT_IMMIGRATION_STATUS_WITHOUT_SHARECODE,
      { ...body, userId: id }
    );
    return data;
  };

  const getImmigrationStatus = async () => {
    const { data } = await api.get(GET_IMMIGRATION_STATUS_WITHOUT_SHARECODE);
    setImmigrationData(data);
    return data;
  };

  const addPaymentCard = async (reqBody:any) => {
    const response = await api.post(CREATE_PAYMENT_CARD, reqBody)
    return response;
  }

  const getPaymentCardList = async () => {
    const { data } = await api.get(GET_PAYMENT_CARDS);
    setPaymentData(data);
    return data;
  };

  const deletePaymentCard = (cardId: string,onSuccess?: () => void) => {
    api.delete(`${DELETE_PAYMENT_CARD}/${cardId}`).then((result) => {
      if (onSuccess) onSuccess();
      return result;
    });
  };

  return {
    profilechangepassword,
    getStudentProfile,
    updateStudentProfile,
    immigrationStatus,
    getImmigrationStatus,
    addPaymentCard,
    getPaymentCardList,
    deletePaymentCard
  };
};

export default useCustomHook;
