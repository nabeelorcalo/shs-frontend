import { useState } from 'react'
import api from '../../api';
import endpoints from "../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import { 
  delegateMembersState,
  delegateDashboardState,
  earnWithUsCurrentBalanceState,
  banksListState,
  withdrawalRequestsState
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
    WITH_DRAWAL_REQUEST
  } = endpoints;
  const [delegateMembers, setDelegateMembers] = useRecoilState(delegateMembersState);
  const [delegateDashboard, setDelegateDashboard] = useRecoilState(delegateDashboardState);
  const [currentBalance, setCurrentBalance]:any = useRecoilState(earnWithUsCurrentBalanceState);
  const [banksList, setBanksList] = useRecoilState(banksListState);
  const [withdrawalRequests, setWithdrawalRequests] = useRecoilState(withdrawalRequestsState);
  const [totalRequests, setTotalRequests] = useState(0);

  

  // GET DELEGATE DASHBOARD
  const getDelegateDashboard = async (setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true)
    try {
      const response = await api.get(GET_DELEGAE_DASHBOARD);
      setDelegateDashboard(response.data)
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }

  // GET DELEGATE MEMBERS
  const getDelegateMembers = async (params:any, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true)
    try {
      const response = await api.get(GET_DELEGAE_MEMBERS, params);
      setDelegateMembers(response.data)
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
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
  const getBanksList = async (setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true)
    try {
      const {data} = await api.get(GET_BANK_ACCOUNT_LIST);
      if (data?.data?.length) {
        setBanksList(data?.data)
      }
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  };

  // ADD BANK ACCOUNT
  const linkAccount = async (payload: any) => {
    const response =  await api.post(LINK_BANK_ACCOUNT, payload);
    return response;
  };

  // ADD BANK ACCOUNT
  const updateBankAccount = async (payload: any, bankId: string) => {
    const response =  await api.patch(`${UPDATE_BANK_ACCOUNT}/${bankId}`, payload)
      return response;
  };

  // CREATE WITHDRAWAL
  const createWithdrawal = async (payload: any) => {
    const response = await api.post(ADD_WITH_DRAWL_REQUEST, payload)
    return response;
  };

  // GET WITHDRAWAL REQUESTS
  const getWithdrawalRequests = async (payload: any, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true)
    try {
      const response = await api.get(WITH_DRAWAL_REQUEST, payload);
      setWithdrawalRequests(response.data);
      setTotalRequests(response.count);
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }

  return {
    getDelegateDashboard,
    getDelegateMembers,
    sendReferenceInvite,
    getCurrentBalance,
    currentBalance,
    getBanksList,
    banksList,
    linkAccount,
    updateBankAccount,
    createWithdrawal,
    getWithdrawalRequests,
    withdrawalRequests,
    totalRequests
  };
};

export default useEarnWithUsHook;