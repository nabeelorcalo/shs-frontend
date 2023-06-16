import { useState } from "react";
import { Input } from "../../../Input/input";
import { Col, Form, Row, Radio, Button, Select } from "antd";
import DropDownNew from "../../../Dropdown/DropDownNew";
import { ArrowDownDark, LocationDarkIcon, UserAvatar, VideoRecoder } from "../../../../assets/images";
// import { SearchBar } from "../../../SearchBar/SearchBar";
// import { DropDown } from "../../../Dropdown/DropDown";
import { CommonDatePicker } from "../../CommonDatePicker/CommonDatePicker";
// import TimePickerComp from "../../TimePicker/timePicker";
// import { TextArea } from "../../../TextArea";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../config/validationMessages";
import { SearchBar, DropDown, TimePickerComp, TextArea } from "../../../../components";
import dayjs from "dayjs";
<<<<<<< HEAD
import { useRecoilState } from "recoil";
import { attendesListState } from "../../../../store";

const Meeting = (props: any) => {
  const { onClose, addEvent, getData } = props;
  const [attendees, setAttendees] = useRecoilState(attendesListState);
  const [searchUser, setSearchUser] = useState("");
=======

const Meeting = (props: any) => {
  const { onClose, addEvent } = props;
>>>>>>> dev

  const [formValues, setFormValues] = useState({
    title: "",
    attendees: "",
    recurrence: "",
    date: "",
    dateFrom: "",
    dateTo: "",
    startTime: "",
    endTime: "",
    location: "virtual",
    description: "",
  });

  const [form] = Form.useForm();

  const [openDate, setOpenDate] = useState({ date: false, from: false, to: false });
  const [openTime, setOpenTime] = useState({ start: false, end: false });
  const [activeDay, setActiveDay] = useState<string[]>([]);

  const recurrenceData = ["does not repeat", "every weekday (mon-fri)", "daily", "weekly"];
  const recurrencePayload: any = {
    "does not repeat": "DOES_NOT_REPEAT",
    "every weekday (mon-fri)": "EVERY_WEEK_DAY",
    daily: "DAILY",
    weekly: "WEEKLY",
  };
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  const handleSubmitForm = (e: any) => {
    const payload = {
      title: e.title,
      address:
        formValues?.location === "onSite"
          ? "6-9 The Square, Hayes, Uxbridge UB11 1FW, UK"
          : " https://zoom.com/call/0234",
      description: e?.description,
      eventType: "MEETING",
<<<<<<< HEAD
      dateFrom: e?.dateFrom?.format("YYYY-MM-DD"),
      dateTo: e?.dateTo?.format("YYYY-MM-DD"),
      startTime: dayjs(e?.startTime, "hh:mm")
        .year(e?.dateFrom?.year())
        .month(e?.dateFrom?.month())
        .date(e?.dateFrom?.date()),
      endTime: dayjs(e?.endTime, "hh:mm")
        .year(e?.dateFrom?.year())
        .month(e?.dateFrom?.month())
        .date(e?.dateFrom?.date()),
      repeatDay: e?.repeatDay || [],
      recurrence: recurrencePayload[e?.recurrence],
      locationType: formValues?.location?.toUpperCase(),
      attendees: e?.attendees || [],
    };
    addEvent(payload, () => {
      onClose(false);
      form.resetFields();
      getData();
    });
=======
      dateFrom: dayjs(e?.dateFrom).format("YYYY-MM-DD"),
      dateTo: dayjs(e?.dateTo).format("YYYY-MM-DD"),
      startTime: dayjs(e?.startTime, "hh:mm"),
      endTime: dayjs(e?.endTime, "hh:mm"),
      repeatDay: e?.repeatDay || 0,
      recurrence: e?.recurrence?.toUpperCase().replace(/\s/g, "_"),
      locationType: formValues?.location?.toUpperCase(),
      attendees: [],
    };

    addEvent(payload);
>>>>>>> dev
  };

  return (
    <div className="meeting-wrapper">
      <Form form={form} layout="vertical" onFinish={handleSubmitForm} validateMessages={DEFAULT_VALIDATIONS_MESSAGES}>
        <Form.Item name={"title"} label="Title" rules={[{ required: true }]}>
          <Input
            // label="Title"
            value={formValues.title}
            name="title"
            type="text"
            placeholder="Select"
            handleChange={(e: any) => setFormValues({ ...formValues, title: e.target.value })}
          />
        </Form.Item>
<<<<<<< HEAD
        <Form.Item
          name={"attendees"}
          label="Attendees"
          className="attendees"
          rules={[{ required: false }, { type: "array" }]}
        >
          {/* <label className="label">Attendees</label> */}
          {/* <DropDownNew
=======
        <Form.Item name={"attendees"} label="Attendees" className="attendees" rules={[{ required: false }]}>
          {/* <label className="label">Attendees</label> */}
          <DropDownNew
>>>>>>> dev
            items={[
              {
                key: "1",
                label: <SearchBar handleChange={(e: any) => setSearchUser(e)} />,
              },
              ...attendees
                .filter((attendee: any) => {
                  if (searchUser.trim() === "") return true;

                  const fullName = attendee?.firstName + " " + attendee?.lastName;
                  return fullName.toLowerCase().includes(searchUser.toLowerCase());
                })
                .map((user: any) => ({
                  key: "2",
                  label: (
                    <div className="flex items-center gap-3">
                      <img src={UserAvatar} className="h-[25px] w-[25px]" />
                      <p>{user?.firstName + " " + user?.lastName}</p>
                    </div>
                  ),
                })),
              // {
              //   key: "3",
              //   label: (
              //     <div className="flex items-center gap-3">
              //       <img src={UserAvatar} className="h-[25px] w-[25px]" />
              //       <p>user name</p>
              //     </div>
              //   ),
              // },
            ]}
            overlayClassName="max-h-[400px] overflow-auto"
          >
            <div className="users-list flex items-center justify-between">
              <p>Select</p>
              <ArrowDownDark />
            </div>
          </DropDownNew> */}
          <Select
            showSearch={false}
            mode="multiple"
            placeholder="Select"
            dropdownRender={(menu: any) => (
              <>
                <SearchBar handleChange={(e: any) => setSearchUser(e)} />
                {menu}
              </>
            )}
          >
            {attendees
              .filter((attendee: any) => {
                if (searchUser.trim() === "") return true;

                const fullName = attendee?.firstName + " " + attendee?.lastName;
                return fullName.toLowerCase().includes(searchUser.toLowerCase());
              })
              .map((user: any, index: number) => (
                <Select.Option key={index} value={user?.id}>
                  <div className="flex items-center gap-3">
                    <img src={UserAvatar} className="h-[25px] w-[25px]" />
                    <p>{user?.firstName + " " + user?.lastName}</p>
                  </div>
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item name={"recurrence"} label="Recurrence" className="recurrence" rules={[{ required: true }]}>
          {/* <label className="label">Recurrence</label> */}
          <DropDown
            value={formValues.recurrence}
            options={recurrenceData}
            setValue={(e: string) => {
              setFormValues({ ...formValues, recurrence: e });
              form.setFieldValue("recurrence", e);
            }}
            name="Select"
          />
        </Form.Item>
        {formValues.recurrence === "does not repeat" && (
          <Form.Item name="date" className="date-from" label="Date" rules={[{ required: true }]}>
            <CommonDatePicker
              // label="Date"
              open={openDate.date}
              setOpen={() => setOpenDate({ from: false, to: false, date: !openDate.date })}
            />
          </Form.Item>
        )}
        {formValues.recurrence !== "" && (
          <Row gutter={[15, 15]}>
            <Col xs={12}>
              <Form.Item className="date-from" name="dateFrom" label="Date From" rules={[{ required: true }]}>
                <CommonDatePicker
                  // label="Date From"
                  open={openDate.from}
                  setOpen={() => setOpenDate({ from: !openDate.from, to: false, date: false })}
                />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item className="date-to" name="dateTo" label="Date To" rules={[{ required: true }]}>
                <CommonDatePicker
                  // label="Date To"
                  open={openDate.to}
                  setOpen={() => setOpenDate({ from: false, to: !openDate.to, date: false })}
                />
              </Form.Item>
            </Col>
          </Row>
        )}

        {(formValues.recurrence === "every weekday (mon-fri)" || formValues.recurrence === "weekly") && (
          <Form.Item name="repeatDay" rules={[{ required: true }]}>
            <div className="repeat-weekday">
              <label className="label">Repeat Every</label>
              <div className="flex items-center gap-3">
                <p className="total-count rounded-[8px] flex items-center justify-center">
                  <input
                    type="number"
                    name="repeatWeeks"
                    value={1}
                    className="repeat-week w-[20px] border-none text-center"
                  />
                </p>
                <p className="weeks">Week(s)</p>
              </div>
              <div className="flex items-center gap-3 mt-3">
                {days.map((day: any, index: number) => (
                  <p
                    key={day}
                    onClick={() => {
                      const updatedActiveDays = activeDay.includes(day)
                        ? activeDay.filter((active) => active !== day)
                        : [...activeDay, day];
                      setActiveDay(updatedActiveDays);
                      form.setFieldValue(
                        "repeatDay",
                        updatedActiveDays.map((active) => days.indexOf(active).toString())
                      );
                    }}
                    className={`day capitalize rounded-full cursor-pointer flex items-center justify-center 
                  ${activeDay.includes(day) ? "active" : ""}
                  `}
                  >
                    {day.substring(0, 1)}
                  </p>
                ))}
              </div>
            </div>
          </Form.Item>
        )}

        <Row gutter={[15, 15]}>
          <Col xs={12}>
            <Form.Item name="startTime" label="Start Time" rules={[{ required: true }]}>
              <TimePickerComp
                // label="Start Time"
                open={openTime.start}
                setOpen={() => setOpenTime({ start: !openTime.start, end: false })}
                setValue={(e: string) => {
                  setFormValues({ ...formValues, startTime: e });
                  form.setFieldValue("startTime", e);
                }}
                value={formValues.startTime}
              />
            </Form.Item>
          </Col>

          <Col xs={12}>
            <Form.Item name="endTime" label="End Time" rules={[{ required: true }]}>
              <TimePickerComp
                // label="End Time"
                open={openTime.end}
                setOpen={() => setOpenTime({ start: false, end: !openTime.end })}
                setValue={(e: string) => {
                  setFormValues({ ...formValues, endTime: e });
                  form.setFieldValue("endTime", e);
                }}
                value={formValues.endTime}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="locationType" label="Location" rules={[{ required: false }]}>
          {/* <label className="label">Location</label> */}
          <Radio.Group
            value={formValues.location}
            onChange={(e) => setFormValues({ ...formValues, location: e.target.value })}
          >
            <Radio value={"virtual"} className="mr-[20px]">
              Virtual
            </Radio>
            <Radio value={"onSite"}>On Site</Radio>
          </Radio.Group>
          {formValues?.location === "virtual" ? (
            <div className="virtual-link mt-[20px] rounded-lg p-[15px]">
              <VideoRecoder className="mr-[15px]" />
              <a href="https://zoom.com/call/0234" target="_blank" rel="noopener noreferrer">
                https://zoom.com/call/0234
              </a>
            </div>
          ) : (
            <div className="on-site-address mt-[20px] rounded-lg p-[15px] flex items-center">
              <LocationDarkIcon className="mr-[20px]" />
              <p className="break-words">6-9 The Square, Hayes, Uxbridge UB11 1FW, UK</p>
            </div>
          )}
        </Form.Item>

        <Form.Item label="Description" name="description">
          {/* <label className="label">Description (Optional)</label> */}
          <TextArea
            rows={5}
            placeholder="Write Something..."
            onChange={(e: any) => setFormValues({ ...formValues, description: e.target.value })}
          />
        </Form.Item>

        <div className="flex gap-4 justify-end">
          <Button className="cancel-btn" onClick={() => onClose(false)}>
            Cancel
          </Button>
          <Button htmlType="submit" className="add-btn green-graph-tooltip-bg text-white">
            Add
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Meeting;
