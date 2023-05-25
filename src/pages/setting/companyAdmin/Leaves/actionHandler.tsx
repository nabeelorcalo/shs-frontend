import { useRecoilState } from "recoil";
import api from "../../../../api";
import apiEndpints from "../../../../config/apiEndpoints";
import { settingLeaveState } from "../../../../store";
import { Notifications } from "../../../../components";

const useLeaveCustomHook = () => {
  const { GET_LEAVE_POLICY } = apiEndpints;
  const [settingLeaveData, setSettingLeaveData] = useRecoilState(settingLeaveState);

  // get setting departments
  const getSettingLeaves = async (search: any = null) => {
    const param = { page: 1, limit: 10, q: search }
    const { data } = await api.get(GET_LEAVE_POLICY, param);
    setSettingLeaveData(data)
  };

  // post setting departments
  const postSettingLeaves = async (values: any) => {
    console.log(values.applyForNewHire);
    const { policyName, description, carryforwardexpiration, applyToNewHires, intern, entitlement, carryforward, assignDate, accrualFrequency } = values;
    const params = {
      name: policyName,
      description: description,
      assignedDate: assignDate,
      accrualFrequency: accrualFrequency,
      entitlement: entitlement,
      maxCarryForward: carryforward,
      carryForwardExpiry: carryforwardexpiration,
      applyToNewHires: applyToNewHires,
      interns: []
    }
    await api.post(GET_LEAVE_POLICY, params);
    getSettingLeaves()
    Notifications({ title: "Success", description: 'Policy added', type: 'success' })
  };

  // post setting departments
  const editSettingLeaves = async (id: any, values: any) => {
    console.log(values);
    const { policyName, description, carryforwardexpiration, applyToNewHires, intern, entitlement, carryforward, assignDate, accrualFrequency } = values;
    const params = {
      name: policyName,
      description: description,
      assignedDate: assignDate,
      accrualFrequency: accrualFrequency,
      entitlement: entitlement,
      maxCarryForward: carryforward,
      carryForwardExpiry: carryforwardexpiration,
      applyToNewHires: applyToNewHires,
      interns: []
    }
    await api.patch(`${GET_LEAVE_POLICY}/${id}`, params);
    getSettingLeaves()
    Notifications({ title: "Success", description: 'Policy updated', type: 'success' })
  };

  // get setting departments
  const deleteSettingLeaves = async (id: any) => {
    await api.delete(`${GET_LEAVE_POLICY}/${id}`);
    getSettingLeaves()
    Notifications({ title: "Success", description: 'Policy deleted', type: 'success' })
  };

  return {
    settingLeaveData,
    getSettingLeaves,
    postSettingLeaves,
    deleteSettingLeaves,
    editSettingLeaves
  };
};

export default useLeaveCustomHook;
