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
import { Notifications } from "../../components";

// Chat operation and save into store
const useCustomHook = () => {
  const [subAdminUniversity, setSubAdminUniversity] = useRecoilState(universitySystemAdminState);

  const {
    UNIVERSITY_SUB_ADMIN_SYSTEM_ADMIN,
    FORGOTPASSWORD,
    BLOCK_PROPERTY_ACCESS,
    UNBLOCK_PROPERTY_ACCESS
  } = apiEndPoints;

  const getSubAdminUniversity= async (param:any) => {
    const { data } = await api.get(UNIVERSITY_SUB_ADMIN_SYSTEM_ADMIN, param);
    setSubAdminUniversity(data);
  };

  const adminAccess = async ( values: any, onSuccess?: () => void) => {
    const url  = `${values?.access === "block"? BLOCK_PROPERTY_ACCESS : UNBLOCK_PROPERTY_ACCESS}?email=${values.email}`
    const response = await api.patch(url);
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

  const forgotpassword = async (body: any): Promise<any> => {
    const { data, error } = await api.post(FORGOTPASSWORD, body);
    if (!error) {
      Notifications({
        title: "Success",
        description:"Pasword resent link sent successfully",
        type: "success",
      });
    }
    return data;
  };

  return {
    getSubAdminUniversity,
    subAdminUniversity,
    downloadPdfOrCsv,
    forgotpassword,
    adminAccess
  };
};

export default useCustomHook;