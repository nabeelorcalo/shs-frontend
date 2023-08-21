import { useRecoilState } from "recoil";
import { managerUserListState, taskDateRangeState, taskInDateState, companyManagerState } from "../../../store/timesheet";
import api from "../../../api";
import endpoints from "../../../config/apiEndpoints";
import dayjs from "dayjs";
import { useState } from "react";

const AdminTimeSheetCustomHook = () => {
  const [managerUserList, setManagerUserList] = useRecoilState(managerUserListState);
  const [taskDateRange, setTaskDateRange] = useRecoilState(taskDateRangeState);
  const [taskInDate, setTaskInDate] = useRecoilState(taskInDateState);
  const [companyManagerList, setCompanyManagerList] = useRecoilState(companyManagerState);
  const [managerLoading, setManagerLoading] = useState<boolean>(false);

  const { GET_INTERN_TIMESHEET_USERS, GET_INTERN_TIMESHEET_DATE_RANGE, GET_INTERN_TIMESHEET_DATE, GET_MANAGER_COMPANY_ADMIN } = endpoints;

  const fetchManagerUsers = (params: any) => {
    setManagerLoading(true);
    api
      .get(GET_INTERN_TIMESHEET_USERS, params)
      .then((result) => {
        setManagerUserList(result?.data || []);
      })
      .finally(() => setManagerLoading(false));
  };
  const fetchCompanyManagers = (params: any) => {
    api.get(GET_MANAGER_COMPANY_ADMIN, params).then(({ data }) => setCompanyManagerList(data));
  };
  const fetchDateRangeTimesheet = (params: any, onSuccess?: () => void) => {
    api.get(GET_INTERN_TIMESHEET_DATE_RANGE, params).then((result) => {
      setTaskDateRange(result?.data?.map((sd: any) => ({ ...sd, uniqueId: generateRandomId(20) })) || []);
      if (onSuccess) onSuccess();
    });
  };
  const fetchTasksInDate = (params: any) => {
    api.get(GET_INTERN_TIMESHEET_DATE, params).then((result) => {
      setTaskInDate(result?.data?.tasks || []);
    });
  };
  const rangeFilter = (date: any) => {
    const currentDate = dayjs();
    let startDate: any;
    let endDate: any;
    switch (date) {
      case "this week":
        startDate = currentDate.startOf("week");
        endDate = currentDate.endOf("week");
        break;
      case "this month":
        startDate = currentDate.startOf("month");
        endDate = currentDate.endOf("month");
        break;
      case "last week":
        startDate = currentDate.subtract(1, "week").startOf("week");
        endDate = currentDate.subtract(1, "week").endOf("week");
        break;
      case "last month":
        startDate = currentDate.subtract(1, "month").startOf("month");
        endDate = currentDate.subtract(1, "month").endOf("month");
        break;
      default:
        const splittedDate = date.split(",");
        startDate = dayjs(splittedDate[0]);
        endDate = dayjs(splittedDate[1]);
        break;
    }

    return { startDate: startDate.format("YYYY-MM-DD"), endDate: endDate.format("YYYY-MM-DD") };
  };
  const generateRandomId = (length: number) => {
    return Array.from({ length }, () => Math.random().toString(36).charAt(2)).join("");
  };
  return {
    fetchManagerUsers,
    managerUserList,
    managerLoading,
    fetchDateRangeTimesheet,
    fetchTasksInDate,
    taskDateRange,
    taskInDate,
    rangeFilter,
    fetchCompanyManagers,
    companyManagerList,
  };
};
export default AdminTimeSheetCustomHook;
