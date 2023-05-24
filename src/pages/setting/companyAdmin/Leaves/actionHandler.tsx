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
    console.log(values);
    const { policyName, description, carryforwardexpiration, applyForNewHire, intern, entitlement, carryforward, assignDate, accrualFrequency } = values;
    const params = {
      name: policyName,
      description: description,
      assignedDate: assignDate,
      accrualFrequency: accrualFrequency,
      entitlement: entitlement,
      maxCarryForward: carryforward,
      carryForwardExpiry: carryforwardexpiration,
      applyToNewHires: applyForNewHire,
      interns: []
    }
    await api.post(GET_LEAVE_POLICY, params);
    getSettingLeaves()
    Notifications({ title: "Success", description: 'Leave Policy added successfully', type: 'success' })
  };

  return {
    settingLeaveData,
    getSettingLeaves,
    postSettingLeaves
  };
};

export default useLeaveCustomHook;
