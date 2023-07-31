import React from "react";
import api from "../../api";
import constants from "../../config/constants";
import apiEndpints from "../../config/apiEndpoints";
import {
  allPaymentCardsState,
  currentUserState,
  getImmigrationState,
  getProfileImage,
  getStudentDocumentSate,
  studentProfileState,
  universityState,
} from "../../store";
import { useRecoilState, useRecoilValue } from "recoil";
import { Notifications } from "../../components";
import dayjs from "dayjs";

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
    ATTACHMENT_DELETE_STUDENT,
    ATTACHMENT_GET_STUDENT,
    SEARCH_COMPANY_HOUSE,
    UPDATE_COMPANY_PROFILE,
    UPDATE_COMPANY_PERSONAL,
  } = apiEndpints;
  const [studentProfile, setStudentProfile] =
    useRecoilState(studentProfileState);
  const [immigrationData, setImmigrationData] =
    useRecoilState(getImmigrationState);
  const [paymentData, setPaymentData] = useRecoilState(allPaymentCardsState);
  const [universityData, setUniversityData] = useRecoilState(universityState);
  const [internDocument, setInternDocument] = useRecoilState(
    getStudentDocumentSate
  );
  const [userImage, setUserImage] = useRecoilState(getProfileImage);
  const [userState, setUserState] = useRecoilState(currentUserState);
  const { id } = useRecoilValue(currentUserState);

  const updateStudentState = (data: any) => {
    const { dependents = [], DOB } = data.personalInfo;
    setStudentProfile({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        DOB: DOB ? dayjs(DOB) : null,
        dependents:
          dependents && dependents.length > 0
            ? dependents.map((i: any) => {
                return {
                  ...i,
                  DOB: dayjs(i.DOB),
                };
              })
            : [],
      },
    });
  };

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

  const getStudentProfile = async (uId: any = id) => {
    if (Object.keys(studentProfile).length == 0) {
      const { data } = await api.get(`${STUDENT_PROFILE}?userId=${uId}`);
      updateStudentState(data);
    }
    return studentProfile;
  };

  const updateStudentProfile = async (values: any, onSuccess?: () => void) => {
    const response = await api.patch(UPDATE_STUDENT_PROFILE, values);
    if (!response.error) {
      Notifications({
        title: "Success",
        description: "Update successfully",
        type: "success",
      });
    }
    if (onSuccess) onSuccess();
    updateStudentState(response.data);
    return response;
  };

  const immigrationStatus = async (body: any): Promise<any> => {
    const { data } = await api.post(
      STUDENT_IMMIGRATION_STATUS_WITHOUT_SHARECODE,
      { ...body, userId: id }
    );
    return data;
  };

  const updateCompanyProfile = async (values: any) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const response = await api.patch(UPDATE_COMPANY_PROFILE, values, config);
    if (!response.error) {
      Notifications({
        title: "Success",
        description: "Update successfully",
        type: "success",
      });
    }
    return response;
  };

  const updateCompanyPersonal = async (values: any, uId: any = id) => {
    const response = await api.patch(
      `${UPDATE_COMPANY_PERSONAL}?userId=${uId}`,
      values
    );
    if (!response.error) {
      Notifications({
        title: "Success",
        description: "Update successfully",
        type: "success",
      });
    }
    return response;
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
          description: "Card deleted successfully",
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

  const getStudentImage = async () => {
    const { data } = await api.get(ATTACHMENT_GET_STUDENT);
    setUserImage(data);
    return data;
  };

  const updateStudentImage = async (
    payload: any,
    atachmentId: any = null,
    onSuccess?: () => void
  ) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await api.post(
      `${ATTACHMENT_CREATE_STUDENT}`,
      payload,
      config
    );
    setUniversityData(data);
    setUserState({ ...userState, profileImage: data[0] });
    if (onSuccess) onSuccess();
    return data;
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

  const getCompanyList = async (text: any): Promise<any> => {
    console.log(text);
    return api.get(`${SEARCH_COMPANY_HOUSE}/${text}`);
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
    getStudentImage,
    getCompanyList,
    updateCompanyProfile,
    updateCompanyPersonal,
  };
};

export default useCustomHook;
