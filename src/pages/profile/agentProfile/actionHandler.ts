import api from "../../../api";
import { Notifications } from "../../../components";
import apiEndpints from "../../../config/apiEndpoints";

const useAgentProfileCustomHook = () => {
  const { AGENT_PROFILE, CHANGE_AGENT_PASSWORD } = apiEndpints;

  const agentProfileData = async (id: any, values: any) => {
    const { data } = await api.patch(`${AGENT_PROFILE}?userId=${id}`, values);
    if (!data.error) {
      Notifications({
        title: "Success",
        description: "Profile updated successfully",
        type: "success",
      });
    }
    return data;
  };

  // const patchagentChangePassword = async (oldPassword: any, newPassword: any) => {
  //   const payload = {
  //     currentPassword: oldPassword,
  //     newPassword: newPassword
  //   }
  //   const { data } = await api.post(CHANGE_AGENT_PASSWORD, payload);
  //   return data;
  // };
  const patchagentChangePassword = async (body: any): Promise<any> => {
    const params = {
      currentPassword: body.oldPassword,
      newPassword: body.newPassword
    }
    const { data, error } = await api.post(CHANGE_AGENT_PASSWORD, params);
    if (!error) {
      Notifications({
        title: "Success",
        description: "Password changed successfully",
        type: "success",
      });
    }
    return data;
  }
  return {
    agentProfileData,
    patchagentChangePassword

  };
};

export default useAgentProfileCustomHook;
