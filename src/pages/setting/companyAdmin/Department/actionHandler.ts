import { useRecoilState } from "recoil";
import api from "../../../../api";
import apiEndpints from "../../../../config/apiEndpoints";
import { settingDepartmentState } from "../../../../store";
import { Notifications } from "../../../../components";
import { useState } from "react";

const useDepartmentCustomHook = () => {
  const { DAPARTMENT } = apiEndpints;
  const [settingDepartmentdata, setSettingDepartmentdata] = useRecoilState(settingDepartmentState);
  const [loading, setLoading] = useState(false)

  // get setting departments
  const getSettingDepartment = async (q: any = null): Promise<any> => {
    setLoading(true)
    const param = { page: 1, limit: 10, q: q }
    const { data } = await api.get(DAPARTMENT, param);
    setSettingDepartmentdata(data)
    setLoading(false)
  };

  const deleteSettingDepartment = async (id: number) => {
    setLoading(true)
    await api.delete(`${DAPARTMENT}/${id}`);
    getSettingDepartment()
    setLoading(false)
    Notifications({ title: 'Success', description: 'Department deleted successfully', type: 'success' })
  };

  // post setting departments
  const postSettingDepartment = async (body: any) => {
    setLoading(true)
    await api.post(DAPARTMENT, body);
    getSettingDepartment()
    setLoading(false)
    Notifications({ title: 'Success', description: 'Department added successfully', type: 'success' })
  };

  // edit setting departments
  const patchSettingDepartment = async (values: any, id: any) => {
    setLoading(true)
    const params = {
      name: values.departmentName,
      description: values.description
    }
    await api.patch(`${DAPARTMENT}/${id}`, params);
    getSettingDepartment()
    setLoading(false)
    Notifications({ title: 'Success', description: 'Department edited successfully', type: 'success' })
  };

  return {
    loading,
    settingDepartmentdata,
    getSettingDepartment,
    deleteSettingDepartment,
    postSettingDepartment,
    patchSettingDepartment
  };
};

export default useDepartmentCustomHook;
