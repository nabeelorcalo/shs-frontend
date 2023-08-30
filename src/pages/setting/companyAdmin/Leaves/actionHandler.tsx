import { useRecoilState } from "recoil";
import api from "../../../../api";
import apiEndpints from "../../../../config/apiEndpoints";
import { settingInternsState, settingLeaveState } from "../../../../store";
import { Notifications } from "../../../../components";
import { useState } from "react";

const useLeaveCustomHook = () => {
  const { GET_LEAVE_POLICY, GET_LEAVES_POLICY } = apiEndpints;
  const [settingLeaveData, setSettingLeaveData] = useRecoilState(settingLeaveState);
  const [internsData, setInternsData] = useRecoilState(settingInternsState);
  const [loading, setLoading] = useState(false)

  // get setting departments
  const getSettingLeaves = async (search: any = null) => {
    setLoading(true)
    const param = { page: 1, limit: 10, q: search }
    const { data } = await api.get(GET_LEAVE_POLICY, param);
    setSettingLeaveData(data)
    setLoading(false)
  };

  // post setting departments
  const postSettingLeaves = async (values: any) => {
    setLoading(true)
    const { policyName, description, carryforwardexpiration, applyToNewHires, intern, entitlement, carryforward, assignDate, accrualFrequency } = values;
    console.log(values)
    const params = {
      name: policyName,
      description: description,
      assignedDate: assignDate,
      accrualFrequency: accrualFrequency,
      entitlement: entitlement,
      maxCarryForward: carryforward,
      carryForwardExpiry: carryforwardexpiration,
      applyToNewHires: applyToNewHires,
      interns: intern
    }
    await api.post(GET_LEAVE_POLICY, params);
    getSettingLeaves()
    setLoading(false)
    Notifications({ title: "Success", description: 'Policy added', type: 'success' })
  };

  // edit setting departments
  const editSettingLeaves = async (id: any, values: any) => {
    setLoading(true)
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
      interns: intern
    }
    await api.patch(`${GET_LEAVE_POLICY}/${id}`, params);
    getSettingLeaves()
    setLoading(false)
    Notifications({ title: "Success", description: 'Policy updated', type: 'success' })
  };

  // delete setting departments
  const deleteSettingLeaves = async (id: any) => {
    setLoading(true)
    await api.delete(`${GET_LEAVE_POLICY}/${id}`);
    getSettingLeaves()
    setLoading(false)
    Notifications({ title: "Success", description: 'Policy deleted', type: 'success' })
  };

  const getAllInterns = async () => {
    const { data } = await api.get(GET_LEAVES_POLICY);
    setInternsData(data)
  };

  return {
    loading,
    settingLeaveData,
    internsData,
    getSettingLeaves,
    getAllInterns,
    postSettingLeaves,
    deleteSettingLeaves,
    editSettingLeaves
  };
};

export default useLeaveCustomHook;
