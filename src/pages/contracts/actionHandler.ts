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
  const getData = async () => {
    const { data } = await api.get(GET_CONTRACT_LIST, { page: 1, limit: 10,type:'CONTRACT', currentDate: '2023-05-07', filterType: 'THIS_MONTH' });
    setContractList(data)
  };
  //search contracts
  const searchHandler = async (val: any) => {
    const { data } = await api.get(GET_CONTRACT_LIST, { page: 1, limit: 10, currentDate: '2023-05-07', filterType: 'THIS_MONTH', search: val });
    setContractList(data);
  }
  //delete contract
  const deleteContractHandler = async (val: any) => {
    await api.delete(`${DEL_CONTRACT}/${val}`);
    getData();
    Notifications({ title: 'Success', description: 'Contract deleted', type: 'success' })
  }
  return {
    getData, contractList, searchHandler, deleteContractHandler
  };
};

export default useCustomHook;