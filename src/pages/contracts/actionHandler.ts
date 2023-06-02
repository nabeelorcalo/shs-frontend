import { useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { contractsListData, contractsDashboard } from "../../store";
import endpoints from "../../config/apiEndpoints";
import { Notifications } from "../../components";
import api from "../../api";
import dayjs from "dayjs";

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_CONTRACT_LIST, DEL_CONTRACT, CONTRACT_DASHBOARD } = endpoints;
  const [contractDashboard, setContractDashboard] = useRecoilState(contractsDashboard);
  const [contractList, setContractList] = useRecoilState(contractsListData);
  const [loading, setLoading] = useState(false);
  const todayDate = dayjs(new Date()).format("YYYY-MM-DD");

  // CONTRACT DASHBOARD
  const getContractDashboard = async () => {
    const { data } = await api.get(CONTRACT_DASHBOARD);
    setContractDashboard(data)
  }


  //get contracts
  const getContractList = async (status: any = null, time: any = null, search: any = null) => {
    setLoading(true)
    const params = {
      page: 1,
      limit: 10,
      status: status === 'All' ? null : status,
      type: 'CONTRACT',
      currentDate: todayDate,
      filterType: time === 'ALL' ? null : time,
      search: search ?? null
    }
    let query = Object.entries(params).reduce((a: any, [k, v]) => (v ? ((a[k] = v), a) : a), {});
    const { data } = await api.get(GET_CONTRACT_LIST, query);
    setContractList(data)
    setLoading(false)
  };

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
    getContractDashboard,
    getContractList,
    deleteContractHandler,
  };
};

export default useCustomHook;