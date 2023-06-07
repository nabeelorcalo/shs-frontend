import "./style.scss"
import DrawerComp from "../../../../components/DrawerComp";
import CalendarDrawerInnerDetail from "../../../../components/CalanderDrawerInner/calendarDrawerInnerDetail";
import { DrawerWidth } from '../../../../components';
const CalendarDataDrawer = (props: any) => {
    const { eventData, setIsOpenCalendarDrawer, isOpenCalendarDrawer } = props;
    const events = eventData?.event?._def
    const eventRange = eventData?.event?._instance?.range
    const extendedPropsData = eventData?.event?._def?.extendedProps
    console.log('extendedPropsData', extendedPropsData);
    const renderBgColor:any = {
        "SICK": "rgba(76, 164, 253, 0.25)",
        "CASUAL": "rgba(255, 193, 93, 0.25)",
        "WFH": "rgba(233, 111, 124, 0.25)",
        "MEDICAL": "rgba(106, 173, 142, 0.25)"
    }
    const spanBGColorRender:any ={
        "SICK": "rgba(76, 164, 253, 1)",
        "CASUAL": "rgba(255, 193, 93, 1)",
        "WFH": "rgba(233, 111, 124, 1)",
        "MEDICAL": "rgba(106, 173, 142, 1)"
    }
    const mainDrawerWidth = DrawerWidth();
    // console.log('events', events);
    return (
        <DrawerComp
            className={`drawar_main_calendar `}
            placement="right"
            width={mainDrawerWidth>1400 ? 380 :300}
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
                reqStatus={extendedPropsData?.status.toLowerCase()}
                description={extendedPropsData?.description}


            />
        </DrawerComp>
    )
}
export default CalendarDataDrawer