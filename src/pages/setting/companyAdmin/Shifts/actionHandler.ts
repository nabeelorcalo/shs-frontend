import endpoints from "../../../../config/apiEndpoints";
import { Notifications } from "../../../../components";
import { settingInternsState, settingShiftsState } from "../../../../store";
import { useRecoilState } from "recoil";
import { debounce } from "lodash";
import { useState } from "react";
import api from "../../../../api";

// Shifts operation and save into store
const useShiftsCustomHook = () => {
  const { SETTINGS_SHIFTS, POST_NEW_SHIFTS, DELETE_SHIFT, INTERN_LIST, EDIT_SHIFT } = endpoints;
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
  const getAllInterns = async (companyId: any) => {
    const params = {
      companyId: companyId
    }
    let query = Object.entries(params).reduce((a: any, [k, v]) => (v ? ((a[k] = v), a) : a), {})
    setIsLoading(true);
    const { data } = await api.get(INTERN_LIST, query);
    setInternsData(data)
    setIsLoading(false);
  };

  // Post shifts data
  const postShiftData = async (values: any) => {
    const { shiftName, timeFrom, timeTo, shiftDuration, roundOffCap, interns,applyToNewHires } = values;
    const shiftDetails = {
      "name": shiftName, 
      "from": timeFrom,
      "to": timeTo,
      "duration": shiftDuration,
      "roundOfCap": roundOffCap,
      "interns": interns?.map((item: any) => item?.id),
      "applyToNewHires": applyToNewHires,
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

  // Edit shifts 
  const editShifts = async (id: any, values: any) => {
    const { applyForNewHire, interns, roundOffCap, shiftDuration, shiftName, from, to } = values;
    const params = {
      name: shiftName,
      from: from,
      to: to,
      duration: shiftDuration,
      roundOfCap: roundOffCap,
      interns: interns,
      applyToNewHires: applyForNewHire
    }
    setIsLoading(true)
    await api.patch(`${EDIT_SHIFT}/${id}`, params);
    setIsLoading(false)
    // Navigate(ROUTES_CONSTANTS.TEMPLATE_OFFER_LETTER, { state: templateType });
    getAllShifts()
    Notifications({ title: "Success", description: 'Shift updated', type: 'success' })
  };


  return {
    debouncedSearch,
    postShiftData,
    getAllInterns,
    deleteShifts,
    getAllShifts,
    editShifts,
    internsData,
    shiftsData,
    isLoading,
  };
};

export default useShiftsCustomHook;