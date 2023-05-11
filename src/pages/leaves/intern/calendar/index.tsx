import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from "react";
import './style.scss'
import CalendarDataDrawer from "./calendarDataDrawer";
import { LeaveRequest } from "../../../../components";
import { Form } from "antd";
// import { calendarEventData } from "./calendarMockData";
import useCustomHook from "../../actionHandler";

const Calendar = () => {
    const action = useCustomHook();
    // console.log(action.getCalanderLeaveState,"Leaev From Action ");
    const calendarEvent = action.getCalanderLeaveState?.map((item:any) => ({
        ...item,
        start: item?.dateFrom,
        end: item?.dateTo
    }))  
    console.log('calendarEvent', calendarEvent);
    
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isOpenCalendarDrawer, setIsOpenCalendarDrawer] = useState(false);
    const [eventData, setEventData] = useState({});
    console.log('eventData', eventData);
    const [form] = Form.useForm();
   
    // console.log('isEditModalOpen', isEditModalOpen);
    const handleEventContent = (eventInfo: any) => {
        const events = eventInfo?.event?._def?.extendedProps;
        console.log(events,"eventseventseventseventsevents");
        const backgroundColor = events?.type === 'SICK' ?
            'rgba(76, 164, 253, 1)' : events?.type === 'CASUAL' ?
                'rgba(255, 193, 93, 1)' : events?.type === 'WFH' ?
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
                    events={calendarEvent}
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
                onLeaveFormValuesChange={action.onLeaveFormValuesChange}
            />
        </>
    )
}
export default Calendar