import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from '@fullcalendar/daygrid';
import ResourcePlugin from "@fullcalendar/resource"
import FullCalendar from '@fullcalendar/react';
import { BoxWrapper } from "../../../components";
import './style.scss';
import dayjs from "dayjs";
import { renderBg } from "../actionHandler";

const RenderLabelContent = (labelContent: any) => {
  return (
    <div>{dayjs(labelContent.date).format('HH:MM')}</div>
  )
}

const events = [
  {
    id: "1",
    resourceIds: ["a"],
    title: "designing",
    start: "2023-03-20T01:39:00",
    end: "2023-03-22T03:30:00",
    desc: 'rtgferter',
    type: 'design task',
  },
  {
    id: "2",
    resourceIds: ["a"],
    title: "Design System Figma",
    start: "2023-03-18T04:00:00",
    end: "2023-03-20T09:00:00",
    desc: 'rtgferter',
    type: 'research',
  },
  {
    id: "3",
    resourceIds: ["b"],
    title: "Testing Design",
    start: "2023-03-18T07:00:00",
    end: "2023-03-21T09:00:00",
    desc: 'rtgferter',
    type: 'outdoor activities',
  },
]

const resource = [
  {
    id: "a",
    title: "work",
  },
  {
    id: "b",
    title: "work",
  }
]

const RenderEventContent = (events: any) => {
  const { publicId, title, extendedProps } = events?.event?._def;
  const { type } = extendedProps;
  return (
    <div style={{ background: renderBg[type], width: 'max-content' }}
      id={publicId}
      className='text-white capitalize rounded-[4px] px-[10px] py-[4px] text-sm'
    >
      {title}
    </div>
  )
}

const TimelineCalendar = () => {
  return (
    <BoxWrapper boxShadow={'0px 0px 8px 1px rgba(9, 161, 218, 0.1)'} className='timeline-calendar-wrapper'>
      <p className="text-xl font-medium">Timeline</p>
      <FullCalendar
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
        plugins={[resourceTimelinePlugin, interactionPlugin, dayGridPlugin, ResourcePlugin]}
        headerToolbar={{
          left: "",
          right: "title prev next",
        }}
        initialView="resourceTimelineWeek"
        slotLabelFormat={[{ day: "2-digit", month: "long", year: "numeric", weekday: "long" }]}
        slotDuration="02:00:00"
        slotLabelInterval={'03:00:00'}
        slotLabelContent={RenderLabelContent}
        slotMinWidth={30}
        resourceAreaWidth={0}
        resources={resource}
        events={events}
        eventContent={RenderEventContent}

      />
    </BoxWrapper>
  )
}

export default TimelineCalendar