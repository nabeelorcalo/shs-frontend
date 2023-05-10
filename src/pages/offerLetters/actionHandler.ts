import { useRecoilState } from "recoil";
import { contractsListData } from "../../store";
import endpoints from "../../config/apiEndpoints";
import { Notifications } from "../../components";
import api from "../../api";

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_CONTRACT_LIST, DEL_CONTRACT } = endpoints;
  const [contractList, setContractList] = useRecoilState(contractsListData);

  //get offer letter
  const getOfferLetterList = async (val: any) => {
    const params = {
      page: 1,
      limit: 10,
      status: val,
      type: 'OFFER_LETTER',
      currentDate: '2023-05-07',
      filterType: 'THIS_MONTH'
    }
    const { data } = await api.get(GET_CONTRACT_LIST, params);
    setContractList(data)
  };

  //search offer letter
  const searchHandler = async (val: any, status: any) => {
    const params = {
      page: 1,
      limit: 10,
      status: status,
      type: 'OFFER_LETTER',
      currentDate: '2023-05-07',
      filterType: 'THIS_MONTH',
      search: val
    }
    const { data } = await api.get(GET_CONTRACT_LIST, params);
    setContractList(data);
  }

  //delete offer letter
  const deleteOfferLetterHandler = async (val: any) => {
    await api.delete(`${DEL_CONTRACT}/${val}`);
    getOfferLetterList(val);
    Notifications({ title: 'Success', description: 'Contract deleted', type: 'success' })
  }
  return {
    getOfferLetterList, contractList, searchHandler, deleteOfferLetterHandler
  };
};

export default useCustomHook;