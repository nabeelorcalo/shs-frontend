import React from 'react'
import CalendarDrawerInnerDetail from '../../../../components/CalanderDrawerInner/calendarDrawerInnerDetail';
import DrawerComp from '../../../../components/DrawerComp'

const ManagerCalanderDrawerData = (props:any) => {
  const { eventData, setIsOpenCalendarDrawer, isOpenCalendarDrawer } = props;
  const events = eventData?.event?._def
  const eventRange = eventData?.event?._instance?.range
  const extendedPropsData = eventData?.event?._def?.extendedProps

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
        designation={extendedPropsData?.designation}
        email={extendedPropsData?.email}
        requestedOn={eventRange?.start}
        aprover={extendedPropsData?.aprover}
        ApprovedBy={extendedPropsData?.ApprovedBy}
        backgroundColor={events?.title === "Sick" ?
          "rgba(76, 164, 253, 0.25)" : events?.title === "Casual" ?
            "rgba(255, 193, 93, 0.25)" : events?.title === "Work from home" ? "rgba(233, 111, 124, 0.25)" : "rgba(106, 173, 142, 0.25)"}
        spanBG={events?.title === "Sick" ?
          "rgba(76, 164, 253, 1)" : events?.title === "Casual" ?
            "rgba(255, 193, 93, 1)" : events?.title === "Work from home" ? "rgba(233, 111, 124, 1)" : "rgba(106, 173, 142, 1)"}
        title={events?.title}
        dateFrom={eventRange?.start}
        dateTo={eventRange?.end}
        timeFrom={eventRange?.start}
        timeTo={eventRange?.end}
        leaveTypeDay={extendedPropsData?.leaveTypeDay === "half day"}
        hours={extendedPropsData?.hours}
        dur={extendedPropsData?.dur}
        reqStatus={extendedPropsData?.status}
        description={extendedPropsData?.description}
      />
    </DrawerComp>
  )
}

export default ManagerCalanderDrawerData