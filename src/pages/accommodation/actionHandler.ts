import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import { availablePropertiesState } from "../../store";
import api from '../../api'


const useAccommodationData = () => {
  const [availableProperties, setAvailableProperties] = useRecoilState(availablePropertiesState);

  const getAvailableProperties = async (params: any) => {
    try {
      const {data} = await api.get('')
      setAvailableProperties(data)
    } catch (error) {
      throw error
    }
  }

  return {
    getAvailableProperties,
  };
};

export default useAccommodationData;