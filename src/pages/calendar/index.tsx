import CalendarComp from "../../components/calendars/FullCalendarComp/index";
import { calendarMockData } from "../../components/calendars/FullCalendarComp/mockData";
import { useEffect, useState } from "react";
import useCustomHook from "./actionHandler";
import * as dayjs from "dayjs";
const Index = () => {
  const roleToShow: any = {
    // 'manager':
    // 'student':
    // 'intern':
  };
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { getCalenderData, listCalendar } = useCustomHook();

  useEffect(() => {
    fetchCalenderData();
  }, [startDate]);

  const fetchCalenderData = () => {
    let params: any = {
      currentDate: dayjs().format("YYYY-MM-DD"),
      filterType: "THIS_WEEK",
    };
    if (startDate)
      params = {
        currentDate: dayjs().format("YYYY-MM-DD"),
        filterType: "DATE_RANGE",
        startDate,
        endDate,
      };
    getCalenderData(params);
  };

  return <CalendarComp setStartDate={setStartDate} setEndDate={setEndDate} eventData={listCalendar} />;
};

export default Index;
