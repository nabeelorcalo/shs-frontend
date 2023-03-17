import FullCalendar from '@fullcalendar/react'
import React, { useState } from 'react';
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from '@fullcalendar/daygrid';
import ResourcePlugin from "@fullcalendar/resource"
import dayjs from 'dayjs';
import { leaveCalendarResorceData, leaveCalendarEventsData } from '../managerMockData';
import './style.scss';

const ManagerCalendar = () => {
  const [isShowModalOpen, setIsShowModalOpen] = useState<boolean>(false);
  const [showData, setShowData] = useState({});
  console.log('isShowModalOpen', isShowModalOpen);
  console.log('showData', showData);
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
          <p className="_day font-medium  ">{dayjs(slotEvent?.date).format("ddd")}</p>
          <p className='_date font-normal'>{dayjs(slotEvent.date).format('DD')}</p>
        </div>
      </>)
  }

  const handleResourceRender = (info: any) => {
    const resource = info?.resource?._resource;
    console.log('resource', resource);

    return (
      <>
        <div className="leave_profile_wrapper flex items-center gap-2">
          <div className='w-[48px] h-[48px] rounded-full '>
            <img src={resource?.extendedProps?.img} alt="Profile Image" className=' rounded-full w-full h-full object-cover' />
          </div>
          <p className="_name font-semibold">{resource.title}</p>
          <p className="_designation font-normal">{resource.extendedProps.designation}</p>

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
            resources={leaveCalendarResorceData}
            events={leaveCalendarEventsData}
            eventContent={handleEventContent}
            slotLabelContent={handleSlotContent}
            resourceLabelContent={handleResourceRender}
            slotMinWidth={100}
            resourceAreaWidth={300}
            eventMinWidth={100}
            resourceAreaHeaderContent={handleResourceAreaHeader}
            slotDuration="24:00:00"
            height={'55vh'}
            eventClick={(e: any) => { setIsShowModalOpen(true); setShowData(e) }}
            slotLabelFormat={[{ day: "2-digit", month: "long", year: "numeric", weekday: "long" }]}
          />
        </div>
      </div>

      
    </>
  )
}

export default ManagerCalendar