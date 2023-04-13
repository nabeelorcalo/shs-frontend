import { useRecoilState, useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import { availablePropertiesState } from "../../store";
import api from '../../api'


const useAccommodationData = () => {
  const [availableProperties, setAvailableProperties] = useRecoilState(availablePropertiesState);

  return {
    
  };
};

export default useAccommodationData;