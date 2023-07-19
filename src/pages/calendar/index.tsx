import CalendarComp from "../../components/calendars/FullCalendarComp/index";
import { calendarMockData } from "../../components/calendars/FullCalendarComp/mockData";
import { useEffect, useState } from "react";
import useCustomHook from "./actionHandler";
import dayjs from "dayjs";
const Index = () => {
  const roleToShow: any = {
    // 'manager':
    // 'student':
    // 'intern':
  };
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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
    notifyAttendees,
  } = useCustomHook();

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
      notifyAttendees={notifyAttendees}
      getData={fetchCalenderData}
    />
  );
};

export default Index;
