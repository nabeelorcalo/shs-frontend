/// <reference path="../../../jspdf.d.ts" />
import React, { useState } from "react";
// import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
// import { peronalChatListState, personalChatMsgxState, chatIdState } from "../../store";
import apiEndPoints from "../../config/apiEndpoints";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import api from "../../api";
import csv from '../../helpers/csv';
import { useRecoilState } from "recoil";
import { addAdminSystemAdminState, adminSystemAdminState } from "../../store";
import { Notifications } from "../../components";
import { Success } from '../../stories/NoData.stories';

const useCustomHook = () => {

  const [subAdminSuperAdmin, setSubAdminSuperAdmin] = useRecoilState(adminSystemAdminState);
  const [addSuperAdminSystemAdmin, setAddSuperAdminSystemAdmin] = useRecoilState(addAdminSystemAdminState);
  const [paginationObject, setPaginationObject] = useState<any>(null);
  const {
    SYS_SUB_ADMIN_SYSTEM_ADMIN,
    ADD_ADMIN_SUB_ADMIN_SYSTEM_ADMIN,
    FORGOTPASSWORD,
    BLOCK_PROPERTY_ACCESS,
    UNBLOCK_PROPERTY_ACCESS
  } = apiEndPoints;
  const limit = 100;

  const getSubAdminSUPERADMIN = async (param: any,tableParams: any, setTableParams: any) => {
    setSubAdminSuperAdmin([]);
    const newParam:any={}
    Object?.assign(newParam, param)
    const keys = Object?.keys(newParam)
    for (let key of keys) {
      if (!newParam[key])
        delete newParam[key]
    }
    const { data, pagination } = await api.get(SYS_SUB_ADMIN_SYSTEM_ADMIN, newParam);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: pagination?.totalResult,
        page: pagination?.page,
      },
    });
    setSubAdminSuperAdmin(data);
    setPaginationObject(pagination)
  };

  const addAdminSystemAdmin = async (body: any,email:any,onSuccess?: () => void): Promise<any> => {
    const { data } = await api.post(ADD_ADMIN_SUB_ADMIN_SYSTEM_ADMIN, body);
    if (!data.error) {
      setAddSuperAdminSystemAdmin(data.user);
      Notifications({
        title: "Success",
        description: "invitation link sent",
        type: "success",
      });
    }
    if (onSuccess) onSuccess();
    return data;
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
        description:"Account resent link sent successfully",
        type: "success",
      })

      Notifications({
        title: "Success",
        description: "invitation link sent",
        type: "success",
      });
    }
    return data;
  };

  return {
    getSubAdminSUPERADMIN,
    addAdminSystemAdmin,
    downloadPdfOrCsv,
    forgotpassword,
    adminAccess,
    paginationObject

  };
};

export default useCustomHook;