import { useRecoilState } from "recoil";
import api from "../../../api";
import endpoints from "../../../config/apiEndpoints";
import {
  addedTaskIdState,
  categoriesGraphDataState,
  categoriesListState,
  internTimelineState,
  internTimesheetTasksState,
  taskDateRangeState,
  taskInDateState,
} from "../../../store/timesheet";
import dayjs from "dayjs";
import { Notifications } from "../../../components";
import { useState } from "react";

const InternTimeSheetHook = () => {
  const [timesheetTasks, setTimesheetTasks] = useRecoilState(internTimesheetTasksState);
  const [graphData, setGraphData] = useRecoilState<any>(categoriesGraphDataState);
  const [categoriesList, setCategoriesList] = useRecoilState(categoriesListState);
  const [taskDateRange, setTaskDateRange] = useRecoilState(taskDateRangeState);
  const [taskInDate, setTaskInDate] = useRecoilState(taskInDateState);
  const [timelineData, setTimelineData] = useRecoilState(internTimelineState);
  const [addedId, setAddedId] = useRecoilState(addedTaskIdState);
  const [colorFiled, setColorField] = useState<any>([]);
  const {
    GET_INTERN_TIMESHEET_CATEGORIES,
    TIMESHEET_FIND_ALL,
    GET_INTERN_TIMESHEET_DATE_RANGE,
    GET_INTERN_TIMESHEET_DATE,
    GET_INTERN_TIMESHEET_TIMELINE,
    INTERN_ADD_TIMESHEET,
    INTERN_EDIT_TIMESHEET,
  } = endpoints;
  const timeSpans = [
    { start: 0, end: 3 },
    { start: 3, end: 6 },
    { start: 6, end: 9 },
    { start: 9, end: 12 },
    { start: 12, end: 15 },
    { start: 15, end: 18 },
    { start: 18, end: 21 },
    { start: 21, end: 24 },
  ];
  const fetchTasks = (params: any) => {
    api.get(GET_INTERN_TIMESHEET_CATEGORIES, params).then((result) => {
      setTimesheetTasks(result?.data);
      if (Object.keys(result?.data?.totalTimeByCatgory).length) {
        const [hours, minutes, seconds] = result?.data?.totalTime.split(":").map(Number);
        const totalSeconds = (hours * 60 + minutes) * 60 + seconds || 1;
        const colors: any = [];
        setGraphData(
          Object.entries(result?.data?.totalTimeByCatgory || {}).map(([type, value]: any) => {
            const [valueHours, valueMinutes, valueSeconds] = value.split(":").map(Number);
            const valueSecondsTotal = (valueHours * 60 + valueMinutes) * 60 + valueSeconds;
            const percentage = (valueSecondsTotal / totalSeconds) * 100;
            if (type?.toLowerCase()?.includes("design")) colors.push("#5D89F4");
            else if (type?.toLowerCase()?.includes("development")) colors.push("#E76864");
            else colors.push("#FFC200");
            return {
              type,
              value: percentage,
            };
          })
        );
        colorFiled.push(...colors);
      }
    });
  };
  const fetchCategories = () => {
    api.get(TIMESHEET_FIND_ALL, { page: 1, limit: 100 }).then(({ data }) => setCategoriesList(data));
  };
  const fetchDateRangeTimesheet = (params: any, onSuccess?: () => void) => {
    api.get(GET_INTERN_TIMESHEET_DATE_RANGE, params).then((result) => {
      setTaskDateRange(result?.data || []);
      if (onSuccess) onSuccess();
    });
  };
  const fetchTasksInDate = (params: any) => {
    api.get(GET_INTERN_TIMESHEET_DATE, params).then((result) => {
      setTaskInDate(result?.data?.tasks || []);
    });
  };
  const fetchInternTimeline = (params: any) => {
    api.get(GET_INTERN_TIMESHEET_TIMELINE, params).then((result) => {
      // const sortedData = result?.data?.sort((a: any, b: any) => new Date(a?.startTime) - new Date(b?.startTime));
      setTimelineData(
        result?.data?.map((obj: any) => {
          return {
            id: obj?.id,
            resourceIds: ["a"],
            title: obj?.taskName,
            start: dayjs(obj?.startTime).add(1, "hour").toISOString(),
            end: dayjs(obj?.endTime).add(1, "hour").toISOString(),
            date: obj?.taskDate,
            type: obj?.taskCategory,
          };
        }) || []
      );
    });
  };

  const addTask = (params: any) => {
    api.post(INTERN_ADD_TIMESHEET, params).then((result: any) => {
      if (result.data) setAddedId(result.data.id);
    });
  };
  const updateTask = (params: any, onSuccess?: () => void) => {
    api.patch(INTERN_EDIT_TIMESHEET, params).then((result: any) => {
      setAddedId("");
      if (result.error)
        Notifications({
          title: "Error",
          description: result.message || result.error,
          type: "error",
        });
      else
        Notifications({
          title: "Success",
          description: result.message,
          type: "success",
        });
      if (onSuccess) {
        onSuccess(); // Call the onSuccess callback if provided
      }
      return result;
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
    fetchTasks,
    timesheetTasks,
    graphData,
    fetchCategories,
    categoriesList,
    taskDateRange,
    taskInDate,
    fetchDateRangeTimesheet,
    fetchTasksInDate,
    rangeFilter,
    fetchInternTimeline,
    timelineData,
    addTask,
    addedId,
    updateTask,
    colorFiled,
  };
};

export default InternTimeSheetHook;
