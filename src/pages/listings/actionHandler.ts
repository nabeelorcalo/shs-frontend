import { useRecoilState, useRecoilValue, useRecoilStateLoadable } from "recoil";
import { listingsState, propertiesListState, loadingState } from "../../store";
import api from '../../api';
import endpoints from "../../config/apiEndpoints";


const useListingsHook = () => {
  const {GET_AGENT_PROPERTIES} = endpoints
  const [propertiesData, setPropertiesData] = useRecoilState(propertiesListState)
  const [loading, setLoading] = useRecoilState(loadingState)
  const [listingsData, setListingsData] = useRecoilStateLoadable(listingsState)

  const fetchListings = async () => {
    try {
      setLoading(true)
      const response = await api.get(GET_AGENT_PROPERTIES);
      console.log("Property Response: ", response)
      setPropertiesData(response)
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
    listingsData,
    createListing,
    fetchListings
  };
};

export default useListingsHook;