import React from "react";
import api from "../../api";
import constants from "../../config/constants";
import apiEndpints from "../../config/apiEndpoints";
import {
  allPaymentCardsState,
  currentUserState,
  getImmigrationState,
  getStudentDocumentSate,
  studentProfileState,
  universityState,
} from "../../store";
import { useRecoilState, useRecoilValue } from "recoil";
import { Notifications } from "../../components";

const useCustomHook = () => {
  const {
    PROFILE_CHANGE_PASSWORD,
    STUDENT_PROFILE,
    UPDATE_STUDENT_PROFILE,
    STUDENT_IMMIGRATION_STATUS_WITHOUT_SHARECODE,
    GET_IMMIGRATION_STATUS_WITHOUT_SHARECODE,
    CREATE_PAYMENT_CARD,
    GET_PAYMENT_CARDS,
    DELETE_PAYMENT_CARD,
    STUDENT_INTERN_DOCUMENT,
    ATTACHMENT_CREATE_STUDENT,
    ATTACHMENT_UPDATE_STUDENT,
    ATTACHMENT_DELETE_STUDENT,
  } = apiEndpints;
  const [studentProfile, setStudentProfile] = useRecoilState(studentProfileState);
  const [immigrationData, setImmigrationData] = useRecoilState(getImmigrationState);
  const [paymentData, setPaymentData] = useRecoilState(allPaymentCardsState);
  const [universityData, setUniversityData] = useRecoilState(universityState);
  const [internDocument, setInternDocument] = useRecoilState(getStudentDocumentSate);
  const [userState, setUserState] = useRecoilState(currentUserState);
  const { id } = useRecoilValue(currentUserState);

  const profilechangepassword = async (body: any): Promise<any> => {
    const { data } = await api.post(PROFILE_CHANGE_PASSWORD, body);
    if (!data.error) {
      Notifications({
        title: "Success",
        description: "Password changed success",
        type: "success",
      });
    }
    return data;
  };

  const getStudentProfile = async () => {
    const { data } = await api.get(`${STUDENT_PROFILE}?userId=${id}`);
    setStudentProfile(data);
    return data;
  };

  const updateStudentProfile = async (values: any) => {
    const response = await api.patch(UPDATE_STUDENT_PROFILE, values);
    if (!response.error) {
      Notifications({
        title: "Success",
        description: "Update successfully",
        type: "success",
      });
    }
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

  const addPaymentCard = async (reqBody: any, onSuccess?: () => void) => {
    const response = await api.post(CREATE_PAYMENT_CARD, reqBody);
    if (!response.error) {
      Notifications({
        title: "Success",
        description: "Card added successfully",
        type: "success",
      });
    }
    if (onSuccess) onSuccess();
    return response;
  };

  const getPaymentCardList = async () => {
    const { data } = await api.get(GET_PAYMENT_CARDS);
    setPaymentData(data);
    return data;
  };

  const deletePaymentCard = (cardId: string, onSuccess?: () => void) => {
    api.delete(`${DELETE_PAYMENT_CARD}/${cardId}`).then((result) => {
      if (!result.error) {
        Notifications({
          title: "Delete",
          description: "Card Delete successfully",
          type: "success",
        });
      }
      if (onSuccess) onSuccess();
      return result;
    });
  };

  const addInternDocument = async (reqBody: any) => {
    const response = await api.post(STUDENT_INTERN_DOCUMENT, reqBody, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (!response.error) {
      Notifications({
        title: "Success",
        description: "Documents added successfully",
        type: "success",
      });
    }
    return response;
  };

  const getInternDocument = async (payload: any) => {
    const { data } = await api.get(STUDENT_INTERN_DOCUMENT, payload);
    setInternDocument(data);
    return data;
  };

  const updateStudentImage = async (payload: any, atachmentId: any = null) => {
    if (atachmentId) {
      const { data } = await api.put(
        `${ATTACHMENT_UPDATE_STUDENT}/${atachmentId}`,
        payload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setUniversityData(data);
      setUserState({ ...userState, profileImage: data[1][0] });
      return data;
    } else {
      const { data } = await api.post(`${ATTACHMENT_CREATE_STUDENT}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUniversityData(data);
      setUserState({ ...userState, profileImage: data[0] });
      return data;
    }
  };
  const deleteUserImage = (attachmentId: string, onSuccess?: () => void) => {
    api
      .delete(`${ATTACHMENT_DELETE_STUDENT}/${attachmentId}`)
      .then((result) => {
        if (onSuccess) onSuccess();
        setUserState({ ...userState, profileImage: null });
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
    deletePaymentCard,
    addInternDocument,
    getInternDocument,
    updateStudentImage,
    deleteUserImage,
  };
};

export default useCustomHook;
