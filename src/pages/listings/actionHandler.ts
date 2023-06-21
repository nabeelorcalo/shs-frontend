import api from '../../api';
import endpoints from "../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import { listingsState, listingState } from "../../store";
import { Notifications } from '../../components';


const useListingsHook = () => {
  const [allProperties, setAllProperties] = useRecoilState(listingsState)
  const [singleListing, setSingleListing] = useRecoilState(listingState)
  const { GET_AGENT_PROPERTIES, ADD_PROPERTY, GET_PROPERTY, UPDATE_PROPERTY, DELETE_PROPERTY } = endpoints

  // Create Agent Property
  const createListing = async (data: any) => {
    const response = await api.post(ADD_PROPERTY, data, {headers: {'Content-Type': 'multipart/form-data'}})
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
  const getListings = async (params:any, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true);
    try {
      const {data} = await api.get(GET_AGENT_PROPERTIES, params);
      setAllProperties(data)
    } catch(error) {
      return;
    } finally {
      setLoading(false);
    }
  }

  // Get Single Property
  const getListing = async (id:any, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true);
    try {
      const res:any = await api.get(`${GET_PROPERTY}${id}`)
      if(!res.error) {
        let {data} = res;
        const attachments = data?.attachments?.map(({
          mediaUrl: url,
          ...rest
          }:any) => ({
          url,
          ...rest
          }));
        setSingleListing({...data, attachments})
      }
    } catch(error) {
      return;
    } finally {
      setLoading(false);
    } 
  }

  // Delete Agent Property
  const deleteListing = async (id:any, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true)
    try {
      const response = await api.delete(`${DELETE_PROPERTY}${id}`)
      if(!response.error) {
        Notifications({title: "Success", description: "The property has been deleted.", type: 'success'});
        setAllProperties(
          allProperties.filter((property:any) => property.id !== id)
        )
      }
    } catch(error) {
      return;
    } finally {
      setLoading(false)
    } 
  }

  return {
    createListing,
    getListings,
    allProperties,
    getListing,
    singleListing,
    updateListing,
    deleteListing
  };
};

export default useListingsHook;