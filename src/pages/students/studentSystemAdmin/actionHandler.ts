/// <reference path="../../../../jspdf.d.ts" />
import React from "react";
// import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
// import { peronalChatListState, personalChatMsgxState, chatIdState } from "../../store";

import jsPDF from "jspdf";
import "jspdf-autotable";
import api from "../../../api";
import csv from "../../../helpers/csv";
import constants from "../../../config/constants";
import { useRecoilState } from "recoil";
import { studentSystemAdminState } from "../../../store/studentSystemAdmin";
import apiEndPoints from "../../../config/apiEndpoints";

// Chat operation and save into store
const useCustomHook = () => {
  const [subAdminStudent, setSubAdminStudent] = useRecoilState(
    studentSystemAdminState
  );

  const { STUDENT_SYSTEM_ADMIN, FORGOTPASSWORD } = apiEndPoints;

  const getSubAdminStudent = async (param: any) => {
    const { data } = await api.get(STUDENT_SYSTEM_ADMIN, param);
    setSubAdminStudent(data);
  };

  const didParseCell = async (item: any) => {
    if (item.row.section === "head")
      item.cell.styles.fillColor = [230, 244, 249];
    else item.cell.styles.fillColor = false;
  };
  const didDrawCell = async (item: any) => {
    if (item.column.dataKey === 2 && item.section === "body") {
      const xPos = item.cell.x;
      const yPos = item.cell.y;
      var dim = 20;
    }
  };

  const downloadPdfOrCsv = (
    event: any,
    header: any,
    data: any,
    fileName: any,
    body: any
  ) => {
    if (event === "pdf" || event === "Pdf")
      pdf(`${fileName}`, header, data, body);
    else csv(`${fileName}`, header, data, false);
  };

  const pdf = (fileName: string, header: any, data: any, body: any) => {
    const title = fileName;
    const unit = "pt";
    const size = "A4";
    const orientation = "landscape";
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
        fontStyle: "normal",
        fontSize: 12,
      },
      didParseCell: didParseCell,
      didDrawCell: didDrawCell,
    });

    doc.save(`${fileName}.pdf`);
  };

  const forgotpassword = async (body: any): Promise<any> => {
    const { data } = await api.post(FORGOTPASSWORD, body);
    return data;
  };

  return {
    downloadPdfOrCsv,
    getSubAdminStudent,
    forgotpassword,
  };
};

export default useCustomHook;
