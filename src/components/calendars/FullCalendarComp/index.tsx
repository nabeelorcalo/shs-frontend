import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { PageHeader } from "../../PageHeader";
import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import { ButtonPrimaryColorState } from "../../../store";
import CalendarModalBox from "./modalBox";
import CalendarDrawer from "./drawerComp/index";
import { Alert } from "../../Alert";
import { ButtonThemePrimary } from "../../ButtonThemePrimary";
import { ButtonThemeSecondary } from "../../ButtonThemeSecondary";
import "./style.scss";

const Index = (props: any) => {
  const {
    eventData,
    setStartDate,
    setEndDate,
    addEvent,
    updateEvent,
    statusUpdate,
    addReminder,
    updateReminder,
    deleteReminder,
    getData,
    notifyAttendees,
  } = props;
  const [openModal, setOpenModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState<any>({
    open: false,
    category: "",
    eventId: "",
    status: "",
  });
  const [editMod, setEditMod] = useState(false);
  const [toggleReminder, setToggleReminder] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [startFrom, setStartFrom] = useState("");
  const buttonPrimaryColor = useRecoilValue(ButtonPrimaryColorState);

  const renderEventColor: any = {
    meeting: "#E94E5D",
    interview: "#5879CE",
    reminder: "#FFC15D",
  };
  const statusRender: any = {
    pending: "edit",
    accept: "accept",
    accepted: "accepted",
    rejected: "accept",
    declined: "accept",
  };
  const calendarTypes = ["meeting", "interview", "reminder"];
  const handleEventClick = (id: string, category: string, status: string, date: any) => {
    setOpenDrawer({ open: !openDrawer.open, category, eventId: id, status });
    setStartFrom(date);
  };
  const handleDatesSet = (arg: any) => {
    setStartDate(dayjs(arg.start).endOf("day").format("YYYY-MM-DD"));
    setEndDate(dayjs(arg.end).endOf("day").format("YYYY-MM-DD"));
  };

  const handleEventContent = (info: any) => {
    const events = info?.event?._def;
    const instance = info?.event?._instance;
    const { category, status, dateFrom, taskId, startTime } = events?.extendedProps;
    const { start, end } = instance?.range;
    return (
      <div
        className="event-content"
        style={{
          borderLeft: `2px solid ${renderEventColor[category] ? renderEventColor[category] : "#4E4B66"}`,
        }}
      >
        <div className="content" onClick={() => handleEventClick(taskId, category, status, start)}>
          <h2 className="title text-[14px] capitalize break-words font-normal m-0">{events?.title}</h2>
          <p className="duration text-[14px] mt-[5px]">{info?.timeText}</p>
          <p className="duration text-[14px] mt-[5px]">{dayjs(start).format("DD:MM:YYYY")}</p>
        </div>
        <div className="event-btn gap-2">
          {category === "meeting" || category === "interview" ? (
            <>
              <ButtonThemePrimary
                size="small"
                className={`btn capitalize btn-primary ${status === "accepted" && "accepted"} `}
                onClick={() => {
                  setOpenDrawer({
                    open: true,
                    category,
                    eventId: taskId,
                    status,
                  });
                  setEditMod(status === "pending" ? !editMod : false);
                }}
              >
                {statusRender[status]}
              </ButtonThemePrimary>
              <ButtonThemeSecondary
                size="small"
                className={`btn capitalize`}
                onClick={() => {
                  setAlertModal(!alertModal);
                  setSelectedId(taskId);
                  setSelectedCategory(category);
                  setSelectedStatus(status);
                }}
              >
                {status === "pending" ? "cancel" : "decline"}
              </ButtonThemeSecondary>
            </>
          ) : (
            // : category === "interview" ? (
            //   <>
            //     <ButtonThemePrimary
            //       size="small"
            //       className={`btn capitalize btn-primary`}
            //       onClick={() =>
            //         setOpenDrawer({
            //           open: true,
            //           category,
            //           eventId: taskId,
            //           status,
            //         })
            //       }
            //     >
            //       accept
            //     </ButtonThemePrimary>
            //     <ButtonThemeSecondary
            //       size="small"
            //       className={`btn capitalize`}
            //       onClick={() => {
            //         setAlertModal(!alertModal);
            //         setSelectedId(taskId);
            //         setSelectedCategory(category);
            //         setSelectedStatus(status);
            //       }}
            //     >
            //       decline
            //     </ButtonThemeSecondary>
            //   </>
            // )
            category === "reminder" && (
              <>
                <ButtonThemePrimary
                  size="small"
                  className={`btn capitalize btn-primary`}
                  onClick={() => {
                    setOpenDrawer({
                      open: true,
                      category,
                      eventId: taskId,
                      status,
                    });
                    setToggleReminder(true);
                  }}
                >
                  edit
                </ButtonThemePrimary>
                <ButtonThemeSecondary
                  size="small"
                  className={`btn capitalize`}
                  onClick={() => {
                    setAlertModal(!alertModal);
                    setSelectedId(taskId);
                    setSelectedCategory(category);
                  }}
                >
                  delete
                </ButtonThemeSecondary>
              </>
            )
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="role-calendar-wrapper">
      <PageHeader title={"Calendar"} bordered />

      <div className="flex justify-center gap-7 flex-wrap">
        {calendarTypes.map((name: string) => (
          <p className="flex items-center gap-3">
            <span className="h-[12px] w-[12px] rounded-[4px] inline-block" style={{ background: renderEventColor[name] }}></span>
            <span className="capitalize text-sm title-color-secondary">{name}</span>
          </p>
        ))}
      </div>

      <FullCalendar
        initialView={"timeGridWeek"}
        viewDidMount={() => {
          const elem: any = document.querySelector('.fc-myCustomBtn-button');
          elem.style.backgroundColor = buttonPrimaryColor;
        }}
        customButtons={{
          myCustomBtn: {
            text: "Add Event",
            click: () => setOpenModal(!openModal),
          },
        }}
        headerToolbar={{
          left: "title prev next",
          right: "myCustomBtn timeGridWeek timeGridDay",
        }}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        allDaySlot={false}
        height="63vh"
        slotDuration="00:60:00"
        eventContent={handleEventContent}
        datesSet={handleDatesSet}
        events={eventData}
        views={{
          week: {
            dayHeaderContent: (args) => {
              return (
                <div className="mb-[20px]">
                  <p className="pb-2 title-color-primary text-base font-semibold">{dayjs(args.date).format("ddd")}</p>
                  <p className="title-color-secondary text-base font-semibold">{dayjs(args.date).format("D")}</p>
                </div>
              );
            },
          },
          day: {
            dayHeaderContent: (args) => {
              return (
                <div className="mb-[20px] text-base font-semibold title-color-primary">
                  <p>{dayjs(args.date).format("ddd")}</p>
                  <p>{dayjs(args.date).format("D")}</p>
                </div>
              );
            },
          },
        }}
      />

      <CalendarDrawer
        open={openDrawer.open}
        category={openDrawer.category}
        setOpen={setOpenDrawer}
        eventId={openDrawer.eventId}
        status={openDrawer.status}
        toggle={editMod}
        setToggle={setEditMod}
        toggleReminder={toggleReminder}
        setToggleReminder={setToggleReminder}
        updateEvent={updateEvent}
        statusUpdate={statusUpdate}
        updateReminder={updateReminder}
        deleteReminder={deleteReminder}
        getData={getData}
        notifyAttendees={notifyAttendees}
        startFrom={startFrom}
      />
      <CalendarModalBox open={openModal} setOpen={setOpenModal} addEvent={addEvent} addReminder={addReminder} getData={getData} />

      <Alert
        type={"warning"}
        state={alertModal}
        setState={setAlertModal}
        okBtnFunc={() => {
          if (selectedCategory === "reminder")
            deleteReminder(selectedId, () => {
              setAlertModal(false);
              getData();
            });
          else {
            if (selectedStatus == "pending") {
              updateEvent({ status: "CANCELLED" }, selectedId, () => {
                setAlertModal(false);
                getData();
              });
            } else {
              statusUpdate({ meetingId: selectedId, status: "rejected" }, () => {
                setAlertModal(false);
                getData();
              });
            }
          }
        }}
        cancelBtntxt={"Cancel"}
        okBtntxt={"Submit"}
        children={<p>Are you sure you want to cancel this event?</p>}
      />
    </div>
  );
};

export default Index;
