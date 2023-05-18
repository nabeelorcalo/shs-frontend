import { useRecoilState } from "recoil";
import { contractsListData } from "../../store";
import endpoints from "../../config/apiEndpoints";
import { Notifications } from "../../components";
import api from "../../api";
import { useEffect, useMemo } from "react";
import { debounce } from "lodash";
import dayjs from "dayjs";

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_CONTRACT_LIST, DEL_CONTRACT } = endpoints;
  const [contractList, setContractList] = useRecoilState(contractsListData);
  const todayDate = dayjs(new Date()).format("YYYY-MM-DD");

  //get offer letter
  const getOfferLetterList = async (status: any, time: any, search: any) => {
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
  };

  //search contracts
  const searchHandler = async (search: any, status: any, time: any) => {
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
    await api.delete(`${DEL_CONTRACT}/${val}`);
    getOfferLetterList(null, 'THIS_MONTH', null);
    Notifications({ title: 'Success', description: 'Contract deleted', type: 'success' })
  }
  return {
    getOfferLetterList, contractList, searchHandler, deleteOfferLetterHandler
  };
};

export default useCustomHook;