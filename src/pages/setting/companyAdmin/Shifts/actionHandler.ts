import endpoints from "../../../../config/apiEndpoints";
import { Notifications } from "../../../../components";
import { settingShiftsState } from "../../../../store";
import { useRecoilState } from "recoil";
import { debounce } from "lodash";
import { useState } from "react";
import api from "../../../../api";
import { useNavigate } from "react-router-dom";


// Shifts operation and save into store
const useShiftsCustomHook = () => {
  // const navigate = useNavigate()
  const { SETTINGS_SHIFTS, POST_NEW_SHIFTS, DELETE_SHIFT } = endpoints;
  const [shiftsData, setShiftsData] = useRecoilState(settingShiftsState);
  const [isLoading, setIsLoading] = useState(false)

  // Getting shifts data 
  const getAllShifts = async (searchValue: any = null) => {
    const params = {
      limit: 100,
      page: 1,
      q: searchValue ? searchValue : null
    }
    let query = Object.entries(params).reduce((a: any, [k, v]) => (v ? ((a[k] = v), a) : a), {})
    setIsLoading(true);
    const { data } = await api.get(SETTINGS_SHIFTS, query);
    setShiftsData(data)
    setIsLoading(false);
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
    setIsLoading(true);
    const { data } = await api.post(POST_NEW_SHIFTS, shiftDetails);
    if (data) {
      setIsLoading(false);
      // navigate('/')
      Notifications({ title: "Success", description: "Shift added successfully", type: "success" })
    }
  }
  //Search
  const debouncedSearch = debounce((value, setSearchName) => {
    setSearchName(value);
  }, 500);

  //delete shifts
  const deleteShifts = async (id: any) => {
    setIsLoading(true);
    await api.delete(`${DELETE_SHIFT}/${id}`);
    getAllShifts();
    setIsLoading(false);
    Notifications({ title: "Success", description: 'Shift deleted', type: 'success' })
  };

  return {
    debouncedSearch,
    postShiftData,
    deleteShifts,
    getAllShifts,
    shiftsData,
    isLoading,
  };
};

export default useShiftsCustomHook;