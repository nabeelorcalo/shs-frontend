import { VideoCameraOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Radio, Space, TimePicker } from "antd";
import { useState } from "react";
import closeIcon from "../../assets/images/AddEventInCalendar/close-circle.svg";
import "./AddEventInCalendar.scss";
import { Tabs, TabsProps } from "antd";
import { Input } from "antd";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CloseCircleFilled } from "@ant-design/icons/lib/icons";
import AppTabs from "../Tabs";
const { TextArea } = Input;
dayjs.extend(customParseFormat);

interface AddEventInCalendarProps {
  title: string;
  closeFunction?: any;
  open?: boolean;
  zoomVideoLink?: string;
  setOpen?: any;
  width?: any;
  closeIcon?: any;
  footer?: any;
}

export const AddEventInCalendar = ({
  title,
  closeFunction,
  setOpen,
  open,
  width,
  zoomVideoLink,
}: AddEventInCalendarProps) => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const [value, setValue] = useState(1);
  const Meeting = () => {
    return (
      <div className="meeting h-[550px]">
        <Form layout="vertical">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input your Email!" }]}
            style={{ width: "100%" }}
          >
            <Input placeholder="Title" className="input-style" />{" "}
          </Form.Item>
          <Form.Item
            label="Attendees"
            name="title"
            rules={[{ required: true, message: "Please input your Email!" }]}
            style={{ width: "100%" }}
          >
            <Input placeholder="Title" className="input-style" />{" "}
          </Form.Item>
          <Form.Item
            label="Recurrence"
            name="title"
            rules={[{ required: true, message: "Please input your Email!" }]}
            style={{ width: "100%" }}
          >
            <Input placeholder="Title" className="input-style" />{" "}
          </Form.Item>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-col justify-between">
              <label>Start Time</label>
              <TimePicker
                className="input-style md:w-[220px]"
                defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
              />
            </div>
            <div className="flex flex-col">
              <label>End Time</label>
              <TimePicker
                className="input-style md:w-[220px]"
                defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
              />
            </div>
          </div>
          <div className="mt-3 flex flex-col">
            <label>Location</label>
            <Radio.Group value={value}>
              <Radio value={1}>Virtual</Radio>
              <Radio value={2}>On Site</Radio>
            </Radio.Group>
          </div>
          <Input
            disabled={true}
            className="input-style my-3"
            size="large"
            placeholder={zoomVideoLink}
            prefix={<VideoCameraOutlined />}
          />

          <div className="mt-3 flex flex-col">
            <label>Description</label>
            <TextArea rows={6} placeholder="Write Something..." maxLength={6} />
          </div>
        </Form>
      </div>
    );
  };
  const Reminder = () => {
    return (
      <div className="meeting h-[550px]">
        <Form layout="vertical">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input your Email!" }]}
            style={{ width: "100%" }}
          >
            <Input placeholder="Title" className="input-style" />{" "}
          </Form.Item>
          <div className="flex flex-col md:flex-row justify-between pb-3">
            <Form.Item
              label="Attendees"
              name="title"
              rules={[{ required: true, message: "Please input your Email!" }]}
              className="input-style md:w-[220px]"
            >
              <Input placeholder="Title" className="input-style" />{" "}
            </Form.Item>
            <Form.Item
              label="Recurrence"
              name="title"
              rules={[{ required: true, message: "Please input your Email!" }]}
              className="input-style md:w-[220px]"
            >
              <Input placeholder="Title" className="input-style" />{" "}
            </Form.Item>
          </div>

          <div className="flex flex-col justify-between py-3">
            <label> Time</label>
            <TimePicker
              className="input-style "
              defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
            />
          </div>

          <div className="mt-3 flex flex-col">
            <label>Description</label>
            <TextArea rows={6} placeholder="Write Something..." maxLength={6} />
          </div>

          {/* <div className="flex justify-end mt-5">
            <Button
              className="mx-2 mx--2 competitor-modal-cencel-btn"
              style={{
                height: "40px",
                color: "#4a9d77 ",
                border: "1px solid #4a9d77",
              }}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="mx-2 "
              style={{
                height: "40px",
                background: "#4a9d77",
                color: "#FFFFFF",
                width: "80px",
              }}
            >
              Add
            </Button>
          </div> */}
        </Form>
      </div>
    );
  };

  // const items: TabsProps["items"] = [
  //   { key: "1", label: `Meeting`, children: <Meeting /> },
  //   { key: "2", label: `Reminder`, children: <Reminder /> },
  // ];
 

  return (
    <div className="add-event-in-calendar">
      <Modal
        open={open}
        centered
        onCancel={closeFunction}
        closeIcon={
          <CloseCircleFilled style={{ color: "#A3AED0", fontSize: "20px" }} />
        }
        footer={[
          <Button
            key="Cancel"
            style={{
              border: "1px solid #4a9d77",
              color: "#4a9d77",
              padding: "0px 20px",
            }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            style={{
              backgroundColor: "#4a9d77",
              border: "1px solid #4a9d77",
              color: "#fff",
              padding: "0px 20px",
            }}
          >
            Submit
          </Button>,
        ]}
        title={title}
        width={720}
      >
        <div className="flex flex-col">
        <AppTabs
  items={[
    {
      children: <Meeting />,
      key: '1',
      label: 'Meeting'
    },
    {
      children: <Reminder />,
      key: '2',
      label: 'Reminder'
    },
 
  ]}
 />
        </div>
      </Modal>
    </div>
  );
};
