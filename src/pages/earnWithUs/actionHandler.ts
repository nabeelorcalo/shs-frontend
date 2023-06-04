import api from '../../api';
import endpoints from "../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import { Notifications } from '../../components';
import constants from '../../config/constants';
import { 
  delegateMembersState,
  delegateDashboardState,
  currentBalanceState,
  banksListState
} from "../../store";


const useEarnWithUsHook = () => {
  const { 
    GET_DELEGAE_DASHBOARD,
    GET_DELEGAE_MEMBERS,
    SEND_REFERENCE_INVITE,
    GET_CURRENT_BALANCE,
    GET_BANK_ACCOUNT_LIST,
    LINK_BANK_ACCOUNT,
    UPDATE_BANK_ACCOUNT,
    GET_BANK_ACCOUNT_DETAIL,
    ADD_WITH_DRAWL_REQUEST,
  } = endpoints;
  const [delegateMembers, setDelegateMembers] = useRecoilState(delegateMembersState);
  const [delegateDashboard, setDelegateDashboard] = useRecoilState(delegateDashboardState);
  const [currentBalance, setCurrentBalance] = useRecoilState(currentBalanceState);
  const [banksList, setBanksList] = useRecoilState(banksListState);

  

  // GET DELEGATE DASHBOARD
  const getDelegateDashboard = async (setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true)
    const response = await api.get(GET_DELEGAE_DASHBOARD);
    setDelegateDashboard(response.data)
    setLoading(false)
  }

  // GET DELEGATE MEMBERS
  const getDelegateMembers = async (params:any, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true)
    const response = await api.get(GET_DELEGAE_MEMBERS, params);
    setDelegateMembers(response.data)
    setLoading(false)
  }

  // SEND REFERENCE INVITE
  const sendReferenceInvite = async (params:any) => {
    const response = await api.get(SEND_REFERENCE_INVITE, params);
    return response
  }

  // GET CURRENT BALANCE
  const getCurrentBalance = () => {
    api.get(GET_CURRENT_BALANCE).then(({ data }) => setCurrentBalance(data?.currentBalance));
  };

  // GET BANK BANKS LIST
  const getBanksList = () => {
    api.get(GET_BANK_ACCOUNT_LIST).then(({ data }) => {
      if (data?.data?.length) setBanksList(data?.data);
    });
  };
  const linkAccount = async (payload: any) => {
    return api.post(LINK_BANK_ACCOUNT, payload).then((response) => {
      if (response.error) {
        Notifications({
          title: "Error",
          description: response.message,
          type: "error",
        });
      }
      return response;
    });
  };
  const updateBankAccount = async (payload: any, bankId: string) => {
    return api.patch(`${UPDATE_BANK_ACCOUNT}/${bankId}`, payload).then((response) => {
      if (response.error) {
        Notifications({
          title: "Error",
          description: response.message || response.error,
          type: "error",
        });
      }
      return response;
    });
  };
  const addWithDrawl = async (payload: any) => {
    return api.post(ADD_WITH_DRAWL_REQUEST, payload).then((response) => {
      if (response.error) {
        Notifications({
          title: "Error",
          description: response.message || response.error,
          type: "error",
        });
      }
      return response;
    });
  };

  return {
    getDelegateDashboard,
    getDelegateMembers,
    sendReferenceInvite,
    getCurrentBalance,
    currentBalance,
    getBanksList,
    banksList
    
  };
};

export default useEarnWithUsHook;