import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { PageHeader } from "../../PageHeader";
import dayjs from "dayjs";
import { Button } from "antd";
import CalendarModalBox from "./modalBox";
import CalendarDrawer from "./drawerComp/index";
import "./style.scss";
import { Alert } from "../../Alert";

const Index = (props: any) => {
<<<<<<< HEAD
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
  } = props;
=======
  const { eventData, setStartDate, setEndDate, addEvent } = props;
>>>>>>> dev
  const [openModal, setOpenModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState<any>({ open: false, category: "", eventId: "", status: "" });
  const [editMod, setEditMod] = useState(false);
  const [toggleReminder, setToggleReminder] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const renderEventColor: any = {
    meeting: "#E94E5D",
    interview: "#5879CE",
    reminder: "#FFC15D",
  };
<<<<<<< HEAD
  const statusRender: any = {
    pending: "edit",
    accept: "accept",
    accepted: "accepted",
    rejected: "accept",
    declined: "accept",
  };
=======
>>>>>>> dev
  const calendarTypes = ["meeting", "interview", "reminder"];
  const handleEventClick = (id: string, category: string, status: string) => {
    setOpenDrawer({ open: !openDrawer.open, category, eventId: id, status });
  };
  const handleDatesSet = (arg: any) => {
    setStartDate(dayjs(arg.start).endOf("day").format("YYYY-MM-DD"));
    setEndDate(dayjs(arg.end).endOf("day").format("YYYY-MM-DD"));
  };

  const handleEventContent = (info: any) => {
    const events = info?.event?._def;
    const { category, status } = events?.extendedProps;

    return (
      <div
        className="event-content"
        style={{ borderLeft: `2px solid ${renderEventColor[category] ? renderEventColor[category] : "#4E4B66"}` }}
      >
        <div className="content" onClick={() => handleEventClick(events?.publicId, category, status)}>
          <h2 className="title text-[14px] capitalize break-words font-normal m-0">{events?.title}</h2>
          <p className="duration text-[14px] mt-[5px]">{info?.timeText}</p>
          <p className="duration text-[14px] mt-[5px]">{dayjs().format("DD:MM:YYYY")}</p>
        </div>
        <div className="event-btn gap-3">
          {category === "meeting" ? (
            <>
              <Button
                size="small"
                className={`btn capitalize btn-primary ${status === "accepted" && "accepted"}`}
                onClick={() => {
                  setOpenDrawer({ open: true, category, eventId: events?.publicId, status });
                  setEditMod(status === "pending" ? !editMod : false);
                }}
              >
<<<<<<< HEAD
                {statusRender[status]}
              </Button>
              <Button
                size="small"
                className={`btn capitalize`}
                onClick={() => {
                  setAlertModal(!alertModal);
                  setSelectedId(events?.publicId);
                  setSelectedCategory(category);
                  setSelectedStatus(status);
                }}
              >
=======
                {status === "pending" ? "edit" : status === "accept" ? "accept" : status === "accepted" && "accepted"}
              </Button>
              <Button size="small" className={`btn capitalize`} onClick={() => setAlertModal(!alertModal)}>
>>>>>>> dev
                {status === "pending" ? "cancel" : "decline"}
              </Button>
            </>
          ) : category === "interview" ? (
            <>
              <Button
                size="small"
                className={`btn capitalize btn-primary`}
                onClick={() => setOpenDrawer({ open: true, category, eventId: events?.publicId, status })}
              >
                accept
              </Button>
<<<<<<< HEAD
              <Button
                size="small"
                className={`btn capitalize`}
                onClick={() => {
                  setAlertModal(!alertModal);
                  setSelectedId(events?.publicId);
                  setSelectedCategory(category);
                  setSelectedStatus(status);
                }}
              >
=======
              <Button size="small" className={`btn capitalize`} onClick={() => setAlertModal(!alertModal)}>
>>>>>>> dev
                decline
              </Button>
            </>
          ) : (
            category === "reminder" && (
              <>
                <Button
                  size="small"
                  className={`btn capitalize btn-primary`}
                  onClick={() => {
                    setOpenDrawer({ open: true, category, eventId: events?.publicId, status });
                    setToggleReminder(true);
                  }}
                >
                  edit
                </Button>
                <Button
                  size="small"
                  className={`btn capitalize`}
                  onClick={() => {
                    setAlertModal(!alertModal);
                    setSelectedId(events?.publicId);
                    setSelectedCategory(category);
                  }}
                >
                  delete
                </Button>
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
            <span
              className="h-[12px] w-[12px] rounded-[4px] inline-block"
              style={{ background: renderEventColor[name] }}
            ></span>
<<<<<<< HEAD
            <span className="capitalize text-sm title-color-secondary">{name}</span>
=======
            <span className="capitalize text-sm text-[#4E4B66]">{name}</span>
>>>>>>> dev
          </p>
        ))}
      </div>

      <FullCalendar
        initialView={"timeGridWeek"}
        customButtons={{
          myCustomBtn: {
            text: "Add Event",
            click: () => setOpenModal(!openModal),
          },
        }}
        headerToolbar={{ left: "title prev next", right: "myCustomBtn timeGridWeek timeGridDay" }}
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
<<<<<<< HEAD
                  <p className="pb-2 title-color-primary text-base font-semibold">{dayjs(args.date).format("ddd")}</p>
                  <p className="title-color-secondary text-base font-semibold">{dayjs(args.date).format("D")}</p>
=======
                  <p className="pb-2 text-[#14142A] text-base font-semibold">{dayjs(args.date).format("ddd")}</p>
                  <p className="text-[#4E4B66] text-base font-semibold">{dayjs(args.date).format("D")}</p>
>>>>>>> dev
                </div>
              );
            },
          },
          day: {
            dayHeaderContent: (args) => {
              return (
<<<<<<< HEAD
                <div className="mb-[20px] text-base font-semibold title-color-primary">
=======
                <div className="mb-[20px] text-base font-semibold text-[#14142A]">
>>>>>>> dev
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
      />
      <CalendarModalBox
        open={openModal}
        setOpen={setOpenModal}
        addEvent={addEvent}
        addReminder={addReminder}
        getData={getData}
      />
<<<<<<< HEAD
=======
      <CalendarModalBox open={openModal} setOpen={setOpenModal} addEvent={addEvent} />
>>>>>>> dev

      <Alert
        type={"warning"}
        state={alertModal}
        setState={setAlertModal}
<<<<<<< HEAD
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
=======
        okBtnFunc={() => {}}
>>>>>>> dev
        cancelBtntxt={"Cancel"}
        okBtntxt={"Submit"}
        children={<p>Are you sure you want to cancel this event?</p>}
      />
    </div>
  );
};

export default Index;
