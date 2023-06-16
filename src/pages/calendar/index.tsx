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
<<<<<<< HEAD
  const {
    getCalenderData,
    listCalendar,
    addEvent,
    getAttendeeList,
    updateEvent,
    statusUpdate,
    addReminder,
    updateReminder,
    deleteReminder,
  } = useCustomHook();
=======
  const { getCalenderData, listCalendar, addEvent } = useCustomHook();
>>>>>>> dev

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
<<<<<<< HEAD
    getAttendeeList();
  };

  return (
    <CalendarComp
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      eventData={listCalendar}
      addEvent={addEvent}
      updateEvent={updateEvent}
      statusUpdate={statusUpdate}
      addReminder={addReminder}
      updateReminder={updateReminder}
      deleteReminder={deleteReminder}
      getData={fetchCalenderData}
    />
=======
  };

  return (
    <CalendarComp setStartDate={setStartDate} setEndDate={setEndDate} eventData={listCalendar} addEvent={addEvent} />
>>>>>>> dev
  );
};

export default Index;
