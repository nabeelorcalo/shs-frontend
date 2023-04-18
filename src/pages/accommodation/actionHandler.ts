import { useRecoilState, useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import { availablePropertiesState } from "../../store";
import api from '../../api'
import endpoints from "../../config/apiEndpoints";


const useAccommodationHook = () => {
  const {POST_SAVE_PROPERTY} = endpoints;
  const [availableProperties, setAvailableProperties] = useRecoilState(availablePropertiesState);

    // Save Property
    const saveProperty = async (data: any) => {

      const submitRequest = async(reqBody:any) => {
        try {
          const res = await api.post(POST_SAVE_PROPERTY, reqBody)
          return {response: res, error: undefined}
        } catch (error) {
          return { response: undefined, error: error };
        }
      }
  
      return await submitRequest(data)
    }

  return {
    saveProperty
  };
};

export default useAccommodationHook;