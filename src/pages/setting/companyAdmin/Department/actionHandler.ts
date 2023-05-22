import React from "react";
import { useRecoilState } from "recoil";
import api from "../../../../api";
import apiEndpints from "../../../../config/apiEndpoints";
import { settingDepartmentState } from "../../../../store";

const useCustomHook = () => {
  const { SETTING_DAPARTMENT } = apiEndpints;
  const [settingDepartmentdata, setSettingDepartmentdata] = useRecoilState(settingDepartmentState);

  // get setting departments
  const getSettingDepartment = async (page: any, q: any): Promise<any> => {
    const param = { page: page, limit: 100, q: q }
    const { data } = await api.get(SETTING_DAPARTMENT, param);
    setSettingDepartmentdata(data)
  };

  // delete setting departments
  const deleteSettingDepartment = async (id: number) => {
    await api.delete(`${SETTING_DAPARTMENT}/${id}`);
    getSettingDepartment(null, null)
  };

  // post setting departments
  const postSettingDepartment = async (body: any) => {
    await api.post(SETTING_DAPARTMENT, body);
    getSettingDepartment(null, null)
  };

  // edit setting departments
  const patchSettingDepartment = async (body: any) => {
    console.log(body);
    await api.patch(SETTING_DAPARTMENT, body);
    getSettingDepartment(null, null)
  };

  return {
    getSettingDepartment,
    deleteSettingDepartment,
    postSettingDepartment,
    patchSettingDepartment
  };
};

export default useCustomHook;
