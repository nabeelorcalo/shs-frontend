import api from "../../../api";
import endpoints from "../../../config/apiEndpoints";
import { useRecoilState, useRecoilValue } from "recoil";
import { rentedPropertiesState, searchRentedState } from "../../../store";


const useRentedPropertiesHook = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const { GET_RENTED_PROPERTIES } = endpoints;
  const [rentedProperties, setRentedProperties] = useRecoilState(rentedPropertiesState);


  // Get Rented Properties
  const getRentedProperties = async (params:any, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true);
    try {
      const res = await api.get(GET_RENTED_PROPERTIES, params);
      setRentedProperties(res.data)
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }

  return {
    getRentedProperties,
    rentedProperties
  };
};

export default useRentedPropertiesHook;