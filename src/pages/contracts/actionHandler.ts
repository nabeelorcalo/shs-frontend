import { useState } from "react";
import { useRecoilState } from "recoil";
import { contractsListData, contractsDashboard, contractDetailsState, createContractState } from "../../store";
import endpoints from "../../config/apiEndpoints";
import { Notifications } from "../../components";
import api from "../../api";
import dayjs from "dayjs";

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_CONTRACT_LIST, UPDATE_STATUS_RESERVATION, DEL_CONTRACT, CONTRACT_DASHBOARD, CONTRACT_DETAILS, EDIT_CONTRACT, CREATECONTRACT_OFFERLETTER } = endpoints;
  const [contractDashboard, setContractDashboard] = useRecoilState(contractsDashboard);
  const [contractList, setContractList] = useRecoilState(contractsListData);
  const [contractDetails, setContractDetails] = useRecoilState(contractDetailsState)
  // const [createContactData, setCreateContract] = useRecoilState(createContractState)
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
      limit: 100,
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
    setLoading(true)
    const params = {
      status: values.status,
      content: values.content,
      reason: values.reason
    }
    const reservedParams = {
      bookingId: values.reservation,
      status: 'reserved'
    }
    const { data } = await api.put(`${EDIT_CONTRACT}/${id}`, params);
    setLoading(false)
    !values.reservation && getContractList();
    (data && values.reservation) && await api.patch(UPDATE_STATUS_RESERVATION, reservedParams)

    data && Notifications({ title: 'Success', description: 'Contract Sent', type: 'success' })
  }

  //delete contracts
  const deleteContractHandler = async (val: any) => {
    setLoading(true)
    await api.delete(`${DEL_CONTRACT}/${val}`);
    setLoading(false)
    getContractList()
    Notifications({ title: 'Success', description: 'Contract deleted', type: 'success' })
  }

  const createContract = async (values: any) => {
    await api.post(CREATECONTRACT_OFFERLETTER, values);
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
    editContractDetails,
    createContract,
  };
};

export default useCustomHook;