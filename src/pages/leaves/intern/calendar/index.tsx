import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import { useCallback, useEffect, useState } from "react";
import './style.scss'
import CalendarDataDrawer from "./calendarDataDrawer";
import { LeaveRequest } from "../../../../components";
import { Form } from "antd";
// import { calendarEventData } from "./calendarMockData";
import useCustomHook from "../../actionHandler";
import { currentUserState } from "../../../../store";
import { useRecoilValue } from "recoil";
import dayjs from "dayjs";

let newDate: any;
const Calendar = () => {
    const action = useCustomHook();
    const getCalendarDate = (date: any) => {
        let newDate = { start: dayjs(date?.startStr).format('YYYY-MM-DD'), end: dayjs(date?.endStr).format('YYYY-MM-DD') }
        // action.getCalendarLeaveList(newDate)
    }
    // useEffect(() => {
    //     if (!newDate) {
    //         action.getCalendarLeaveList()
    //         newDate = new Date()
    //     };
    // }, [newDate])
    const cruntUserState = useRecoilValue(currentUserState);
    const calendarEvent = action.getCalanderLeaveState?.map((item: any) => ({
        id: item?.id,
        title: item?.type,
        eventType: item?.type,
        start: item?.dateFrom,
        end: item?.dateTo,
        leaveTypeDay: item?.durationType,
        dur: "01 day" ,
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
    console.log('calendarEvent', calendarEvent);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isOpenCalendarDrawer, setIsOpenCalendarDrawer] = useState(false);
    const [eventData, setEventData] = useState({});
    // console.log('eventData', eventData);
    const [form] = Form.useForm();

    // console.log('isEditModalOpen', isEditModalOpen);
    const handleEventContent = (eventInfo: any) => {
        const events = eventInfo?.event?._def?.extendedProps;
        // console.log(events,"eventseventseventseventsevents");
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

                    events={(info, successCallback) => {
                        successCallback(calendarEvent);
                        getCalendarDate(info);
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
                isOpenCalendarDrawer={isOpenCalendarDrawer} />
            <LeaveRequest
                title="Leave Request"
                open={isAddModalOpen}
                setIsAddModalOpen={setIsAddModalOpen}
                onsubmitLeaveRequest={action.onsubmitLeaveRequest}
            // onLeaveFormValuesChange={action.onLeaveFormValuesChange}
            />
        </>
    )
}
export default Calendar