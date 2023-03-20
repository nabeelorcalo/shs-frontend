import FullCalendar from '@fullcalendar/react'
import React, { useState } from 'react';
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from '@fullcalendar/daygrid';
import ResourcePlugin from "@fullcalendar/resource"
import dayjs from 'dayjs';
import { leaveCalendarResorceData, leaveCalendarEventsData } from '../managerMockData';
import './style.scss';
import ManagerCalanderDrawerData from './managerCalanderDrawerData';

const formatDate=(time:any,format:string)=> dayjs(time).format(format)  


const ManagerCalendar = () => {
  const [isOpenCalendarDrawer, setIsOpenCalendarDrawer] = useState<boolean>(false);
  const [eventData, seteventData] = useState({});
  console.log('isOpenCalendarDrawer', isOpenCalendarDrawer);
  console.log('showData', eventData);
  const handleEventContent = (eventInfo: any) => {
    const title = eventInfo?.event?._def?.title;
    const events = eventInfo?.event?._def?.extendedProps;
    const backgroundColor = events?.eventType === 'sick' ?
      'rgba(76, 164, 253, 1)' : events?.eventType === 'casual' ?
        'rgba(255, 193, 93, 1)' : events?.eventType === 'work from home' ?
          'rgba(233, 111, 124, 1)' : 'rgba(74, 157, 119, 1)';
    return (
      <div className="event_styling_wraper rounded-[14px]" style={{ background: backgroundColor }} >
        <p className='m-0 px-3 py-1 text-base'>{title}</p>
      </div>)
  };
  const handleSlotContent = (slotEvent: any) => {

    return (
      <>
        <div className="slot_Top_wrapper">
          <p className="_day font-medium  ">{formatDate(slotEvent?.date,"ddd")}</p>
          <p className='_date font-normal'>{formatDate(slotEvent.date,'DD')}</p>
        </div>
      </>)
  }

  const handleResourceRender = (info: any) => {
    const resource = info?.resource?._resource;
    console.log('resource', resource);

    return (
      <>
        <div className="leave_profile_wrapper flex items-center gap-2">
          <div className='w-[48px] h-[48px] rounded-full profile_wrapper  '>
            <img src={resource?.extendedProps?.img} alt="Profile Image" className=' rounded-full w-full h-full object-cover' />
          </div>
          <p className="_name font-semibold">{resource.title}</p>
          <p className="_designation font-normal">{resource.extendedProps.designation}</p>

        </div>
      </>)
  }

  const handleResourceAreaHeader = (info: any) => {
    return (
      <div className=''>{formatDate("",'MMMM')}</div>
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
              month: 'long',
              year: 'numeric',
              day: 'numeric',
              // weekday: 'long'
            }}
            headerToolbar={{
              start: '',
              center: 'title prev next',
              end: ''
            }}
            resources={leaveCalendarResorceData}
            events={leaveCalendarEventsData}
            eventContent={handleEventContent}
            slotLabelContent={handleSlotContent}
            resourceLabelContent={handleResourceRender}
            slotMinWidth={100}
            resourceAreaWidth={260}
            eventMinWidth={100}
            resourceAreaHeaderContent={handleResourceAreaHeader}
            slotDuration="24:00:00"
            height={'60vh'}
            eventClick={(e: any) => { setIsOpenCalendarDrawer(true); seteventData(e) }}
            slotLabelFormat={[{ day: "2-digit", month: "long", year: "numeric", weekday: "long" }]}
          />
        </div>
      </div>
      <ManagerCalanderDrawerData
        // title={"hello"}
        setIsOpenCalendarDrawer={setIsOpenCalendarDrawer}
        eventData={eventData}
        isOpenCalendarDrawer={isOpenCalendarDrawer} />
    </>
  )
}

export default ManagerCalendar