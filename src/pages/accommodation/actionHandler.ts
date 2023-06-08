import { useRecoilState, useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import { availablePropertiesState, allPropertyAgentsState } from "../../store";
import api from '../../api'
import endpoints from "../../config/apiEndpoints";


const useAccommodationHook = () => {
  const {POST_SAVE_PROPERTY, GET_ALL_PROPERTY_AGENTS} = endpoints;
  const [availableProperties, setAvailableProperties] = useRecoilState(availablePropertiesState);
  const [allAgents, setAllAgents] = useRecoilState(allPropertyAgentsState);

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

    // Get All Property Agents
    const getAllPropertyAgents = async () => {
      const response = await api.get(GET_ALL_PROPERTY_AGENTS)
      if(!response.error) {
        setAllAgents(response.data)
      }
    }

  return {
    saveProperty,
    getAllPropertyAgents,
    allAgents
  };
};

export default useAccommodationHook;