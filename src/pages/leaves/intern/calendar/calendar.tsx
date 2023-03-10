import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from "react";
import './style.scss'
import ModalWrapper from "./modalWrapper";

const calendarEventData = [
    {
        id: "1",
        title: "Sick",
        eventType: "sick",
        start: "2023-03-03T11:21:00",
        end: "2023-03-03T12:22:00"
    },
    {
        id: "2",
        title: "casual",
        eventType: "casual",
        start: "2023-03-04T01:21:00",
        end: "2023-03-05T05:22:00"
    },
    {
        id: "3",
        title: "work from home",
        eventType: "work from home",
        start: "2023-03-06T06:21:00",
        end: "2023-03-08T07:22:00"
    },
    {
        id: "4",
        title: "medical",
        eventType: "medical",
        start: "2023-03-09T09:21:00",
        end: "2023-03-11T11:22:00"
    }
]
const Calendar = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [eventData, setEventData] = useState({})
    console.log('eventData', eventData);

    // console.log('isEditModalOpen', isEditModalOpen);

    const handleEventContent = (eventInfo: any) => {
        const events = eventInfo?.event?._def?.extendedProps;
        const applyBg2 = document.getElementsByClassName('fc-daygrid-event-harness');

        for (let index = 0; index < applyBg2.length; index++) {
            const element = applyBg2[index].closest('.fc-daygrid-day-frame.fc-scrollgrid-sync-inner');
            // const renderBg = element.closest('.fc-daygrid-day-frame.fc-scrollgrid-sync-inner')
            // switch (eventType) {
            //     case 'sick':
            //         element.classList.add('sick');
            //         break;
            //     case 'casual':
            //         element.classList.add('casual');
            //         break;
            //     case 'work from home':
            //         element.classList.add('work-from-home');
            //         break;
            //     case 'medical':
            //         element.classList.add('medical');
            //         break;

            //     default:
            //         break;
            // }
            let e = events.eventType;
            // console.log(e);

            element?.classList.add(e === 'sick' ? 'sick' : e === 'casual' ? 'casual' : e === 'work from home' ? 'work-from-home' : e === 'medical' ? 'medical' : '');

            // console.log(element);

        }


        const backgroundColor = events?.eventType === 'sick' ? 'rgba(76, 164, 253, 0.25)' : events?.eventType === 'casual' ? 'rgba(255, 193, 93, 0.25)' : events?.eventType === 'work from home' ? 'rgba(233, 111, 124, 0.25)' : events?.eventType === 'medical' ? 'rgba(74, 157, 119, 0.25)' : '';
        const borderColor = events?.eventType === 'Sick' ? 'rgba(76, 164, 253, 1)' : events?.eventType === 'Casual' ? 'rgba(255, 193, 93, 1)' : events?.eventType === 'Work From Home' ? 'rgba(233, 111, 124, 1)' : events?.eventType === 'medical' ? 'rgba(106, 173, 142, 1)' : '';

        return (
            <>

                <div className="events-wrapper " style={{ background: backgroundColor }}>
                    <div style={{ backgroundColor: borderColor }} className="w-full rounded-sm ">dddd</div>
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
                    // eventRender={}
                    views={{
                        dayGridMonth: {
                            backgroundColor: 'red',
                        }
                    }}
                    // eventRender={}
                    events={calendarEventData}
                    eventContent={handleEventContent}
                    eventClick={(e) => {setIsEditModalOpen(true); setEventData(e)}}
                    dateClick={() => setIsAddModalOpen(true)}
                />
            </div>
            <ModalWrapper isEditModalOpen={isEditModalOpen} eventData={eventData} setIsEditModalOpen={setIsEditModalOpen} />
        </>
    )
}
export default Calendar