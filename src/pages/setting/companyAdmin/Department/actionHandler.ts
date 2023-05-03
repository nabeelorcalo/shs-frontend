import React from "react";
import { useRecoilState } from "recoil";
import api from "../../../../api";
import apiEndpints from "../../../../config/apiEndpoints";
import { settingDepartmentState } from "../../../../store";

// Chat operation and save into store
const useCustomHook = () => {
  const { SETTING_DAPARTMENT } = apiEndpints;
  const [settingDepartmentdata, setSettingDepartmentdata] = useRecoilState(settingDepartmentState);
  const limit = 10

  const getSettingDepartment = async (page: any, q: any): Promise<any> => {
    const param = { page: page, limit: limit, q: q }
    const { data } = await api.get(SETTING_DAPARTMENT, param);
    setSettingDepartmentdata(data)
  };

  const deleteSettingDepartment = async (id: number): Promise<any> => {
    const { data } = await api.delete(`${SETTING_DAPARTMENT}/${id}`);
  };

  const postSettingDepartment = async (body: any): Promise<any> => {
    const { data } = await api.post(SETTING_DAPARTMENT, body);
  };

  return {
    getSettingDepartment,
    deleteSettingDepartment,
    postSettingDepartment,
  };
};

export default useCustomHook;
