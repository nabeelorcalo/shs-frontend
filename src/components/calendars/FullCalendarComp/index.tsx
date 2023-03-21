import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { PageHeader } from "../../PageHeader";
import dayjs from "dayjs";
import './style.scss';
import { BoxWrapper } from "../../BoxWrapper/BoxWrapper";

const Index = () => {
  const events = [
    {
      id: "1",
      title: "Post UI UX Meeting",
      start: "2023-03-21T01:51:00",
      end: "2023-03-21T01:51:00",
    },
    {
      id: "2",
      title: "Post UI UX Meeting",
      start: "2023-03-23T01:51:00",
      end: "2023-03-23T01:51:00",
    }
  ];

  const handleEventContent = (info: any) => {
    const events = info?.event?._def
    console.log("info", info)
    return (
      <div className="event-content bg-white text-[#14142A] w-full h-full px-5 py-4">
        <h2 className="text-[14px] font-normal m-0">{events?.title}</h2>
        <p className="text-[14px] text-[#4E4B66] m-0">09:00 - 10:00</p>
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

      {/* // slotLabelFormat={[{ day: "2-digit", month: "long", year: "numeric", weekday: "long" }]}
      // slotLabelContent={(conternt: any) => <div>gfgfgfg</div>}
      // events={newEventsArray}
      // eventContent={eventContentHandler}
      // eventClick={(e: any) => handleEventClick(e)}  */}
      {/* /> */}
    </div>
  )
}

export default Index