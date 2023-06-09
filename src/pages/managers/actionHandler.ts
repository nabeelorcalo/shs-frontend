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
    UPDATE_MANAGER_PROFILE
  } = apiEndPoints;
  const addManagerCompany = async (body: any): Promise<any> => {
    const { data } = await api.post(MANAGER_COMPANY_ADMIN, body);
    if (!data.error) {
      setCurrentManager(data.user);
      Notifications({
        title: "Success",
        description: "Data Is Submit",
        type: "success",
      });
      navigate(`/${ROUTES_CONSTANTS.MANAGERS}`);
    }
    return data;
  };

  const getManagerCompanyAdmin = async (page: any) => {
    const param = { page: page, limit: limit };
    const { data } = await api.get(GET_MANAGER_COMPANY_ADMIN, param);
    setGetManager(data);
  };
  const getManagerDetailId = async (id: any) => {
    const { data } = await api.get(GET_MANAGER_DETAIL_ID + "/" + id);
    return data;
  };

  const getSettingDepartment = async (page: any, q: any): Promise<any> => {
    const param = { page: page, limit: limit, q: q };
    const { data } = await api.get(SETTING_DAPARTMENT, param);
    setSettingDepartmentdata(data);
  };

  const updateManagerProfile = async (managerId:any,values:any) => {
    const response =  await api.patch(`${UPDATE_MANAGER_PROFILE}'/'${managerId}`,values)
      return response;
  };

  return {
    addManagerCompany,
    getManagerCompanyAdmin,
    getSettingDepartment,
    getManagerDetailId,
    updateManagerProfile
  };
};

export default useCustomHook;
