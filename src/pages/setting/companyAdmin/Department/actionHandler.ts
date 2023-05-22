import React from "react";
import { useRecoilState } from "recoil";
import api from "../../../../api";
import apiEndpints from "../../../../config/apiEndpoints";
import { settingDepartmentState } from "../../../../store";
import { Notifications } from "../../../../components";

const useCustomHook = () => {
  const { SETTING_DAPARTMENT } = apiEndpints;
  const [settingDepartmentdata, setSettingDepartmentdata] = useRecoilState(settingDepartmentState);

  // get setting departments
  const getSettingDepartment = async (q: any): Promise<any> => {
    const param = { page: 1, limit: 10, q: q }
    const { data } = await api.get(SETTING_DAPARTMENT, param);
    setSettingDepartmentdata(data)
  };

  const deleteSettingDepartment = async (id: number) => {
    await api.delete(`${SETTING_DAPARTMENT}/${id}`);
    getSettingDepartment(null)
  };

  // post setting departments
  const postSettingDepartment = async (body: any) => {
    await api.post(SETTING_DAPARTMENT, body);
    getSettingDepartment(null)
  };

  // edit setting departments
  const patchSettingDepartment = async (values: any, id: any) => {
    const params = {
      name: values.departmentName,
      description: values.description
    }
    await api.patch(`${SETTING_DAPARTMENT}/${id}`, params);
    getSettingDepartment(null)
    Notifications({ title: 'Success', description: 'Department edited successfully', 'type': 'success' })
  };

  return {
    getSettingDepartment,
    deleteSettingDepartment,
    postSettingDepartment,
    patchSettingDepartment
  };
};

export default useCustomHook;
