import { Modal, Tabs } from "antd";
import { CloseCircleIcon } from "../../../../assets/images";
import type { TabsProps } from "antd";
import "./style.scss";
import Meeting from "./meeting";
import Reminder from "./reminder";

const CalendarModalBox = (props: any) => {
<<<<<<< HEAD
  const { open, setOpen, addEvent, addReminder, getData } = props;
=======
  const { open, setOpen, addEvent } = props;
>>>>>>> dev

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Meeting",
<<<<<<< HEAD
      children: <Meeting addEvent={addEvent} onClose={setOpen} getData={getData} />,
=======
      children: <Meeting addEvent={addEvent} onClose={setOpen} />,
>>>>>>> dev
    },
    {
      key: "2",
      label: "Reminder",
<<<<<<< HEAD
      children: <Reminder onClose={setOpen} addReminder={addReminder} getData={getData} />,
=======
      children: <Reminder onClose={setOpen} />,
>>>>>>> dev
    },
  ];

  return (
    <Modal
      open={open}
      width={"700px"}
      className="calendar-modal-box"
      closable
      onCancel={() => setOpen(!open)}
      title="Add Event"
      footer=""
      closeIcon={<img src={CloseCircleIcon} />}
    >
      <Tabs defaultActiveKey="1" items={items}></Tabs>
    </Modal>
  );
};

export default CalendarModalBox;
