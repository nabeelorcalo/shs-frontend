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

  //get contracts
  const getContractList = async (status: any, time: any) => {
    const params = {
      page: 1,
      limit: 10,
      status: status ? status : null,
      type: 'CONTRACT',
      currentDate: todayDate,
      filterType: time ? time : null,
    }
    let query = Object.entries(params).reduce((a: any, [k, v]) => (v ? ((a[k] = v), a) : a), {});
    const { data } = await api.get(GET_CONTRACT_LIST, query);
    setContractList(data)
    if (data) {
      setLoading(true)
    }
  };

  //search contracts
  const searchHandler = async (searchVal: any, status: any) => {
    const params = {
      page: 1,
      limit: 10,
      status: status ? status : null,
      type: 'CONTRACT',
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

  //delete contracts
  const deleteContractHandler = async (val: any) => {
    await api.delete(`${DEL_CONTRACT}/${val}`);
    setLoading(true)
    getContractList(null, 'THIS_MONTH')
    Notifications({ title: 'Success', description: 'Contract deleted', type: 'success' })
  }
  return {
    getContractList, contractList, searchHandler, deleteContractHandler, loading
  };
};

export default useCustomHook;