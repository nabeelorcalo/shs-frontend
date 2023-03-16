import FullCalendar from '@fullcalendar/react'
import React from 'react';
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from '@fullcalendar/daygrid';
import ResourcePlugin from "@fullcalendar/resource"
import dayjs from 'dayjs';
import { clientBookingCalendarData, clientBookingEventsData } from '../managerMockData';
import './style.scss';

const MAnagerCalendar = () => {
  const handleEventContent = (eventInfo: any) => {
    const events = eventInfo?.event?._def?.extendedProps
    return (
      <div className="care-booking-event-wrap">
        <div className='event-icon d-flex align-center justify-between'>
          {/* <img src={SunIcon} alt="" />
          <img src={ActionIcon} alt="" /> */}
        </div>
        <div className='event-content d-flex align-center w-100 snow-white-color'>
          <div className='d-flex flex-column' style={{ gap: "5px" }}>
            <h2 className='fs-14 fw-600 m-0 line-height-18'>Total Shifts: <span className='fs-12 fw-400 m-0 line-height-18'>{events?.totalShift}</span></h2>
            <h2 className='fs-14 fw-600 m-0 line-height-18'>Shifts Interval</h2>
          </div>
          <div className='d-flex flex-column' style={{ gap: "5px" }}>
            <h2 className='fs-14 fw-600 m-0 line-height-18'>Total Shifts: <span className='fs-12 fw-400 m-0 line-height-18'>{events?.totalCarers}</span></h2>
            <p className='fs-12 fw-400 m-0 line-height-18'>(1:00 am to 9:00 am)</p>
          </div>
        </div>
      </div>)
  };
  const handleSlotContent = (slotEvent: any) => {

    return (
      <>
        <div className="slot-event-wrapper">
          <div className="d-flex align-center" style={{ gap: "5px" }}>
            <span className="title-color m-0 font-extrabold">{dayjs(slotEvent?.date).format("ddd")}</span>
            <p>{dayjs(slotEvent.date).format('DD')}</p>
          </div>
        </div>
      </>)
  }

  const handleResourceRender = (info: any) => {
    const resource = info?.resource?._resource;
    console.log('resource', resource);

    return (
      <>
        <div className="resource-render-wrapper flex items-center gap-2">
          <div className='w-[48px] h-[48px] rounded-full '>
            <img src={resource?.extendedProps?.img} alt="Profile Image" className=' rounded-full w-full h-full object-cover' />
          </div>

          <p className="title-color fs-14 fw-400 line-height-20 cursor-pointer m-0">{resource.title}</p>
          <p className="title-color fs-14 fw-400 line-height-20 cursor-pointer m-0">{resource.extendedProps.designation}</p>

        </div>
      </>)
  }

  const handleResourceAreaHeader = (info: any) => {
    return (
      <div className=''>{dayjs().format('MMMM')}</div>
    )
  }

  return (
    <>
      <div className='manage_calendar_wrapper bg-white p-4'>
        <div className='manage_calendar_content'>
          <FullCalendar
            schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
            plugins={[resourceTimelinePlugin, interactionPlugin, dayGridPlugin, ResourcePlugin]}
            initialView="resourceTimelineWeek"
            titleFormat={{
              month: 'short',
              day: 'numeric',
              weekday: 'short'
            }}
            resources={clientBookingCalendarData}
            events={clientBookingEventsData}
            slotLabelContent={handleSlotContent}
            resourceLabelContent={handleResourceRender}
            editable={true}
            droppable={true}
            slotMinWidth={100}
            resourceAreaWidth={300}
            eventMinWidth={100}
            resourceAreaHeaderContent={handleResourceAreaHeader}
            slotDuration="24:00:00"
            // eventBorderColor=""
            // slotLabelInterval="02:00:00"
            slotLabelFormat={[{ day: "2-digit", month: "long", year: "numeric", weekday: "long" }]}
          />
        </div>
      </div>
    </>
  )
}

export default MAnagerCalendar