import "./style.scss";
import DrawerComp from "../../../../components/DrawerComp";
import CalendarDrawerInnerDetail from "../../../../components/CalanderDrawerInner/calendarDrawerInnerDetail";
import { DrawerWidth } from "../../../../components";
import useCustomHook from "../../actionHandler";
import constants from "../../../../config/constants";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const CalendarDataDrawer = (props: any) => {
  const utcOffsetInMinutes = new Date().getTimezoneOffset();
  const { eventData, setIsOpenCalendarDrawer, isOpenCalendarDrawer } = props;
  const { leaveDetail, calculateTimeDifference } = useCustomHook();
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
  const mainDrawerWidth = DrawerWidth();
  
  return (
    <DrawerComp
      className={`drawar_main_calendar `}
      placement="right"
      width={mainDrawerWidth > 1400 ? 380 : 300}
      onClose={() => setIsOpenCalendarDrawer(false)}
      open={isOpenCalendarDrawer}
      closeIcon={false}
    >
      <CalendarDrawerInnerDetail
        img={
          leaveDetail?.intern?.userDetail?.profileImage?.mediaId
            ? `${constants.MEDIA_URL}/${leaveDetail?.intern?.userDetail?.profileImage?.mediaId}.${leaveDetail?.intern?.userDetail?.profileImage?.metaData?.extension}`
            : ""
        }
        name={extendedPropsData?.name}
        designation={leaveDetail?.intern?.internship?.title ?? "N/A"}
        email={extendedPropsData?.email}
        requestedOn={eventRange?.start}
        aprover={leaveDetail?.approver ? leaveDetail?.approver?.firstName + " " + leaveDetail?.approver?.lastName : "N/A"}
        ApprovedBy={
          leaveDetail?.approved && leaveDetail?.approved?.firstName ? leaveDetail?.approved?.firstName + " " + leaveDetail?.approved?.lastName : "N/A"
        }
        backgroundColor={renderBgColor[leaveDetail?.type?.toUpperCase()] || "rgba(106, 173, 142, 0.25)"}
        spanBG={spanBGColorRender[leaveDetail?.type?.toUpperCase()] || "rgba(106, 173, 142, 1)"}
        title={events?.title}
        dateFrom={eventRange?.start}
        dateTo={dayjs.utc(eventRange?.end).utcOffset(utcOffsetInMinutes)}
        timeFrom={leaveDetail?.timeFrom}
        timeTo={leaveDetail?.timeTo}
        leaveTypeDay={extendedPropsData?.leaveTypeDay === "half day"}
        hours={extendedPropsData?.hours}
        dur={calculateTimeDifference()}
        reqStatus={extendedPropsData?.status.toUpperCase()}
        description={extendedPropsData?.description}
        mediaUrl={leaveDetail?.mediaUrl}
      />
    </DrawerComp>
  );
};
export default CalendarDataDrawer;
