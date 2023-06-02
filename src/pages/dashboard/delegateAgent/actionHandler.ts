import { useRecoilState } from "recoil";
import api from "../../../api";
import { Notifications } from "../../../components";
import { delegateAgenetMembersState, delegateAgentDashbaordState } from "../../../store";
import endpoints from "../../../config/apiEndpoints";

const useCustomHook = () => {
  const [delegateDashboardData, setDelegateDashboardData] = useRecoilState(delegateAgentDashbaordState);
  const [delegateMembers, setDelegateMembers] = useRecoilState(delegateAgenetMembersState);
  const { GET_DELEGATE_DASHBOARD, GET_DELEGATE_MEMBERS, SEND_REFERENCE_INVITE } = endpoints;
  const sendInvite = async (delegateLink: string, email: string) => {
    const { data } = await api.get(SEND_REFERENCE_INVITE, {
      referenceLink: delegateLink,
      email,
    });
    if (data.error) {
      Notifications({
        title: "Invitation Error",
        description: "Interview Schedule successfully",
      });
    }
    return data;
  };

  const fetchDelegateDashboardData = () => {
    api.get(GET_DELEGATE_DASHBOARD).then(({ data }) => setDelegateDashboardData(data));
    api.get(GET_DELEGATE_MEMBERS).then(({ data }) => setDelegateMembers(data));
  };
  return {
    delegateDashboardData,
    delegateMembers,
    sendInvite,
    fetchDelegateDashboardData,
  };
};

export default useCustomHook;
