import { Form, Modal, Tabs } from "antd";
import { CloseCircleIcon } from "../../../../assets/images";
import type { TabsProps } from "antd";
import "./style.scss";
import Meeting from "./meeting";
import Reminder from "./reminder";
import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../../../store";
import constants from "../../../../config/constants";
// import { formAnnotation } from "pdfkit";

const CalendarModalBox = (props: any) => {
  const { open, setOpen, addEvent, addReminder, getData } = props;
  const { STUDENT } = constants;
  const role: string = useRecoilValue(currentUserRoleState);
  const [meetingForm] = Form.useForm();
  const [reminderForm] = Form.useForm();

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Meeting",
      children: <Meeting addEvent={addEvent} onClose={setOpen} getData={getData} form={meetingForm} />,
    },
    {
      key: "2",
      label: "Reminder",
      children: <Reminder onClose={setOpen} addReminder={addReminder} getData={getData} form={reminderForm} />,
    },
  ];

  if (role === STUDENT) {
    delete items[0]; //delete the first tab for students as they don't need events
  }

  return (
    <Modal
      open={open}
      width={"700px"}
      className="calendar-modal-box"
      closable
      onCancel={() => {
        setOpen(!open);
        meetingForm.resetFields();
        reminderForm.resetFields();
      }}
      title="Add Event"
      footer=""
      closeIcon={<img src={CloseCircleIcon} />}
    >
      <Tabs defaultActiveKey="1" items={items}></Tabs>
    </Modal>
  );
};

export default CalendarModalBox;
