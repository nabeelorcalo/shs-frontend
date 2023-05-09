import { useRecoilState } from "recoil";
import { contractsListData } from "../../store";
import endpoints from "../../config/apiEndpoints";
import { Notifications } from "../../components";
import api from "../../api";

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_CONTRACT_LIST, DEL_CONTRACT } = endpoints;
  const [contractList, setContractList] = useRecoilState(contractsListData);

  //get contracts
  const getContractList = async (status: any,time:any) => {
    const params = {
      page: 1,
      limit: 10,
      status: status,
      type: 'CONTRACT',
      currentDate: '2023-05-09',
      filterType: time
    }
    const { data } = await api.get(GET_CONTRACT_LIST, params);
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
    const { data } = await api.delete(DEL_CONTRACT, `${DEL_CONTRACT}/${val}`);
    // getContractList;
    console.log("delete data are ", data);
    Notifications({ title: 'Success', description: 'Contract deleted', type: 'success' })
  }
  return {
    getContractList, contractList, searchHandler, deleteContractHandler
  };
};

export default useCustomHook;