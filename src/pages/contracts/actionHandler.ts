import { useRecoilState } from "recoil";
import { contractsListData } from "../../store";
import endpoints from "../../config/apiEndpoints";
import { Notifications } from "../../components";
import api from "../../api";
import dayjs from "dayjs";

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_CONTRACT_LIST, DEL_CONTRACT } = endpoints;
  const [contractList, setContractList] = useRecoilState(contractsListData);
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
  };

  //search contracts
  const searchHandler = async (searchVal: any, status: any) => {
    const params = {
      page: 1,
      limit: 10,
      status: status,
      type: 'CONTRACT',
      currentDate: '2023-05-09',
      filterType: 'THIS_MONTH',
      search: searchVal
    }
    const { data } = await api.get(GET_CONTRACT_LIST, params);
    setContractList(data);
  }

  //delete contracts
  const deleteContractHandler = async (val: any) => {
    const { data } = await api.delete(`${DEL_CONTRACT}/${val}`);
    getContractList(null, 'THIS_MONTH')
    let query = Object.entries(val).reduce((a: any, [k, v]) => (v ? ((a[k] = v), a) : a), {});
    console.log("delete data are ", data);
    Notifications({ title: 'Success', description: 'Contract deleted', type: 'success' })
  }
  return {
    getContractList, contractList, searchHandler, deleteContractHandler
  };
};

export default useCustomHook;