import React, { useEffect } from "react";
import api from "../../api";
import constants, { ROUTES_CONSTANTS } from "../../config/constants";
import apiEndPoints from "../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import {
  addManagerDetailState,
  getManagerDetailState,
} from "../../store/managerCompanyAdmin";
import { useNavigate } from "react-router-dom";
import { Notifications } from "../../components";
import { settingDepartmentState } from "../../store";
import jsPDF from "jspdf";
import csv from "../../helpers/csv";

const useCustomHook = () => {
  const navigate = useNavigate();
  const [currentManager, setCurrentManager] = useRecoilState(
    addManagerDetailState
  );
  const [getCurentManager, setGetManager] = useRecoilState(
    getManagerDetailState
  );
  const [settingDepartmentdata, setSettingDepartmentdata] = useRecoilState(
    settingDepartmentState
  );
  const limit = 100;

  const {
    MANAGER_COMPANY_ADMIN,
    GET_MANAGER_COMPANY_ADMIN,
    SETTING_DAPARTMENT,
    GET_MANAGER_DETAIL_ID,
    UPDATE_MANAGER_PROFILE,
    FORGOTPASSWORD
  } = apiEndPoints;
  const addManagerCompany = async (body: any): Promise<any> => {
    const { data } = await api.post(MANAGER_COMPANY_ADMIN, body);
    if (!data.error) {
      setCurrentManager(data.user);
      Notifications({
        title: "Success",
        description: "Profile created",
        type: "success",
      });
      navigate(`/${ROUTES_CONSTANTS.MANAGERS}`);
    }
    return data;
  };

  const getManagerCompanyAdmin = async (param:any) => {
    const { data } = await api.get(GET_MANAGER_COMPANY_ADMIN,param);
    setGetManager(data);
  };
  const getManagerDetailId = async (id: any) => {
    const { data } = await api.get(GET_MANAGER_DETAIL_ID + "/" + id);
    return data;
  };

  const getSettingDepartment = async (page: any = 1, q: any): Promise<any> => {
    const param = { page: page, limit: limit, q: q };
    const { data } = await api.get(SETTING_DAPARTMENT, param);
    setSettingDepartmentdata(data);
  };

  const updateManagerProfile = async (managerId:any,values:any) => {
    const response = await api.put(`${UPDATE_MANAGER_PROFILE}/${parseInt(managerId)}`, values)
    if (!response.error) {
      Notifications({
        title: "Success",
        description: "User updated",
        type: "success",
      });
      navigate(`/${ROUTES_CONSTANTS.MANAGERS}`);
    }
      return response;
  };

  const forgotpassword = async (body: any): Promise<any> => {
    const { data } = await api.post(FORGOTPASSWORD, body);
    return data;
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
    addManagerCompany,
    getManagerCompanyAdmin,
    getSettingDepartment,
    getManagerDetailId,
    updateManagerProfile,
    forgotpassword,
    downloadPdfOrCsv
  };
};

export default useCustomHook;
