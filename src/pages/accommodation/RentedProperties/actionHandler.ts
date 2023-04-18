import api from "../../../api";
import endpoints from "../../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import { rentedPropertiesState } from "../../../store";


const useRentedPropertiesHook = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const { GET_RENTED_PROPERTIES } = endpoints;
  const [rentedProperties, setRentedProperties] = useRecoilState(rentedPropertiesState)


  // Get Rented Properties
  const getRentedProperties = async (setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true);
    try {
      const res = await api.get(`${GET_RENTED_PROPERTIES}`);
      if(!res.error) {
        const { data } = res;
        setRentedProperties(data)
      }
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }

  return {
    getRentedProperties
  };
};

export default useRentedPropertiesHook;