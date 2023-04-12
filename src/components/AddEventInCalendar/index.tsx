import { VideoCameraOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Modal,
  Radio,
  Select,
  Space,
  TimePicker,
  Input,
} from "antd";
import { useState } from "react";
import "./style.scss";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CloseCircleFilled } from "@ant-design/icons/lib/icons";
import AppTabs from "../Tabs";
const { TextArea } = Input;
dayjs.extend(customParseFormat);
const format = "HH:mm";

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

export const AddEventInCalendar = (props: AddEventInCalendarProps) => {
  const { title, open, closeFunction, zoomVideoLink, setOpen } = props;
  const onChange = (key: string) => {
  };

  const [value, setValue] = useState(1);
  const Meeting = () => {
    return (
      <div className="meeting h-[550px]">
        <Form layout="vertical">
          <p>
            Title<span className="text-[red]">*</span>
          </p>
          <Input placeholder="Title" className="input-style" />{" "}
          <p>
            Attendees<span className="text-[red]">*</span>
          </p>
          <Select
            size="large"
            style={{ width: "100%" }}
            placeholder="Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            options={[
              {
                value: "1",
                label: "Sick",
              },
              {
                value: "2",
                label: "Casual",
              },
              {
                value: "3",
                label: "Work From Home",
              },
              {
                value: "4",
                label: "Medical",
              },
            ]}
          />
          <p>
            Recurrence<span className="text-[red]">*</span>
          </p>
          <Select
            size="large"
            style={{ width: "100%" }}
            placeholder="Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            options={[
              {
                value: "1",
                label: "Sick",
              },
              {
                value: "2",
                label: "Casual",
              },
              {
                value: "3",
                label: "Work From Home",
              },
              {
                value: "4",
                label: "Medical",
              },
            ]}
          />
          <div className="flex flex-col md:flex-row justify-between w-full mt-5">
            <div className="flex flex-col justify-between w-full pr-2 ">
              <label>Start Time</label>
              <TimePicker
                className="h-[45px]"
                defaultValue={dayjs("12:08", format)}
                format={format}
              />
            </div>
            <div className="flex flex-col w-full pl-1">
              <label>End Time</label>
              <TimePicker
                className="h-[45px] mt-2"
                defaultValue={dayjs("12:08", format)}
                format={format}
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
          <p>
            Title<span className="text-[red]">*</span>
          </p>
          <Input placeholder="Title" className="input-style" />{" "}
          <div className="flex flex-col md:flex-row justify-between pb-3">
            <div className="d-flex w-full pr-1">
              <p>
                Attendees<span className="text-[red]">*</span>
              </p>
              <Input placeholder="Title" className="input-style" />
            </div>

            <div className="d-flex w-full pl-1">
              <p>
                Recurrence<span className="text-[red]">*</span>
              </p>
              <Input placeholder="Title" className="input-style" />
            </div>
          </div>
          <div className="flex flex-col justify-between py-3">
            <label> Time</label>
            <TimePicker
              className="h-[45px] mt-2"
              defaultValue={dayjs("12:08", format)}
              format={format}
            />
          </div>
          <div className="mt-3 flex flex-col">
            <label>Description</label>
            <TextArea rows={6} placeholder="Write Something..." maxLength={6} />
          </div>
        </Form>
      </div>
    );
  };

  return (
    <div className="add-event-calendar">
      <Modal
        open={open}
        centered
        onCancel={closeFunction}
        footer={null}
        closeIcon={<CloseCircleFilled className="text-xl text-[#A3AED0] add-event-in-calendar" />}
        title={title}
        width={720}
      >
        <div className="flex flex-col">
          <AppTabs
            items={[
              {
                children: <Meeting />,
                key: "1",
                label: "Meeting",
              },
              {
                children: <Reminder />,
                key: "2",
                label: "Reminder",
              },
            ]}
          />
        </div>
        <Space className="flex justify-end mt-5">
        
          <Button key="Cancel" className="footer-cancel-btn ">
            Cancel
          </Button>
          <Button key="submit" className="footer-submit-btn ">
            Submit
          </Button>
        </Space>
      </Modal>
    </div>
  );
};
