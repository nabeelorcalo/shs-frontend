import { log } from 'console';
import { useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { contractsListData, contractsDashboard, contractDetailsState } from "../../store";
import endpoints from "../../config/apiEndpoints";
import { Notifications } from "../../components";
import api from "../../api";
import dayjs from "dayjs";

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_CONTRACT_LIST, DEL_CONTRACT, CONTRACT_DASHBOARD, CONTRACT_DETAILS, EDIT_CONTRACT } = endpoints;
  const [contractDashboard, setContractDashboard] = useRecoilState(contractsDashboard);
  const [contractList, setContractList] = useRecoilState(contractsListData);
  const [contractDetails, setContractDetails] = useRecoilState(contractDetailsState)
  const [loading, setLoading] = useState(false);
  const todayDate = dayjs(new Date()).format("YYYY-MM-DD");

  // CONTRACT DASHBOARD
  const getContractDashboard = async () => {
    const { data } = await api.get(CONTRACT_DASHBOARD);
    setContractDashboard(data)
  }


  //get contracts
  const getContractList = async (status: any = null, search: any = null, filterType?: string, startDate?: string, endDate?: string) => {
    setLoading(true)
    const params = {
      page: 1,
      limit: 10,
      status: status === 'All' ? null : status,
      type: 'CONTRACT',
      currentDate: todayDate,
      search: search ?? null,
      filterType: filterType === 'ALL' ? null : filterType,
      startDate: startDate,
      endDate: dayjs(endDate).format('YYYY-MM-DD'),
    }

    let query = Object.entries(params).reduce((a: any, [k, v]) => (v ? ((a[k] = v), a) : a), {});
    const { data } = await api.get(GET_CONTRACT_LIST, query);
    setContractList(data)
    setLoading(false)
  };

  // contracts details
  const getContractDetails = async (id: any) => {
    setLoading(true)
    const { data } = await api.get(`${CONTRACT_DETAILS}/${id}`);
    setContractDetails(data)
    setLoading(false)
  }

  // edit cotract details
  const editContractDetails = async (id: any, values: any) => {
    const params = {
      status: values.status,
      content: values.content,
      reason: values.reason
    }
    setLoading(true)
    await api.put(`${EDIT_CONTRACT}/${id}`, params);
    setLoading(false)
    getContractList()
  }

  //delete contracts
  const deleteContractHandler = async (val: any) => {
    setLoading(true)
    await api.delete(`${DEL_CONTRACT}/${val}`);
    setLoading(false)
    getContractList()
    Notifications({ title: 'Success', description: 'Contract deleted', type: 'success' })
  }

  return {
    contractDashboard,
    contractList,
    loading,
    contractDetails,
    getContractDashboard,
    getContractDetails,
    getContractList,
    deleteContractHandler,
    editContractDetails
  };
};

export default useCustomHook;