import { useRecoilState } from "recoil";
import api from "../../../../api";
import apiEndpints from "../../../../config/apiEndpoints";
import { settingDepartmentState } from "../../../../store";
import { Notifications } from "../../../../components";

const useDepartmentCustomHook = () => {
  const { DAPARTMENT } = apiEndpints;
  const [settingDepartmentdata, setSettingDepartmentdata] = useRecoilState(settingDepartmentState);

  // get setting departments
  const getSettingDepartment = async (q: any = null): Promise<any> => {
    const param = { page: 1, limit: 10, q: q }
    const { data } = await api.get(DAPARTMENT, param);
    setSettingDepartmentdata(data)
  };

  const deleteSettingDepartment = async (id: number) => {
    await api.delete(`${DAPARTMENT}/${id}`);
    getSettingDepartment()
    Notifications({ title: 'Success', description: 'Department deleted successfully', type: 'success' })
  };

  // post setting departments
  const postSettingDepartment = async (body: any) => {
    await api.post(DAPARTMENT, body);
    getSettingDepartment()
    Notifications({ title: 'Success', description: 'Department added successfully', type: 'success' })
  };

  // edit setting departments
  const patchSettingDepartment = async (values: any, id: any) => {
    const params = {
      name: values.departmentName,
      description: values.description
    }
    await api.patch(`${DAPARTMENT}/${id}`, params);
    getSettingDepartment()
    Notifications({ title: 'Success', description: 'Department edited successfully', type: 'success' })
  };

  return {
    settingDepartmentdata,
    getSettingDepartment,
    deleteSettingDepartment,
    postSettingDepartment,
    patchSettingDepartment
  };
};

export default useDepartmentCustomHook;
