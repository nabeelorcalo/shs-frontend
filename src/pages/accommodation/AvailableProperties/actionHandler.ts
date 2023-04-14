import api from "../../../api";
import endpoints from "../../../config/apiEndpoints";


const useAvailablePropertiesHook = () => {

  const { GET_AVAILABLE_PROPERTIES } = endpoints;

  // Get Available Properties
  const getAvailableProperties = async () => {
    return await api.get(`${GET_AVAILABLE_PROPERTIES}`);
  }


  

  return {
    getAvailableProperties,
  };
};

export default useAvailablePropertiesHook;