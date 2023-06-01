import api from "../../../api";
import apiEndpints from "../../../config/apiEndpoints";

const useAgentProfileCustomHook = () => {
  const { AGENT_PROFILE, CHANGE_AGENT_PASSWORD } = apiEndpints;
  const agentProfileData = async (id: any, values: any) => {
    const { phoneNumber, gender } = values;
    const payload = {
      phoneNumber: phoneNumber,
      gender: gender,
    }
    const { data } = await api.patch(`${AGENT_PROFILE}?userId=${id}`, payload);
    return data;
  };
  const patchagentChangePassword = async (oldPassword: any, newPassword: any) => {
    const payload = {
      currentPassword: oldPassword,
      newPassword: newPassword
    }
    const { data } = await api.post(CHANGE_AGENT_PASSWORD, payload);
    return data;
  };
  return {
    agentProfileData,
    patchagentChangePassword

  };
};

export default useAgentProfileCustomHook;
