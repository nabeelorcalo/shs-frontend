import { useState } from "react";
import { EditIcon } from "../../../../assets/images";
import Drawer from "../../../Drawer";
import EventDetail from "./eventDetail";
import EditEvent from "./editEvent";
import "./style.scss";
import EditReminder from "./editReminder";

const Index = (props: any) => {
<<<<<<< HEAD
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
  } = props;
=======
  console.log("🚀 ~ file: index.tsx:10 ~ Index ~ props:", props);
  const { open, setOpen, category, eventId, status, toggle, setToggle, toggleReminder, setToggleReminder } = props;
>>>>>>> dev

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
<<<<<<< HEAD
            <EventDetail
              setOpen={setOpen}
              statusUpdate={statusUpdate}
              eventId={eventId}
              eventCategory={category}
              eventStatus={status}
              deleteReminder={deleteReminder}
              getData={getData}
              updateEvent={updateEvent}
            />
          ) : (
            <EditEvent eventId={eventId} onClose={setOpen} updateEvent={updateEvent} getData={getData} />
          )}
        </>
      ) : (
        <EditReminder eventId={eventId} onClose={setOpen} updateReminder={updateReminder} getData={getData} />
=======
            <EventDetail eventId={eventId} eventCategory={category} eventStatus={status} />
          ) : (
            <EditEvent eventId={eventId} onClose={setOpen} />
          )}
        </>
      ) : (
        <EditReminder eventId={eventId} onClose={setOpen} />
>>>>>>> dev
      )}
    </Drawer>
  );
};

export default Index;
