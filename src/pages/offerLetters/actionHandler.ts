import { useState } from "react";
import { useRecoilState } from "recoil";
import { contractsDashboard, contractsListData } from "../../store";
import endpoints from "../../config/apiEndpoints";
import { Notifications } from "../../components";
import api from "../../api";
import dayjs from "dayjs";

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_CONTRACT_LIST, DEL_CONTRACT, OFFER_LETTER_DASHBOARD } = endpoints;
  const [offerLetterDashboard, setOfferLetterDashboard] = useRecoilState(contractsDashboard);
  const [contractList, setContractList] = useRecoilState(contractsListData);
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
      limit: 10,
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
    getOfferLetterList,
    getOfferLetterDashboard,
    deleteOfferLetterHandler
  };
};

export default useCustomHook;