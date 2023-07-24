import React from "react";
import CalendarDrawerInnerDetail from "../../../../components/CalanderDrawerInner/calendarDrawerInnerDetail";
import DrawerComp from "../../../../components/DrawerComp";
import useCustomHook from "../../actionHandler";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const ManagerCalanderDrawerData = (props: any) => {
  const utcOffsetInMinutes = new Date().getTimezoneOffset();
  const { eventData, setIsOpenCalendarDrawer, isOpenCalendarDrawer, approveDeclineRequest } = props;
  const { leaveDetail } = useCustomHook();
  const events = eventData?.event?._def;
  const eventRange = eventData?.event?._instance?.range;
  const extendedPropsData = eventData?.event?._def?.extendedProps;
  const renderBgColor: any = {
    SICK: "rgba(76, 164, 253, 0.25)",
    CASUAL: "rgba(255, 193, 93, 0.25)",
    "WORK FROM HOME": "rgba(233, 111, 124, 0.25)",
    MEDICAL: "rgba(106, 173, 142, 0.25)",
  };
  const spanBGColorRender: any = {
    SICK: "rgba(76, 164, 253, 1)",
    CASUAL: "rgba(255, 193, 93, 1)",
    "WORK FROM HOME": "rgba(233, 111, 124, 1)",
    MEDICAL: "rgba(106, 173, 142, 1)",
  };

  return (
    <DrawerComp
      className={`drawar_main_calendar `}
      placement="right"
      onClose={() => setIsOpenCalendarDrawer(false)}
      open={isOpenCalendarDrawer}
      closeIcon={false}
    >
      <CalendarDrawerInnerDetail
        img={extendedPropsData?.img}
        name={extendedPropsData?.name}
        designation={leaveDetail?.intern?.internship?.title ?? "N/A"}
        email={leaveDetail?.intern?.userDetail?.email}
        requestedOn={eventRange?.start}
        aprover={
          leaveDetail?.approver && leaveDetail?.approver?.firstName ? leaveDetail?.approver?.firstName + " " + leaveDetail?.approver?.lastName : "N/A"
        }
        ApprovedBy={
          leaveDetail?.approved && leaveDetail?.approved?.firstName ? leaveDetail?.approved?.firstName + " " + leaveDetail?.approved?.lastName : "N/A"
        }
        backgroundColor={renderBgColor[events?.title?.toUpperCase()] || "rgba(106, 173, 142, 0.25)"}
        spanBG={spanBGColorRender[events?.title?.toUpperCase()] || "rgba(106, 173, 142, 1)"}
        title={events?.title}
        dateFrom={eventRange?.start}
        dateTo={dayjs.utc(eventRange?.end).utcOffset(utcOffsetInMinutes)}
        timeFrom={extendedPropsData?.timeFrom}
        timeTo={extendedPropsData?.timeTo}
        leaveTypeDay={extendedPropsData?.leaveTypeDay === "half day"}
        hours={extendedPropsData?.hours}
        dur={extendedPropsData?.dur}
        reqStatus={extendedPropsData?.status}
        description={extendedPropsData?.description}
        approveDeclineRequest={approveDeclineRequest}
      />
    </DrawerComp>
  );
};

export default ManagerCalanderDrawerData;
