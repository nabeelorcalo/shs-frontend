import { useRecoilState, useRecoilValue, useRecoilStateLoadable } from "recoil";
import { listingsState } from "../../store";
import api from '../../api'


const useListingsHook = () => {
  const [listingsData, setListingsData] = useRecoilStateLoadable(listingsState)

  const createListing = async () => {
    try {
      const response = await api.post('https://reqres.in/api/users', {"name": "morpheus", "job": "leader"})
      return response;
    } catch (error) {
      throw error;
    }
  }

  return {
    listingsData,
    createListing
  };
};

export default useListingsHook;