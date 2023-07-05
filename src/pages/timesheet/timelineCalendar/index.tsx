import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import ResourcePlugin from "@fullcalendar/resource";
import FullCalendar from "@fullcalendar/react";
import { BoxWrapper } from "../../../components";
import "./style.scss";
import dayjs from "dayjs";
import { renderBg } from "../actionHandler";
import { useEffect, useRef } from "react";

const RenderLabelContent = (labelContent: any) => {
  return <div>{dayjs(labelContent.date).format("HH:mm")}</div>;
};

// const events = [
//   {
//     id: "1",
//     resourceIds: ["a"],
//     title: "designing",
//     start: "2023-06-04T01:39:00",
//     end: "2023-06-04T03:30:00",
//     desc: "rtgferter",
//     type: "design",
//   },
//   {
//     id: "2",
//     resourceIds: ["a"],
//     title: "Design System Figma",
//     start: "2023-06-04T07:00:00",
//     end: "2023-06-04T09:00:00",
//     desc: "rtgferter",
//     type: "research",
//   },
//   {
//     id: "3",
//     resourceIds: ["a"],
//     title: "Testing Design",
//     start: "2023-06-04T07:00:00",
//     end: "2023-06-04T09:00:00",
//     desc: "rtgferter",
//     type: "outdoor activities",
//   },
// ];

const resource = Array.from({ length: 26 }, (_, index) => ({
  id: String.fromCharCode(97 + index),
  title: "work",
}));

const RenderEventContent = (events: any) => {
  const { publicId, title, extendedProps } = events?.event?._def;
  const { type } = extendedProps;

  return (
    <div
      style={{
        background: type?.toLowerCase()?.includes("design")
          ? renderBg["design task"]
          : type?.toLowerCase()?.includes("development")
          ? renderBg["research"]
          : renderBg["outdoor activities"],
        // width: "max-content",
      }}
      id={publicId}
      className="text-white capitalize rounded-[4px] px-[10px] py-[4px] text-sm whitespace-nowrap"
    >
      {title}
    </div>
  );
};

const TimelineCalendar = (props: any) => {
  const { setStartDate, setEndDate, timelineData } = props;
  const handleDatesSet = (arg: any) => {
    setStartDate(dayjs(arg.view.activeStart).endOf("day").format("YYYY-MM-DD"));
    setEndDate(dayjs(arg.view.activeEnd).endOf("day").format("YYYY-MM-DD"));
  };

  return (
    <BoxWrapper boxShadow={"0px 0px 8px 1px rgba(9, 161, 218, 0.1)"} className="timeline-calendar-wrapper my-[25px]">
      <p className="text-xl font-medium">Timeline</p>
      <FullCalendar
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
        plugins={[resourceTimelinePlugin, interactionPlugin, dayGridPlugin, ResourcePlugin]}
        headerToolbar={{
          left: "",
          right: "title prev next",
        }}
        initialView="resourceTimelineDay"
        datesSet={handleDatesSet}
        slotLabelFormat={[{ day: "2-digit", month: "long", year: "numeric", weekday: "long" }]}
        // slotDuration="01:00:00"
        slotLabelInterval={"03:00:00"}
        slotLabelContent={RenderLabelContent}
        slotMinWidth={35}
        resourceAreaWidth={0}
        resources={resource}
        events={timelineData}
        eventContent={RenderEventContent}
      />
    </BoxWrapper>
  );
};

export default TimelineCalendar;
