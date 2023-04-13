import api from '../../api';
import endpoints from "../../config/apiEndpoints";


const useListingsHook = () => {
  const { GET_AGENT_PROPERTIES, ADD_PROPERTY } = endpoints

  // Get Agent Properties
  const getListings = async () => {

    const fetchData = async () => {
      try {
        const res = await api.get(GET_AGENT_PROPERTIES);
        return {response: res, error: undefined}
      } catch (error) {
        return { response: undefined, error: error };
      }
    }

    return await fetchData()
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