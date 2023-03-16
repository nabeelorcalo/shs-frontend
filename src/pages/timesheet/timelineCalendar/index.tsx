import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from '@fullcalendar/daygrid';
import ResourcePlugin from "@fullcalendar/resource"
import FullCalendar from '@fullcalendar/react';
import { BoxWrapper } from "../../../components";
import './style.scss';
import dayjs from "dayjs";

const RenderLabelContent = (labelContent: any) => {

  return (
    <div>{dayjs(labelContent.date).format('HH:MM')}</div>
  )
}

const events = [
 {
    id: "1",
    resourceIds: ["a"],
    title: "Morning",
    start: "2023-03-14T08:00:00",
    end: "2023-03-16T10:40:00",
  },
]

const resource = [
  {
    id: "a",
    title: "hassan",

  }
]

const RenderEventContent = (events: any) => {
  const eventInfo = events?._def
  console.log(eventInfo);

  return (
    <div>{eventInfo}</div>
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