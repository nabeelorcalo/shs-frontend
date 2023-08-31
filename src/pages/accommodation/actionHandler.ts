import { useRecoilState } from "recoil";
import { allPropertyAgentsState } from "../../store";
import api from '../../api'
import endpoints from "../../config/apiEndpoints";


const useAccommodationHook = () => {
  const {POST_SAVE_PROPERTY, GET_ALL_PROPERTY_AGENTS, POST_UNSAVE_PROPERTY} = endpoints;
  const [allAgents, setAllAgents] = useRecoilState(allPropertyAgentsState);

    // Save Property
    const saveProperty = async (reqBody:any) => {
      const response = await api.post(POST_SAVE_PROPERTY, reqBody)
      return response;
    }

    // Unsave Property
    const unsaveProperty = async (reqBody: any) => {
      const response = await api.post(POST_UNSAVE_PROPERTY, reqBody)
      return response;
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
    allAgents,
    unsaveProperty
  };
};

export default useAccommodationHook;