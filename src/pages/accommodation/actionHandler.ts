import { useRecoilState, useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import { availablePropertiesState, allAvailablePropertiesState } from "../../store";
import api from '../../api'


const useAccommodationData = () => {
  const [availableProperties, setAvailableProperties] = useRecoilState(availablePropertiesState);
  const propertiesList = useRecoilValue(allAvailablePropertiesState)

  return {
    propertiesList
  };
};

export default useAccommodationData;