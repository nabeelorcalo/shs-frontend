import { useRecoilState } from "recoil";
import { settingTimesheetState } from "../../../../store";
import api from "../../../../api";
import endpoints from "../../../../config/apiEndpoints";
import { debounce } from "lodash";
import { Notifications } from "../../../../components";
import { useState } from "react";


// Chat operation and save into store
const useTimesheetCustomHook = () => {
  const { SETTINGS_TIMESHEET, POST_NEW_TIMESHEET,
    DELETE_TIMESHEET, EDIT_TIMESHEET } = endpoints;

  const [timeSheetData, setTimeSheetData] = useRecoilState(settingTimesheetState);
  const [isLoading, setIsLoading] = useState(false)

  // Getting timesheets data 
  const getTimeSheetsData = async (searchValue: any = null) => {
    const params = {
      limit: 100,
      page: 1,
      q: searchValue ? searchValue : null
    }
    setIsLoading(true)
    let query = Object.entries(params).reduce((a: any, [k, v]) => (v ? ((a[k] = v), a) : a), {})
    const { data } = await api.get(SETTINGS_TIMESHEET, query);
    setTimeSheetData(data)
    setIsLoading(false)
  };

  // Post timesheet data

  const postTimeSheetData = async (values: any) => {
    const { categoryName, description } = values;
    const timeSheetDetails = {
      "name": categoryName,
      "description": description,
    }
    const { data } = await api.post(POST_NEW_TIMESHEET, timeSheetDetails);
    if (data) {
      Notifications({ title: "Success", description: "Category added", type: "success" })
      getTimeSheetsData()
    }
  }

  //Search timesheet
  const debouncedSearch = debounce((value, setSearchName) => {
    setSearchName(value);
  }, 500);

  //Delete timesheet
  const deleteTimeSheet = async (id: any) => {
    await api.delete(`${DELETE_TIMESHEET}/${id}`);
    Notifications({ title: "Success", description: 'Category deleted', type: 'success' })
    getTimeSheetsData()
  };

  // Edit timeSheet 
  const editTimeSheets = async (id: any, values: any) => {
    const { categoryName, description, } = values;
    const params = {
      name: categoryName,
      description: description,
    }
    await api.patch(`${EDIT_TIMESHEET}/${id}`, params);
    getTimeSheetsData()
    Notifications({ title: "Success", description: 'Category updated', type: 'success' })
  };



  return {
    getTimeSheetsData,
    postTimeSheetData,
    editTimeSheets,
    deleteTimeSheet,
    debouncedSearch,
    timeSheetData,
    isLoading
  };
};

export default useTimesheetCustomHook;