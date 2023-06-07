import api from "../../../api";
import endpoints from "../../../config/apiEndpoints";
import { useRecoilState, useResetRecoilState } from "recoil";
import { savedPropertiesState, filterParamsState } from "../../../store";


const useSavedPropertiesHook = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const { GET_SAVED_PROPERTIES } = endpoints;
  const [savedProperties, setsavedProperties] = useRecoilState(savedPropertiesState);
  const resetFilterParams = useResetRecoilState(filterParamsState);


  // Get Saved Properties
  const getSavedProperties = async (setLoading:React.Dispatch<React.SetStateAction<boolean>>, params:any={}) => {
    setLoading(true);
    resetFilterParams()
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
    getSavedProperties,
    savedProperties
  };
};

export default useSavedPropertiesHook;