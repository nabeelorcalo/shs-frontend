import "./style.scss"
import DrawerComp from "../../../../components/DrawerComp";
import CalendarDrawerInnerDetail from "../../../../components/CalanderDrawerInner/calendarDrawerInnerDetail";
const CalendarDataDrawer = (props: any) => {
    const { eventData, setIsOpenCalendarDrawer, isOpenCalendarDrawer } = props;
    const events = eventData?.event?._def
    const eventRange = eventData?.event?._instance?.range
    const extendedPropsData = eventData?.event?._def?.extendedProps
    console.log('extendedPropsData', extendedPropsData);
    const renderBgColor:any = {
        "Sick": "rgba(76, 164, 253, 0.25)",
        "Casual": "rgba(255, 193, 93, 0.25)",
        "Work from home": "rgba(233, 111, 124, 0.25)",
        "Medical": "rgba(106, 173, 142, 0.25)"
    }
    const spanBGColorRender:any ={
        "Sick": "rgba(76, 164, 253, 1)",
        "Casual": "rgba(255, 193, 93, 1)",
        "Work from home": "rgba(233, 111, 124, 1)",
        "Medical": "rgba(106, 173, 142, 1)"
    }

    // console.log('events', events);
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
                backgroundColor={renderBgColor[events?.title]}
                spanBG={spanBGColorRender[events?.title]} 
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
export default CalendarDataDrawer