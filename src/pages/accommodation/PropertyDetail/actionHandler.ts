import api from "../../../api";
import endpoints from "../../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import { propertyState } from "../../../store";


const usePropertyHook = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const { GET_PROPERTY } = endpoints;
  const [property, setProperty] = useRecoilState(propertyState)


  // Get Property
  const getProperty = async (id:any, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true);
    const {data} = await api.get(`${GET_PROPERTY}${id}`);
    setProperty(data.data)
    setLoading(false);
  }

  return {
    getProperty,
  };
};

export default usePropertyHook;