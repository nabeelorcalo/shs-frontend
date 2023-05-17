import { useRecoilState } from "recoil";
import { contractsListData } from "../../store";
import endpoints from "../../config/apiEndpoints";
import { Notifications } from "../../components";
import api from "../../api";
import { useEffect, useMemo } from "react";
import { debounce } from "lodash";

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_CONTRACT_LIST, DEL_CONTRACT } = endpoints;
  const [contractList, setContractList] = useRecoilState(contractsListData);

  //get offer letter
  const getOfferLetterList = async (status: any, time: any) => {
    const params = {
      page: 1,
      limit: 10,
      status: status ? status : null,
      type: 'OFFER_LETTER',
      currentDate: '2023-05-07',
      filterType: time ? time : null
    }
    const { data } = await api.get(GET_CONTRACT_LIST, params);
    setContractList(data)
  };

  //search contracts
  const searchHandler = async (searchVal: any, status: any) => {
    const params = {
      page: 1,
      limit: 10,
      status: status ? status : null,
      type: 'OFFER_LETTER',
      currentDate: '2023-05-10',
      filterType: 'THIS_MONTH',
      search: searchVal ? searchVal : null
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
    getOfferLetterList(null, null);
    Notifications({ title: 'Success', description: 'Contract deleted', type: 'success' })
  }
  return {
    getOfferLetterList, contractList, searchHandler, deleteOfferLetterHandler
  };
};

export default useCustomHook;