import api from "../../../api";
import endpoints from "../../../config/apiEndpoints";


const useRentedPropertiesHook = () => {

  const { GET_RENTED_PROPERTIES } = endpoints;

  // Get Rented Properties
  const getRentedProperties = async () => {
    return await api.get(`${GET_RENTED_PROPERTIES}`);
  }

  return {
    getRentedProperties
  };
};

export default useRentedPropertiesHook;