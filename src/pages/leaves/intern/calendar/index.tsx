import { useCallback, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useRecoilValue } from "recoil";
import { Form } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import useCustomHook from "../../actionHandler";
import { currentUserState } from "../../../../store";
import CalendarDataDrawer from "./calendarDataDrawer";
import { LeaveRequest } from "../../../../components";
import "./style.scss";

dayjs.extend(utc);

const Calendar = (props: any) => {
  // Variable declaration block
  // ------------------------------------------------
  const { setStartDate, setEndDate, fetchLeaveCalendar } = props;
  const cruntUserState = useRecoilValue(currentUserState);
  const { getCalendarLeaveList, getCalanderLeaveState, onsubmitLeaveRequest, getLeaveDetailById, leaveDetail, getLeaveTypes } = useCustomHook();
  const internID = cruntUserState?.intern?.id;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isOpenCalendarDrawer, setIsOpenCalendarDrawer] = useState(false);
  const [eventData, setEventData] = useState<any>({});
  const [form] = Form.useForm();
  const utcOffsetInMinutes = new Date().getTimezoneOffset();
  // React Hooks defination block
  // ------------------------------------------------

  // Custom functions defination block
  // ------------------------------------------------

  const getCalendarDate = (date: any) => {
    let newDate = { start: dayjs(date?.startStr).format("YYYY-MM-DD"), end: dayjs(date?.endStr).format("YYYY-MM-DD") };
    // action.getCalendarLeaveList(newDate)
  };

  const calendarEvent = getCalanderLeaveState?.map((item: any) => ({
    id: item?.id,
    title: item?.type,
    eventType: item?.type?.toUpperCase(),
    start: item?.dateFrom,
    end: dayjs.utc(item?.dateTo).add(utcOffsetInMinutes, "minute").local().toISOString(),
    leaveTypeDay: item?.durationType === "FULL_DAY" ? "full day" : "half day",
    dur: `${item?.duration} day${item?.duration != 1 ? "s" : ""}`,
    hours: dayjs.duration(dayjs(item?.timeTo).diff(dayjs(item?.timeFrom))).format("HH:mm"),
    // img: LeaveProfileImg,
    name: `${cruntUserState?.firstName} ${cruntUserState?.lastName} `,
    designation: "UI UX Designer",
    email: cruntUserState?.email,
    aprover: `${item?.approver?.firstName} ${item?.approver?.lastName}`,
    ApprovedBy: null,
    status: item?.status,
    description: item?.reason,
  }));
  const handleDatesSet = (arg: any) => {
    if (setStartDate && setEndDate) {
      setStartDate(dayjs(arg.start).endOf("day").format("YYYY-MM-DD"));
      setEndDate(dayjs(arg.end).endOf("day").format("YYYY-MM-DD"));
    }
  };

  const handleEventContent = (eventInfo: any) => {
    const events = eventInfo?.event?._def?.extendedProps;
    const backgroundColor =
      events?.eventType === "SICK"
        ? "rgba(76, 164, 253, 1)"
        : events?.eventType === "CASUAL"
        ? "rgba(255, 193, 93, 1)"
        : events?.eventType === "WORK FROM HOME"
        ? "rgba(233, 111, 124, 1)"
        : "rgba(74, 157, 119, 1)";

    return (
      <>
        <div className="events-wrapper " style={{ background: backgroundColor }}>
          <div className="w-full  p-[4px] rounded-md "></div>
        </div>
      </>
    );
  };

  // Return block
  // ------------------------------------------------

  return (
    <>
      <div className="calander_main_wrapper">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: "",
            center: "prev title next",
            end: "myCustomButton",
          }}
          customButtons={{
            myCustomButton: {
              text: "Request Leaves",
              click: () => setIsAddModalOpen(true),
            },
          }}
          titleFormat={{
            month: "short",
            year: "numeric",
          }}
          events={calendarEvent}
          // events={(date, successCallback) => {
          //   // successCallback(calendarEvent); // By Jawad sadiq
          //   getCalendarDate(date);
          // }}
          eventContent={handleEventContent}
          datesSet={handleDatesSet}
          eventClick={(e: any) => {
            getLeaveDetailById(e?.event?._def?.publicId);
            setIsOpenCalendarDrawer(true);
            setEventData(e);
          }}
          // dateClick={() => setIsAddModalOpen(true)}
        />
      </div>

      <CalendarDataDrawer
        // title={"hello"}
        setIsOpenCalendarDrawer={setIsOpenCalendarDrawer}
        eventData={eventData}
        isOpenCalendarDrawer={isOpenCalendarDrawer}
      />

      <LeaveRequest
        title="Leave Request"
        open={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        onsubmitLeaveRequest={onsubmitLeaveRequest}
        data={null}
        getLeaveTypes={getLeaveTypes}
        fetchLeaveCalendar={fetchLeaveCalendar}
      />
    </>
  );
};
export default Calendar;
