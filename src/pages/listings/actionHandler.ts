import { useRecoilState, useRecoilValue, useRecoilStateLoadable } from "recoil";
import { listingsState, listingLoadingState } from "../../store";
import api from '../../api';
import endpoints from "../../config/apiEndpoints";


const useListingsHook = () => {
  const {GET_AGENT_PROPERTIES} = endpoints
  const [listingsData, setListingsData] = useRecoilState(listingsState)
  const [loading, setLoading] = useRecoilState(listingLoadingState)


  const fetchListings = async () => {
    try {
      setLoading(true)
      const {data} = await api.get(GET_AGENT_PROPERTIES);
      console.log("Property Response: ", data)
      setListingsData(data)
    } catch (error) {
      throw error;
    } finally {
      setLoading(false)
    }
  }

  const createListing = async () => {
    try {
      const response = await api.post('https://reqres.in/api/users', {"name": "morpheus", "job": "leader"})
      return response;
    } catch (error) {
      throw error;
    }
  }

  return {
    createListing,
    fetchListings
  };
};

export default useListingsHook;