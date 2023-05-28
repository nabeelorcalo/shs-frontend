import { useRecoilState } from "recoil";
import { settingShiftsState } from "../../../../store";
import api from "../../../../api";
import endpoints from "../../../../config/apiEndpoints";
import { debounce } from "lodash";
import { Notifications } from "../../../../components";
import { Navigate, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
// import constants from "../../../../config/constants";

// Chat operation and save into store
const useShiftsCustomHook = () => {
  const { SETTINGS_SHIFTS, POST_NEW_SHIFTS } = endpoints;
  const [shiftsData, setShiftsData] = useRecoilState(settingShiftsState);
  const navigate = useNavigate();

  // Getting shifts data 
  const getAllShifts = async (searchValue: any = null) => {
    const params = {
      limit: 100,
      page: 1,
      search: searchValue ? searchValue : null
    }
    let query = Object.entries(params).reduce((a: any, [k, v]) => (v ? ((a[k] = v), a) : a), {})
    const { data } = await api.get(SETTINGS_SHIFTS, query);
    setShiftsData(data)
  };

  // Post shifts data

  const postShiftData = async (values: any) => {
    const { shiftName, timeFrom, timeTo, shiftDuration, roundOffCap } = values;
    const shiftDetails = {
      "name": shiftName,
      "from": timeFrom,
      "to": timeTo,
      "duration": shiftDuration,
      "roundOfCap": roundOffCap,
      "interns": 2,
      "applyToNewHires": true
    }
    const { data } = await api.post(POST_NEW_SHIFTS, shiftDetails);
    if (data) {
      Notifications({ title: "Success", description: "Shift added successfully", type: "success" })
      // navigate(`/${}`)
    }
  }
  //Search
  const debouncedSearch = debounce((value, setSearchName) => {
    setSearchName(value);
  }, 500);




  return {
    getAllShifts,
    postShiftData,
    debouncedSearch,
    shiftsData,
  };
};

export default useShiftsCustomHook;