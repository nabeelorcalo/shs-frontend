import { useMemo, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { contractsListData } from "../../store";
import endpoints from "../../config/apiEndpoints";
import { Notifications } from "../../components";
import api from "../../api";
import dayjs from "dayjs";
import { debounce } from "lodash";

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_CONTRACT_LIST, DEL_CONTRACT } = endpoints;
  const [contractList, setContractList] = useRecoilState(contractsListData);
  const [loading, setLoading] = useState(false);
  const todayDate = dayjs(new Date()).format("YYYY-MM-DD");

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  //get contracts
  const getContractList = async (status: any, time: any, search: any) => {
    setLoading(true)
    const params = {
      page: 1,
      limit: 10,
      status: status === 'All' ? null : status,
      type: 'CONTRACT',
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
  const searchHandler = async (searchVal: any, status: any, datePicker: any) => {
    setLoading(true)
    const params = {
      page: 1,
      limit: 10,
      search: searchVal ?? null,
      status: status === 'All' ? null : status,
      type: 'CONTRACT',
      currentDate: todayDate,
      filterType: datePicker ?? null,
    }
    let query = Object.entries(params).reduce((a: any, [k, v]) => (v ? ((a[k] = v), a) : a), {});
    const { data } = await api.get(GET_CONTRACT_LIST, query);
    setContractList(data);
    setLoading(false)
  }

  const debouncedResults = useMemo(() => {
    return debounce(searchHandler, 500);
  }, []);

  //delete contracts
  const deleteContractHandler = async (val: any) => {
    setLoading(true)
    await api.delete(`${DEL_CONTRACT}/${val}`);
    setLoading(true)
    setLoading(false)
    getContractList(null, 'THIS_MONTH', null)
    Notifications({ title: 'Success', description: 'Contract deleted', type: 'success' })
  }
  return {
    getContractList, contractList, searchHandler, deleteContractHandler, loading
  };
};

export default useCustomHook;