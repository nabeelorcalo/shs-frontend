import { useRecoilState } from "recoil";
import { countryList } from "../store/CountryList";
import api from "../api";
import endpoints from "../config/apiEndpoints";

// Chat operation and save into store
const useCountriesCustomHook = () => {
  const { GET_COUNTRIES_LIST } = endpoints;
  const [allCountriesList, setAllCountriesList] = useRecoilState(countryList);

  // get setting locations
  const getCountriesList = async () => {
    const data = await api.get(GET_COUNTRIES_LIST);
    setAllCountriesList(data)
  };

  return {
    allCountriesList,
    getCountriesList,
  };
};

export default useCountriesCustomHook;
