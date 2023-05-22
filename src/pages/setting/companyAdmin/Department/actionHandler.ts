import React from "react";
import { useRecoilState } from "recoil";
import api from "../../../../api";
import apiEndpints from "../../../../config/apiEndpoints";
import { settingDepartmentState } from "../../../../store";

// Chat operation and save into store
const useCustomHook = () => {
  const { SETTING_DAPARTMENT } = apiEndpints;
  const [settingDepartmentdata, setSettingDepartmentdata] = useRecoilState(settingDepartmentState); 

  const getSettingDepartment = async (page: any, q: any): Promise<any> => {
    const param = { page: page, limit: 10, q: q }
    const { data } = await api.get(SETTING_DAPARTMENT, param);
    setSettingDepartmentdata(data)
  };

  const deleteSettingDepartment = async (id: number) => {
    await api.delete(`${SETTING_DAPARTMENT}/${id}`);
    getSettingDepartment(null, null)
  };

  const postSettingDepartment = async (body: any): Promise<any> => {
    const { data } = await api.post(SETTING_DAPARTMENT, body);
  };

  const patchSettingDepartment = async (body: any): Promise<any> => {
    const { data } = await api.patch(SETTING_DAPARTMENT, body);
  };

  return {
    getSettingDepartment,
    deleteSettingDepartment,
    postSettingDepartment,
    patchSettingDepartment
  };
};

export default useCustomHook;
