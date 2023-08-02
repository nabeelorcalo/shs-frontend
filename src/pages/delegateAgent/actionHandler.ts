import React from "react";
import api from "../../api";
import constants from "../../config/constants";
import { useRecoilState } from "recoil";
import { withDrawalRequestState } from "../../store/withDrawalRequest";
import apiEndPoints from "../../config/apiEndpoints";
import { Notifications } from "../../components";
import {
  addDelegateRewardState,
  getDelegateAdminState,
  getDelegateAgentsState,
  getRewardState,
  recieptState
} from "../../store";
import jsPDF from "jspdf";
import csv from "../../helpers/csv";

const useCustomHook = () => {
  const [withDrawalItem, setWithDrawalItems] = useRecoilState(
    withDrawalRequestState
  );
  const [getDelegate, setGetDelegate] = useRecoilState(getDelegateAdminState);
  const [getDelegateAgents, setGetDelegateAgents] = useRecoilState(getDelegateAgentsState);
  const [currentReward, setCurrentReward] = useRecoilState(addDelegateRewardState);
  const [rewardData, setRewardData] = useRecoilState(getRewardState);
  const [recieptData, setRecieptData] = useRecoilState(recieptState);

  const {
    WITH_DRAWAL_REQUEST,
    GET_DELEGATE_ADMIN_DASHBOARD,
    GET_DELEGATE_AGENTS_DASHBOARD,
    ADD_DELEGATE_REWARDS,
    GET_ALL_REWARD_DATA,
    FORGOTPASSWORD,
    DELEGATE_ACCESS,
    UPDATE_STATUS_WITHDRAWAL,
    PAYMENT_GATEWAY_BANKACCOUNT_DETAIL_USERID
  } = apiEndPoints;

  const limit = 100;
  
  const getWithDrawalRequestData = async (param: any) => {
    const { data } = await api.get(WITH_DRAWAL_REQUEST, param);
    setWithDrawalItems(data);
  };
  const getDelegateAdmin = async () => {
    const { data } = await api.get(GET_DELEGATE_ADMIN_DASHBOARD);
    setGetDelegate(data);
  };

  const getAgentDelegate = async (param:any) => {
    const { data } = await api.get(GET_DELEGATE_AGENTS_DASHBOARD, param);
    setGetDelegateAgents(data);
  };

  const addRewards = async (body: any): Promise<any> => {
    const { data } = await api.post(ADD_DELEGATE_REWARDS, body);
    if (!data.error) {
      setCurrentReward(data.user);
      Notifications({
        title: "Success",
        description: "Data Added",
        type: "success",
      });
    }
    return data;
  };

  const getAllRewards = async (page: any = 1) => {
    const param = { page: page, limit: limit };
    const { data } = await api.get(GET_ALL_REWARD_DATA, param);
    setRewardData(data);
  };

  const getRewardReciept = async (userId:any,bankId:any ) => {
    const { data } = await api.get(`${PAYMENT_GATEWAY_BANKACCOUNT_DETAIL_USERID}/${userId}?bankId=${bankId}`);
    setRecieptData(data);
  };

  const forgotpassword = async (body: any): Promise<any> => {
    const { data, error } = await api.post(FORGOTPASSWORD, body);
    if (!error) {
      Notifications({
        title: "Success",
        description:"Account resent link sent successfully",
        type: "success",
      });
    }
    return data;
  };

  const delegateAccess = async (id:any,values:any,onSuccess?:()=>void) => {
    const response = await api.patch(`${DELEGATE_ACCESS}/${parseInt(id)}`, values)
    if (onSuccess) onSuccess();
      return response;
  };
  const withDrawalAccess = async (id:any,values:any,onSuccess?:()=>void) => {
    const {response }= await api.patch(`${UPDATE_STATUS_WITHDRAWAL}/${parseInt(id)}`, values)
    if (onSuccess) onSuccess();
      return response;
  };

  const didParseCell = async (item: any) => {
    if (item.row.section === "head")
      item.cell.styles.fillColor = [230, 244, 249];
    else
      item.cell.styles.fillColor = false;
  }
  const didDrawCell = async (item: any) => {
    if (item.column.dataKey === 2 && item.section === "body") {
      const xPos = item.cell.x;
      const yPos = item.cell.y;
      var dim = 20;
    }
  }

  const downloadPdfOrCsv = (event: any, header: any, data: any, fileName: any, body: any) => {
    if (event === "pdf" || event === "Pdf")
      pdf(`${fileName}`, header, data, body);
    else
      csv(`${fileName}`, header, data, false);
  }

  const pdf = (fileName: string, header: any, data: any, body: any) => {
    const title = fileName;
    const unit = 'pt';
    const size = 'A4';
    const orientation = 'landscape';
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    doc.text(title, marginLeft, 40);
    doc.autoTable({
      head: [header],
      body: body,
      margin: { top: 50 },
      headStyles: {
        fillColor: [230, 244, 249],
        textColor: [20, 20, 42],
        fontStyle: 'normal',
        fontSize: 12,
      },
      didParseCell: didParseCell,
      didDrawCell: didDrawCell
    });

    doc.save(`${fileName}.pdf`);
  };
  return {
    getDelegateAdmin,
    getWithDrawalRequestData,
    getAgentDelegate,
    addRewards,
    getAllRewards,
    forgotpassword,
    delegateAccess,
    withDrawalAccess,
    downloadPdfOrCsv,
    getRewardReciept
  };
};

export default useCustomHook;
