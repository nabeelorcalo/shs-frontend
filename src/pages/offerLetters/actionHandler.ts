import { useRecoilState } from "recoil";
import { contractsListData } from "../../store";
import endpoints from "../../config/apiEndpoints";
import { Notifications } from "../../components";
import api from "../../api";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import dayjs from "dayjs";

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_CONTRACT_LIST, DEL_CONTRACT } = endpoints;
  const [contractList, setContractList] = useRecoilState(contractsListData);
  const [loading, setLoading] = useState(false)
  const todayDate = dayjs(new Date()).format("YYYY-MM-DD");

  //get offer letter
  const getOfferLetterList = async (status: any, time: any, search: any = null) => {
    setLoading(true)
    const params = {
      page: 1,
      limit: 10,
      status: status == 'All' ? null : status,
      type: 'OFFER_LETTER',
      currentDate: todayDate,
      filterType: time ?? null,
      search: search ?? null
    }
    let query = Object.entries(params).reduce((a: any, [k, v]) => (v ? ((a[k] = v), a) : a), {});
    const { data } = await api.get(GET_CONTRACT_LIST, query);
    setContractList(data)
    setLoading(false)
  };

  //search contracts
  const searchHandler = async (search: any, status: any, time: any = null) => {
    setLoading(true)
    const params = {
      page: 1,
      limit: 10,
      search: search ?? null,
      status: status === 'All' ? null : status,
      type: 'OFFER_LETTER',
      currentDate: todayDate,
      filterType: time ?? null,
    }
    let query = Object.entries(params).reduce((a: any, [k, v]) => (v ? ((a[k] = v), a) : a), {});
    const { data } = await api.get(GET_CONTRACT_LIST, query);
    setContractList(data);
    setLoading(false)
  }

  const debouncedResults = useMemo(() => {
    return debounce(searchHandler, 500);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  //delete offer letter
  const deleteOfferLetterHandler = async (val: any) => {
    setLoading(true)
    await api.delete(`${DEL_CONTRACT}/${val}`);
    getOfferLetterList(null, 'THIS_MONTH', null);
    Notifications({ title: 'Success', description: 'Contract deleted', type: 'success' })
    setLoading(false)
  }
  return {
    contractList,
    loading,
    getOfferLetterList,
    searchHandler,
    deleteOfferLetterHandler
  };
};

export default useCustomHook;