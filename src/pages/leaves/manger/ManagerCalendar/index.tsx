import FullCalendar from "@fullcalendar/react";
import React, { useState } from "react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import ResourcePlugin from "@fullcalendar/resource";
import dayjs from "dayjs";
import "./style.scss";
import ManagerCalanderDrawerData from "./managerCalanderDrawerData";
import useCustomHook from "../../actionHandler";
const formatDate = (time: any, format: string) => dayjs(time).format(format);
const ManagerCalendar = (props: any) => {
  const { setStartDate, setEndDate, fetchCalendarData } = props;
  const [isOpenCalendarDrawer, setIsOpenCalendarDrawer] = useState<boolean>(false);
  const [eventData, seteventData] = useState({});
  const [selectedId, setSelectedId] = useState<any>("");
  const { managerEvents, managerResource, getLeaveDetailById, approveDeclineLeaveRequest } = useCustomHook();

  const handleEventContent = (eventInfo: any) => {
    const title = eventInfo?.event?._def?.title;
    const events = eventInfo?.event?._def?.extendedProps;
    const backgroundColor =
      events?.eventType === "sick"
        ? "rgba(76, 164, 253, 1)"
        : events?.eventType === "casual"
        ? "rgba(255, 193, 93, 1)"
        : events?.eventType === "work from home"
        ? "rgba(233, 111, 124, 1)"
        : "rgba(74, 157, 119, 1)";
    return (
      <div className="event_styling_wraper rounded-[14px]" style={{ background: backgroundColor }}>
        <p className="m-0 px-3 py-1 text-base">{title}</p>
        {/* <div className="w-full  p-[4px] rounded-md "></div> */}
      </div>
    );
  };
  const approveDeclineRequest = (event: any) => {
    let status = event.currentTarget.className.includes("approve") ? "APPROVED" : "DECLINED";
    let params = { leaveId: selectedId, status: status };

    approveDeclineLeaveRequest(params).then(() => {
      getLeaveDetailById(selectedId);
      fetchCalendarData();
    });
  };
  const handleSlotContent = (slotEvent: any) => {
    return (
      <>
        <div className="slot_Top_wrapper">
          <p className="_day font-medium  ">{formatDate(slotEvent?.date, "ddd")}</p>
          <p className="_date font-normal">{formatDate(slotEvent.date, "DD")}</p>
        </div>
      </>
    );
  };
  const handleResourceRender = (info: any) => {
    const resource = info?.resource?._resource;
    return (
      <>
        <div className="leave_profile_wrapper flex items-center gap-2">
          <div className="w-[48px] h-[48px] rounded-full profile_wrapper  ">
            <img src={resource?.extendedProps?.img} alt="Profile Image" className=" rounded-full w-full h-full object-cover" />
          </div>
          <p className="_name font-semibold">{resource.title}</p>
          {/* <p className="_designation font-normal">{resource.extendedProps.designation}</p> */}
        </div>
      </>
    );
  };
  const handleResourceAreaHeader = (info: any) => {
    return <div className="font-semibold text-xl text-primary-color">{dayjs(info?.view?.activeEnd).format("MMMM")}</div>;
  };
  const handleDatesSet = (arg: any) => {
    if (setStartDate && setEndDate) {
      setStartDate(dayjs(arg.start).endOf("day").format("YYYY-MM-DD"));
      setEndDate(dayjs(arg.end).endOf("day").format("YYYY-MM-DD"));
    }
  };

  return (
    <>
      <div className="manage_calendar_wrapper bg-white">
        <div className="manage_calendar_content">
          <FullCalendar
            schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
            plugins={[resourceTimelinePlugin, interactionPlugin, dayGridPlugin, ResourcePlugin]}
            initialView="resourceTimelineWeek"
            titleFormat={{
              month: "long",
              year: "numeric",
              day: "numeric",
              // weekday: 'long'
            }}
            headerToolbar={{
              start: "",
              center: "title prev next",
              end: "",
            }}
            views={{
              week: {
                dayHeaderContent: (args) => {
                  return (
                    <div className="mb-[20px]">
                      <p className="pb-2 text-[#14142A] text-base font-semibold">{dayjs(args.date).format("ddd")}</p>
                    </div>
                  );
                },
              },
              day: {
                dayHeaderContent: (args) => {
                  return (
                    <div className="mb-[20px] text-base font-semibold text-[#14142A]">
                      <p>{dayjs(args.date).format("ddd")}</p>
                      <p>{dayjs(args.date).format("D")}</p>
                    </div>
                  );
                },
              },
            }}
            datesSet={handleDatesSet}
            resources={managerResource}
            events={managerEvents}
            eventContent={handleEventContent}
            slotLabelContent={handleSlotContent}
            resourceLabelContent={handleResourceRender}
            slotMinWidth={100}
            // resourceAreaWidth={260}
            eventMinWidth={100}
            resourceAreaHeaderContent={handleResourceAreaHeader}
            slotDuration="24:00:00"
            eventClick={(e: any) => {
              getLeaveDetailById(e?.event?._def?.publicId);
              setIsOpenCalendarDrawer(true);
              seteventData(e);
              setSelectedId(e?.event?._def?.publicId);
            }}
            slotLabelFormat={[{ day: "2-digit", month: "long", year: "numeric", weekday: "long" }]}
          />
        </div>
      </div>
      <ManagerCalanderDrawerData
        setIsOpenCalendarDrawer={setIsOpenCalendarDrawer}
        eventData={eventData}
        isOpenCalendarDrawer={isOpenCalendarDrawer}
        approveDeclineRequest={approveDeclineRequest}
      />
    </>
  );
};

export default ManagerCalendar;
