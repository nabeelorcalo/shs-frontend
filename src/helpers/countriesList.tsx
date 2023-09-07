import { useRecoilState, useRecoilValue } from "recoil";
import { countryList, callingCodesState } from "../store/CountryList";
import api from "../api";
import endpoints from "../config/apiEndpoints";

// Chat operation and save into store
const useCountriesCustomHook = () => {
  const { GET_COUNTRIES_LIST } = endpoints;
  const [allCountriesList, setAllCountriesList] = useRecoilState(countryList);
  const callingCodes = useRecoilValue(callingCodesState);

  // get setting locations
  const getCountriesList = async () => {
    if (allCountriesList.length == 0) {
      const data = await api.get(GET_COUNTRIES_LIST);
      setAllCountriesList(data);
    } else {
      return;
    }
  };

  // Calling codes
  const getCountriesCallingCodes = async () => {
    return callingCodes;
  };

  return {
    allCountriesList,
    getCountriesList,
    getCountriesCallingCodes,
  };
};

export default useCountriesCustomHook;
