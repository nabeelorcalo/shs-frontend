import { useRecoilState, useRecoilValue, useRecoilStateLoadable } from "recoil";
import { listingsState, listingLoadingState } from "../../store";
import api from '../../api';
import endpoints from "../../config/apiEndpoints";


const useListingsHook = () => {
  const { GET_AGENT_PROPERTIES, ADD_PROPERTY } = endpoints
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

  const createListing = async (data: any) => {

    const submitRequest = async(reqBody:any) => {
      try {
        const res = await api.post(ADD_PROPERTY, reqBody)
        return {response: res, error: undefined}
      } catch (error) {
        return { response: undefined, error: error };
      }
    }

    return await submitRequest(data)
    
  }

  return {
    createListing,
    fetchListings
  };
};

export default useListingsHook;