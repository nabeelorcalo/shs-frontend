import api from '../../api';
import endpoints from "../../config/apiEndpoints";
import { useRecoilValue, useRecoilState } from "recoil";
import { listingsState, listingState } from "../../store";


const useListingsHook = () => {
  const [allProperties, setAllProperties] = useRecoilState(listingsState)
  const [singleListing, setSingleListing] = useRecoilState(listingState)
  const { GET_AGENT_PROPERTIES, ADD_PROPERTY, GET_PROPERTY, UPDATE_PROPERTY } = endpoints

  // Create Agent Property
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

  const updateListing = async (id:any, data: any) => {
    const submitRequest = async(listingId:any, reqBody:any) => {
      try {
        const res = await api.post(`${UPDATE_PROPERTY}${listingId}`, reqBody)
        return {response: res, error: undefined}
      } catch (error) {
        return { response: undefined, error: error };
      }
    }
    return await submitRequest(id, data)
  }

  // Get All Agent Properties
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

  // Get Single Property
  const getListing = async (id:any, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true);
    try {
      return api.get(`${GET_PROPERTY}${id}`).then(res => {
        if(!res.error) {
          console.log("Res.data::: ", res.data)
          return setSingleListing(res.data)
        }
      })
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }

  return {
    createListing,
    getListings,
    getListing,
    updateListing
  };
};

export default useListingsHook;