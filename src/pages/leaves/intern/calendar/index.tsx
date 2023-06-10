import { useCallback, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import { useRecoilValue } from "recoil";
import { Form } from "antd";
import dayjs from "dayjs";
import useCustomHook from "../../actionHandler";
import { currentUserState } from "../../../../store";
import CalendarDataDrawer from "./calendarDataDrawer";
import { LeaveRequest } from "../../../../components";
import './style.scss'

const Calendar = () => {
  // Variable declaration block
  // ------------------------------------------------
  const cruntUserState = useRecoilValue(currentUserState);
  const { getCalendarLeaveList, getCalanderLeaveState, onsubmitLeaveRequest } = useCustomHook();
  const internID = cruntUserState?.intern?.id;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isOpenCalendarDrawer, setIsOpenCalendarDrawer] = useState(false);
  const [eventData, setEventData] = useState({});
  const [form] = Form.useForm();

  // React Hooks defination block
  // ------------------------------------------------
  useEffect(() => {
    getCalendarLeaveList();
  }, [])

  // Custom functions defination block
  // ------------------------------------------------
  const getCalendarDate = (date: any) => {
    let newDate = { start: dayjs(date?.startStr).format('YYYY-MM-DD'), end: dayjs(date?.endStr).format('YYYY-MM-DD') }
    // action.getCalendarLeaveList(newDate)
  }

  const calendarEvent = getCalanderLeaveState?.map((item: any) => ({
    id: item?.id,
    title: item?.type,
    eventType: item?.type,
    start: item?.dateFrom,
    end: item?.dateTo,
    leaveTypeDay: item?.durationType,
    dur: "01 day",
    hours: "04:00",
    // img: LeaveProfileImg,
    name: `${cruntUserState?.firstName} ${cruntUserState?.lastName} `,
    designation: "UI UX Designer",
    email: cruntUserState?.email,
    aprover: "Amelia Clark",
    ApprovedBy: item?.approvedBy,
    status: item?.status,
    description: item?.reason
  }))

  const handleEventContent = (eventInfo: any) => {
    const events = eventInfo?.event?._def?.extendedProps;
    const backgroundColor = events?.eventType === 'SICK' ?
      'rgba(76, 164, 253, 1)' : events?.eventType === 'CASUAL' ?
        'rgba(255, 193, 93, 1)' : events?.eventType === 'WFH' ?
          'rgba(233, 111, 124, 1)' : 'rgba(74, 157, 119, 1)';

    return (
      <>
        <div className="events-wrapper " style={{ background: backgroundColor }}>
          <div className="w-full  p-[4px] rounded-md "></div>
        </div>
      </>
    )
  }

  // Return block
  // ------------------------------------------------
  return (
    <>
      <div className="calander_main_wrapper">

        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: '',
            center: 'prev title next',
            end: 'myCustomButton'
          }}
          customButtons={{
            myCustomButton: {
              text: 'Request Leaves',
              click: () => setIsAddModalOpen(true)
            }
          }}
          titleFormat={{
            month: "short",
            year: "numeric"
          }}
          // events={calendarEvent}

          events={(date, successCallback) => {
            // successCallback(calendarEvent); // By Jawad sadiq
            getCalendarDate(date);
          }}

          eventContent={handleEventContent}
          eventClick={(e) => { setIsOpenCalendarDrawer(true); setEventData(e) }}
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
        // onLeaveFormValuesChange={action.onLeaveFormValuesChange}
      />

    </>
  )
}
export default Calendar