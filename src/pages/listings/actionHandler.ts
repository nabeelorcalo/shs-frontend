import api from '../../api';
import endpoints from "../../config/apiEndpoints";
import { useRecoilValue, useRecoilState } from "recoil";
import { listingsState, listingLoadingState } from "../../store";


const useListingsHook = () => {
  const [allProperties, setAllProperties] = useRecoilState(listingsState)
  const { GET_AGENT_PROPERTIES, ADD_PROPERTY } = endpoints

  // Get Agent Properties
  const getListings = async (setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true);
    try {
      const res = await api.get(GET_AGENT_PROPERTIES);
      if(!res.error) {
        const { data } = res;
        setAllProperties(data)
      }
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }

  // Add Agent Properties
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
    getListings
  };
};

export default useListingsHook;