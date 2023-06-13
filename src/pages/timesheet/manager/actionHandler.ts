import { useRecoilState } from "recoil";
import { managerUserListState, taskDateRangeState, taskInDateState } from "../../../store/timesheet";
import api from "../../../api";
import endpoints from "../../../config/apiEndpoints";
import dayjs from "dayjs";

const ManagerTimeSheetCustomHook = () => {
  const [managerUserList, setManagerUserList] = useRecoilState(managerUserListState);
  const [taskDateRange, setTaskDateRange] = useRecoilState(taskDateRangeState);
  const [taskInDate, setTaskInDate] = useRecoilState(taskInDateState);

  const { GET_INTERN_TIMESHEET_USERS, GET_INTERN_TIMESHEET_DATE_RANGE, GET_INTERN_TIMESHEET_DATE } = endpoints;

  const fetchManagerUsers = (params: any) => {
    api.get(GET_INTERN_TIMESHEET_USERS, params).then((result) => {
      setManagerUserList(result?.data || []);
    });
  };
  const fetchDateRangeTimesheet = (params: any) => {
    api.get(GET_INTERN_TIMESHEET_DATE_RANGE, params).then((result) => {
      setTaskDateRange(result?.data || []);
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
  return {
    fetchManagerUsers,
    managerUserList,
    fetchDateRangeTimesheet,
    fetchTasksInDate,
    taskDateRange,
    taskInDate,
    rangeFilter,
  };
};
export default ManagerTimeSheetCustomHook;
