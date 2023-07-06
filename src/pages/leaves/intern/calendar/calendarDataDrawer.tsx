import "./style.scss";
import DrawerComp from "../../../../components/DrawerComp";
import CalendarDrawerInnerDetail from "../../../../components/CalanderDrawerInner/calendarDrawerInnerDetail";
import { DrawerWidth } from "../../../../components";
import useCustomHook from "../../actionHandler";
import constants from "../../../../config/constants";
const CalendarDataDrawer = (props: any) => {
  const { eventData, setIsOpenCalendarDrawer, isOpenCalendarDrawer } = props;
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
  const mainDrawerWidth = DrawerWidth();
  // console.log('events', events);
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
        ApprovedBy={leaveDetail?.approvedBy ? leaveDetail?.approvedBy?.firstName + " " + leaveDetail?.approvedBy?.lastName : "N/A"}
        backgroundColor={renderBgColor[leaveDetail?.type?.toUpperCase()]}
        spanBG={spanBGColorRender[leaveDetail?.type?.toUpperCase()]}
        title={events?.title}
        dateFrom={eventRange?.start}
        dateTo={eventRange?.end}
        timeFrom={leaveDetail?.timeFrom}
        timeTo={leaveDetail?.timeTo}
        leaveTypeDay={extendedPropsData?.leaveTypeDay === "half day"}
        hours={extendedPropsData?.hours}
        dur={extendedPropsData?.dur}
        reqStatus={extendedPropsData?.status.toUpperCase()}
        description={extendedPropsData?.description}
      />
    </DrawerComp>
  );
};
export default CalendarDataDrawer;
