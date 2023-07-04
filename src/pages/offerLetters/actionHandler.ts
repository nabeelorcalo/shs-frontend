import { useState } from "react";
import { useRecoilState } from "recoil";
import { contractDetailsState, contractsDashboard, contractsListData } from "../../store";
import endpoints from "../../config/apiEndpoints";
import { Notifications } from "../../components";
import api from "../../api";
import dayjs from "dayjs";

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_CONTRACT_LIST,
    DEL_CONTRACT,
    OFFER_LETTER_DASHBOARD,
    CONTRACT_DETAILS,
    EDIT_CONTRACT } = endpoints;
  const [offerLetterDashboard, setOfferLetterDashboard] = useRecoilState(contractsDashboard);
  const [contractList, setContractList] = useRecoilState(contractsListData);
  const [contractDetails, setOfferLetterDetails] = useRecoilState(contractDetailsState);
  const [loading, setLoading] = useState(false)
  const todayDate = dayjs(new Date()).format("YYYY-MM-DD");

  // CONTRACT DASHBOARD
  const getOfferLetterDashboard = async () => {
    const { data } = await api.get(OFFER_LETTER_DASHBOARD);
    setOfferLetterDashboard(data)
  }

  const getOfferLetterList = async (status: any = null,
    search: any = null,
    filterType?: string,
    startDate?: string,
    endDate?: string) => {
    setLoading(true)
    const params = {
      page: 1,
      limit: 100,
      status: status === 'All' ? null : status,
      type: 'OFFER_LETTER',
      currentDate: todayDate,
      filterType: filterType === 'ALL' ? null : filterType,
      startDate: startDate,
      endDate: dayjs(endDate).format('YYYY-MM-DD'),
      search: search ?? null
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
    setOfferLetterDetails(data)
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
    const { data } = await api.put(`${EDIT_CONTRACT}/${id}`, params);
    setLoading(false)
    getOfferLetterList()
    data && Notifications({ title: 'Success', description: 'Contract Sent', type: 'success' })
  }

  //delete offer letter
  const deleteOfferLetterHandler = async (val: any) => {
    setLoading(true)
    await api.delete(`${DEL_CONTRACT}/${val}`);
    getOfferLetterList();
    Notifications({ title: 'Success', description: 'Contract deleted', type: 'success' })
    setLoading(false)
  }
  return {
    offerLetterDashboard,
    contractList,
    loading,
    contractDetails,
    getContractDetails,
    getOfferLetterList,
    getOfferLetterDashboard,
    deleteOfferLetterHandler,
    editContractDetails
  };
};

export default useCustomHook;