import api from "../../../api";
import endpoints from "../../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import { savedPropertiesState } from "../../../store";


const useSavedPropertiesHook = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const { GET_SAVED_PROPERTIES } = endpoints;
  const [savedProperties, setsavedProperties] = useRecoilState(savedPropertiesState)


  // Get Saved Properties
  const getSavedProperties = async (setLoading:React.Dispatch<React.SetStateAction<boolean>>, params:any={}) => {
    setLoading(true);
    try {
      const res = await api.get(`${GET_SAVED_PROPERTIES}`, params);
      if(!res.error) {
        const { data } = res;
        setsavedProperties(data)
      }
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }

  return {
    getSavedProperties
  };
};

export default useSavedPropertiesHook;