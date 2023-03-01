import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Form, Modal } from "antd";
import { useState } from "react";
import closeIcon from "../../assets/images/AddEventInCalendar/close-circle.svg";
import "./AddEventInCalendar.scss";
import { Tabs, TabsProps } from "antd";
import { Input } from "antd";

interface AddEventInCalendarProps {
  title?: string;
  closeFunction?: any;
  open?: boolean;
}

export const AddEventInCalendar = ({ title }: AddEventInCalendarProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const hideModal = () => {
    setOpen(false);
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  const Meeting = () => {
    return (
      <div className="meeting">
        <Form layout="vertical" >
          <Form.Item
            label="Email"
            name="Email"
            rules={[{ required: true, message: "Please input your Email!" }]}
            style={{ width: "100%" }}
          >
            <Input placeholder="Email" className="input-style" />{" "}
          </Form.Item>
          <div className="flex justify-end mt-3">
            <Button
              className="mx-2 competitor-modal-cencel-btn"
              style={{ color: "#D40101 ", border: "1px solid #E53B61" }}
              onClick={() => setOpen(false)}
            >
              Cencel
            </Button>
            <Button
              className="mx-2 "
              style={{ background: "#D40101", color: "#FFFFFF" }}
            >
              Delete
            </Button>
          </div>
        </Form>
      </div>
    );
  };

  const items: TabsProps["items"] = [
    { key: "1", label: `Meeting`, children: <Meeting /> },
    { key: "2", label: `Reminder`, children: "Components2" },
  ];

  return (
    <div className="add-event-in-calendar">
      <Button type="primary" onClick={() => setOpen(true)}>
        open
      </Button>
      <Modal
        open={open}
        centered
        // onOk={hideModal}
        onCancel={hideModal}
        closable={false}
        footer={null}
      >
        <div className="flex flex-col">
          <div className="flex justify-between">
            <span className="text-xl font-medium" style={{ color: "#14142A" }}>
              {title}Add Event
            </span>
            <img
              src={closeIcon}
              alt="closeIcon"
              onClick={() => setOpen(false)}
            ></img>
          </div>

          <Tabs
            size="large"
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
       
          />
        </div>
      </Modal>
    </div>
  );
};
