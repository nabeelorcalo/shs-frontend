import api from '../../api';
import endpoints from "../../config/apiEndpoints";
import { useRecoilValue, useRecoilState } from "recoil";
import { listingsState, listingState } from "../../store";


const useListingsHook = () => {
  const [allProperties, setAllProperties] = useRecoilState(listingsState)
  const [singleListing, setSingleListing] = useRecoilState(listingState)
  const { GET_AGENT_PROPERTIES, ADD_PROPERTY, GET_PROPERTY, UPDATE_PROPERTY, DELETE_PROPERTY } = endpoints

  // Create Agent Property
  const createListing = async (data: any) => {
    const response = await api.post(ADD_PROPERTY, data)
    return response
  }

  // Update Agent Property
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
    const response = await api.get(GET_AGENT_PROPERTIES);
    if(!response.error) {
      const { data } = response;
      setAllProperties(data)
    }
    setLoading(false);
  }

  // Get Single Property
  const getListing = async (id:any, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true);
    const res = await api.get(`${GET_PROPERTY}${id}`)
    if(!res.error) {
      setSingleListing(res.data)
    }
    setLoading(false);
  }

  // Delete Agent Property
  const deleteListing = async (id:any, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true)
    await api.delete(`${DELETE_PROPERTY}${id}`)
    setLoading(false)
    setAllProperties(
      allProperties.filter((property:any) => property.id !== id)
    )
  }

  return {
    createListing,
    getListings,
    getListing,
    updateListing,
    deleteListing
  };
};

export default useListingsHook;