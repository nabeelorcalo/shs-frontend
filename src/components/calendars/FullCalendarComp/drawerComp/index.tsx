import { useState } from "react";
import { EditIcon } from "../../../../assets/images";
import Drawer from "../../../Drawer";
import EventDetail from "./eventDetail";
import EditEvent from "./editEvent";
import "./style.scss";
import EditReminder from "./editReminder";

const Index = (props: any) => {
  const {
    open,
    setOpen,
    category,
    eventId,
    status,
    toggle,
    setToggle,
    toggleReminder,
    setToggleReminder,
    updateEvent,
    statusUpdate,
    updateReminder,
    deleteReminder,
    getData,
    notifyAttendees,
    startFrom,
  } = props;

  const renderTitle: any = {
    meeting: (
      <div className="flex items-center gap-3">
        <p>Event Detail</p>
        {!toggle && status === "pending" && <EditIcon className="cursor-pointer" onClick={() => setToggle(!toggle)} />}
      </div>
    ),
    interview: <p>Interview Detail</p>,
    reminder: (
      <div className="flex items-center gap-3">
        <p>Event Detail</p>
        {!toggleReminder && <EditIcon className="cursor-pointer" onClick={() => setToggleReminder(!toggleReminder)} />}
      </div>
    ),
  };

  return (
    <Drawer
      open={open}
      width={"522px"}
      title={renderTitle[category]}
      className="calendar-drawer-wrapper"
      onClose={() => {
        setOpen(!open);
        setToggle(false);
        setToggleReminder(false);
      }}
    >
      {!toggleReminder ? (
        <>
          {!toggle ? (
            <EventDetail
              setOpen={setOpen}
              statusUpdate={statusUpdate}
              eventId={eventId}
              eventCategory={category}
              eventStatus={status}
              deleteReminder={deleteReminder}
              getData={getData}
              updateEvent={updateEvent}
              notifyAttendees={notifyAttendees}
              startFrom={startFrom}
            />
          ) : (
            <EditEvent
              eventId={eventId}
              onClose={(state: boolean) => {
                setOpen(!open);
                setToggle(false);
                setToggleReminder(false);
              }}
              updateEvent={updateEvent}
              getData={getData}
            />
          )}
        </>
      ) : (
        <EditReminder
          eventId={eventId}
          onClose={(state: boolean) => {
            setOpen(!open);
            setToggle(false);
            setToggleReminder(false);
          }}
          updateReminder={updateReminder}
          getData={getData}
        />
      )}
    </Drawer>
  );
};

export default Index;
