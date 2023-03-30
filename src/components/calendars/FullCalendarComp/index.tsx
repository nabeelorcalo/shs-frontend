import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { PageHeader } from "../../PageHeader";
import dayjs from "dayjs";
import { Button } from "antd";
import './style.scss';
import CalendarModalBox from "./modalBox";
import CalendarDrawer from './drawerComp/index'
import { calendarMockData } from "./mockData";

const Index = () => {

  const [openModal, setOpenModal] = useState(false);

  const [openDrawer, setOpenDrawer] = useState<any>({ open: false, category: '', eventId: '', status: '' });

  console.log(openDrawer);


  const renderEventColor: any = {
    'meeting': '#E94E5D',
    'interview': '#5879CE',
    'reminder': '#FFC15D',
  };
  const handleEventClick = (id: string, category: string, status: string) => {
    console.log(category);
    setOpenDrawer({ open: !openDrawer.open, category, eventId: id, status })
  }

  const handleEditClick = (id: string, type: string) => { }

  const handleCancelClick = (id: string, type: string) => { }

  const handleEventContent = (info: any) => {
    const events = info?.event?._def;
    const { category, status } = events?.extendedProps;

    return (
      <div className="event-content"
        style={{ borderLeft: `2px solid ${renderEventColor[category] ? renderEventColor[category] : '#4E4B66'}` }}
      >
        <div className="content" onClick={() => handleEventClick(events?.publicId, category, status)}>
          <h2 className="title text-[14px] capitalize break-words font-normal m-0">{events?.title}</h2>
          <p className="duration text-[14px] mt-[5px]">{info?.timeText}</p>
          <p className="duration text-[14px] mt-[5px]">{dayjs().format('DD:MM:YYYY')}</p>
        </div>
        <div className="event-btn gap-3">
          {category === 'meeting' ?
            <>
              <Button size="small" className={`btn capitalize btn-primary`}>
                {status === 'pending' ? 'edit' : status === 'accept' ? 'accept' : status === 'accepted' && 'accepted'}
              </Button>
              <Button size="small" className={`btn capitalize`}>
                {status === 'pending' ? 'cancel' : 'decline'}
              </Button>
            </>
            :
            category === 'interview' ?
              <>
                <Button size="small" className={`btn capitalize btn-primary`}>
                  accept
                </Button>
                <Button size="small" className={`btn capitalize`}>
                  decline
                </Button>
              </>
              :
              category === 'reminder' && <>
                <Button size="small" className={`btn capitalize btn-primary`}>
                  edit
                </Button>
                <Button size="small" className={`btn capitalize`}>
                  delete
                </Button>
              </>
          }
        </div>
      </div>
    )
  }

  return (
    <div className='role-calendar-wrapper'>

      <PageHeader title={'Calendar'} bordered />

      <div className="flex justify-center gap-7">
        {['meeting', 'interview', 'reminder'].map((name: string) => <p className="flex items-center gap-3">
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
        events={calendarMockData}
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
      <CalendarDrawer
        open={openDrawer.open}
        category={openDrawer.category}
        setOpen={setOpenDrawer}
        eventId={openDrawer.eventId}
        status={openDrawer.status}
      />
      <CalendarModalBox open={openModal} setOpen={setOpenModal} />
    </div>
  )
}

export default Index