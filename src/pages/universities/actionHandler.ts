import jsPDF from "jspdf";
import React from "react";
import csv from '../../helpers/csv';
// import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
// import { peronalChatListState, personalChatMsgxState, chatIdState } from "../../store";
import api from "../../api";
import constants from "../../config/constants";
import apiEndPoints from "../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import { universitySystemAdminState } from "../../store";

// Chat operation and save into store
const useCustomHook = () => {
  const [subAdminUniversity, setSubAdminUniversity] = useRecoilState(universitySystemAdminState);

  const {UNIVERSITY_SUB_ADMIN_SYSTEM_ADMIN} = apiEndPoints;

  const getSubAdminUniversity= async () => {
    const { data } = await api.get(UNIVERSITY_SUB_ADMIN_SYSTEM_ADMIN);
    setSubAdminUniversity(data);
  };
  return {
    getSubAdminUniversity,
    subAdminUniversity
  };
};

export default useCustomHook;