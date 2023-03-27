import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { PageHeader } from "../../PageHeader";
import dayjs from "dayjs";
import { Button } from "antd";
import './style.scss';
import Drawer from "../../Drawer";
import CalendarModalBox from "./modalBox";

const Index = () => {

  const [openModal, setOpenModal] = useState(false);

  const events = [
    {
      id: "2",
      title: "UI UX post oppertunity",
      start: "2023-03-21T01:30:00",
      end: "2023-03-21T02:00:00",
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
      end: "2023-03-25T02:51:00",
    },
    {
      id: "5",
      title: "UI UX post oppertunity",
      start: "2023-03-22T01:30:00",
      end: "2023-03-22T02:00:00",
      category: "interview"
    },
  ];

  const renderEventColor: any = {
    'meeting': '#E94E5D',
    'interview': '#5879CE',
    'event': '#FFC15D',
  }

  const handleEventContent = (info: any) => {
    const events = info?.event?._def;
    const category = events?.extendedProps?.category;
    return (
      <div className="event-content"
        style={{ borderLeft: `2px solid ${renderEventColor[category] ? renderEventColor[category] : '#4E4B66'}` }}
      >
        <div className="content">
          <h2 className="title text-[14px] capitalize break-words font-normal m-0">{events?.title}</h2>
          <p className="duration text-[14px] mt-[5px]">{info?.timeText}</p>
          <p className="duration text-[14px] mt-[5px]">{dayjs().format('DD:MM:YYYY')}</p>
        </div>
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

      <div className="flex justify-center gap-7">
        {['meeting', 'interview', 'event'].map((name: string) => <p className="flex items-center gap-3">
          <span className="h-[12px] w-[12px] rounded-[4px] inline-block" style={{ background: renderEventColor[name] }}></span>
          <span className="capitalize text-sm text-[#4E4B66]">{name}</span>
        </p>)}
      </div>
      <FullCalendar
        initialView={'timeGridWeek'}
        customButtons={{
          myCustomBtn: {
            text: 'Add Event',
            click: () => setOpenModal(!openModal)
          }
        }}
        headerToolbar={{ left: "title prev next", right: "myCustomBtn timeGridWeek timeGridDay" }}
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
          },
          day: {
            dayHeaderContent: (args) => {
              return (
                <div className="mb-[20px] text-base font-semibold text-[#14142A]">
                  <p>{dayjs(args.date).format('ddd')}</p>
                  <p>{dayjs(args.date).format('D')}</p>
                </div>
              )
            }
          }
        }}
      />
      <Drawer open={false} width={'500px'} title='interview detail'>

      </Drawer>

      <CalendarModalBox open={openModal} setOpen={setOpenModal} />
    </div>
  )
}

export default Index