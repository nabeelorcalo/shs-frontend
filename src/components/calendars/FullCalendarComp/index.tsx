import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { PageHeader } from "../../PageHeader";
import dayjs from "dayjs";
import { BoxWrapper } from "../../BoxWrapper/BoxWrapper";
import './style.scss';
import { Button } from "antd";

const Index = () => {
  const events = [
    {
      id: "1",
      title: "Post UI UX Meeting",
      start: "2023-03-21T01:51:00",
      end: "2023-03-21T02:51:00",
      category: "meeting",
    },
    {
      id: "2",
      title: "UI UX post oppertunity",
      start: "2023-03-21T03:00:00",
      end: "2023-03-21T04:05:00",
      category: "interview"
    },
    {
      id: "3",
      title: "annual fee submission",
      start: "2023-03-24T03:51:00",
      end: "2023-03-24T06:51:00",
      category: "event"
    },
    {
      id: "4",
      title: "Post UI UX Meeting",
      start: "2023-03-25T01:51:00",
      end: "2023-03-25T01:51:00",
    }
  ];

  const renderEventColor: any = {
    'meeting': '#E94E5D',
    'interview': '#5879CE',
    'event': '#FFC15D',
  }

  const handleEventContent = (info: any) => {
    const events = info?.event?._def;
    const { start, end } = info?.event?._instance?.range;
    const category = events?.extendedProps?.category;
    return (
      <div className="event-content"
        style={{ borderLeft: `2px solid ${renderEventColor[category] ? renderEventColor[category] : '#4E4B66'}` }}
      >
        <h2 className="title text-[14px] capitalize break-words font-normal m-0">{events?.title}</h2>
        <p className="duration text-[14px] mt-[5px]">{dayjs(start).format('HH:MM')} - {dayjs(end).format('HH:MM')}</p>
        <div className="event-btn gap-3">
          <Button size="small" className={`btn capitalize btn-primary`}>
            edit
          </Button>

          <Button size="small" className={`btn capitalize`}>
            cancel
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='role-calendar-wrapper'>

      <PageHeader title={'Calendar'} bordered />

      <BoxWrapper boxShadow="0px 0px 8px 2px rgba(9, 161, 218, 0.1)" className="rounded-[10px]">
        <FullCalendar
          initialView="timeGridWeek"
          headerToolbar={{ left: "title prev next", right: "timeGridWeek timeGridDay" }}
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          allDaySlot={false}
          height="63vh"
          slotDuration="00:60:00"
          eventContent={handleEventContent}
          events={events}
          views={{
            week: {
              dayHeaderContent: (args) => {
                return (
                  <div className="mb-[20px]">
                    <p className="pb-2 text-[#14142A] text-base font-semibold">{dayjs(args.date).format('ddd')}</p>
                    <p className="text-[#4E4B66] text-base font-semibold">{dayjs(args.date).format('D')}</p>
                  </div>
                )
              }
            }
          }}
        />
      </BoxWrapper>
    </div>
  )
}

export default Index