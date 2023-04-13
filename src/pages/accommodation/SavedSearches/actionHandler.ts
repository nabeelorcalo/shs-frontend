import api from "../../../api";
import endpoints from "../../../config/apiEndpoints";


const useSavedPropertiesHook = () => {

  const { GET_SAVED_PROPERTIES } = endpoints;

  // Get Saved Properties
  const getSavedProperties = async () => {
    return await api.get(`${GET_SAVED_PROPERTIES}`);
  }

  return {
    getSavedProperties
  };
};

export default useSavedPropertiesHook;