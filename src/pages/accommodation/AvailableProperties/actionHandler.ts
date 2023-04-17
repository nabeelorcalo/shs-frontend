import api from "../../../api";
import endpoints from "../../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import { availablePropertiesState } from "../../../store";


const useAvailablePropertiesHook = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const { GET_AVAILABLE_PROPERTIES } = endpoints;
  const [availableProperties, setAvailableProperties] = useRecoilState(availablePropertiesState)


  // Get Available Properties
  const getAvailableProperties = async (setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true);
    try {
      const res = await api.get(`${GET_AVAILABLE_PROPERTIES}`);
      if(!res.error) {
        const { data } = res;
        setAvailableProperties(data)
      }
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }

  return {
    getAvailableProperties,
  };
};

export default useAvailablePropertiesHook;