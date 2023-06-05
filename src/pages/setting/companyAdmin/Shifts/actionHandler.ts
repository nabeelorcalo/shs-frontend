import endpoints from "../../../../config/apiEndpoints";
import { Notifications } from "../../../../components";
import { settingInternsState, settingShiftsState } from "../../../../store";
import { useRecoilState } from "recoil";
import { debounce } from "lodash";
import { useState } from "react";
import api from "../../../../api";


// Shifts operation and save into store
const useShiftsCustomHook = () => {
  const { SETTINGS_SHIFTS, POST_NEW_SHIFTS, DELETE_SHIFT, INTERN_LIST } = endpoints;
  const [shiftsData, setShiftsData] = useRecoilState(settingShiftsState);
  const [internsData, setInternsData] = useRecoilState(settingInternsState);
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

  // Getting all interns data 
  const getAllInterns = async (companyId:any) => {
    const params = {
      companyId: 1
    }
    let query = Object.entries(params).reduce((a: any, [k, v]) => (v ? ((a[k] = v), a) : a), {})
    setIsLoading(true);
    const { data } = await api.get(INTERN_LIST,query);
    setInternsData(data)
    setIsLoading(false);
  };

  // Post shifts data
  const postShiftData = async (values: any) => {
    const { shiftName, timeFrom, timeTo, shiftDuration, roundOffCap, interns } = values;
    const shiftDetails = {
      "name": shiftName,
      "from": timeFrom,
      "to": timeTo,
      "duration": shiftDuration,
      "roundOfCap": roundOffCap,
      "interns": interns,
      "applyToNewHires": true
    }
    setIsLoading(true);
    const { data } = await api.post(POST_NEW_SHIFTS, shiftDetails);
    if (data) {
      setIsLoading(false);
      Notifications({ title: "Success", description: "Shift added", type: "success" })
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
    getAllInterns,
    deleteShifts,
    getAllShifts,
    internsData,
    shiftsData,
    isLoading,
  };
};

export default useShiftsCustomHook;