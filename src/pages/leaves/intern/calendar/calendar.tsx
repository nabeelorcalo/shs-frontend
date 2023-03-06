import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import { useState } from "react";
import './style.scss'

const calendarEventData = [
    {
        id: "1",
        title: "Sick",
        eventType: "Sick",
        start: "2023-03-06T11:21:00",
        end: "2023-03-07T11:22:00"
    }
]
const Calendar = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const handleEventContent = (eventInfo: any) => {
        const events = eventInfo?.event?._def?.extendedProps
        const backgroundColor = events?.eventType === 'Sick' ? 'rgba(76, 164, 253, 0.25)' : events?.eventType === 'Casual' ? 'rgba(255, 193, 93, 0.1)' : events?.eventType === 'Work From Home' ? 'rgba(233, 111, 124, 0.1)' : events?.eventType === 'medical' ? 'rgba(106, 173, 142, 0.1)' : '';
        return (
            <>
                <div className="events-wrapper" style={{background: backgroundColor}}>
                    sadasda
                </div>
            
            </>
        )
    }
    return (
        <>
            <div className="calander_main_wrapper">
                <FullCalendar
                    plugins={[dayGridPlugin]}
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
                    events={calendarEventData}
                    eventContent={handleEventContent}

                />
            </div>
        </>
    )
}
export default Calendar