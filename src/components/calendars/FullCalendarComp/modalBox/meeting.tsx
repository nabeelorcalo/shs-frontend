import { useEffect, useState } from "react";
import { Input } from "../../../Input/input";
import { Col, Form, Row, Radio, Button, Select, Avatar, Input as AntInput, DatePicker } from "antd";
import DropDownNew from "../../../Dropdown/DropDownNew";
import { ArrowDownDark, IconCloseModal, IconDatePicker, LocationDarkIcon, UserAvatar, VideoRecoder } from "../../../../assets/images";
// import { SearchBar } from "../../../SearchBar/SearchBar";
// import { DropDown } from "../../../Dropdown/DropDown";
import { CommonDatePicker } from "../../CommonDatePicker/CommonDatePicker";
// import TimePickerComp from "../../TimePicker/timePicker";
// import { TextArea } from "../../../TextArea";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../config/validationMessages";
import { SearchBar, DropDown, TextArea, TimePickerFormat, ButtonThemeSecondary, ButtonThemePrimary } from "../../../../components";
import dayjs from "dayjs";
import { useRecoilState, useRecoilValue } from "recoil";
import { attendesListState, calendarLocationState, newLocationsDataState } from "../../../../store";
import { dateValidator, timeValidator } from "../../../../helpers/dateTimeValidator";
import constants from "../../../../config/constants";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(weekOfYear);

const Meeting = (props: any) => {
  const { onClose, addEvent, getData, form } = props;
  const [attendees, setAttendees] = useRecoilState(attendesListState);
  const [searchUser, setSearchUser] = useState("");
  const [weekDuration, setWeekDuration] = useState<any>(0);
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

  // const [form] = Form.useForm();

  const [openDate, setOpenDate] = useState({ date: false, from: false, to: false });
  const [openTime, setOpenTime] = useState({ start: false, end: false });
  const [activeDay, setActiveDay] = useState<string[]>([]);
  const locationsData = useRecoilValue(calendarLocationState);

  const recurrenceData = ["does not repeat", "every weekday (mon-fri)", "daily", "weekly", "monthly", "yearly"];
  const recurrencePayload: any = {
    "does not repeat": "DOES_NOT_REPEAT",
    "every weekday (mon-fri)": "EVERY_WEEK_DAY",
    daily: "DAILY",
    weekly: "WEEKLY",
    monthly: "MONTHLY",
    yearly: "YEARLY",
  };
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  useEffect(() => {
    setFormValues({
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
  }, []);
  const handleSubmitForm = (e: any) => {
    const payload = {
      title: e.title,
      address: formValues?.location === "onSite" ? e?.address2 : e?.address,
      description: e?.description,
      eventType: "MEETING",
      dateFrom: e?.dateFrom?.format("YYYY-MM-DD"),
      dateTo: e?.dateTo?.format("YYYY-MM-DD"),
      startTime: dayjs(e?.startTime, "HH:mm").year(e?.dateFrom?.year()).month(e?.dateFrom?.month()).date(e?.dateFrom?.date()),
      endTime: dayjs(e?.endTime, "HH:mm").year(e?.dateTo?.year()).month(e?.dateTo?.month()).date(e?.dateTo?.date()),
      repeatDay: e?.repeatDay || [],
      recurrence: recurrencePayload[e?.recurrence],
      locationType: formValues?.location?.toUpperCase(),
      attendees: e?.attendees || [],
    };
    addEvent(payload, () => {
      onClose(false);
      form.resetFields();
      getData();
      setWeekDuration(0);
      setFormValues({
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
    });
  };

  const handleDisableDate = (current: any) => {
    return current.isBefore(dayjs().startOf("day"));
  };

  const calculateWeeks = () => {
    const dateFrom = form.getFieldValue("dateFrom");
    const dateTo = form.getFieldValue("dateTo");
    if (dateFrom && dateTo && (dateFrom?.isBefore(dateTo) || dateFrom?.isSame(dateTo))) {
      setWeekDuration(Math.floor(dateTo?.diff(dateFrom, "day") / 7));
    } else {
      setWeekDuration(0);
    }
  };

  const resetFields = () => {
    onClose(false);
    form.resetFields();
    setWeekDuration(0);
    setFormValues({
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
  };

  return (
    <div className="meeting-wrapper">
      <Form form={form} layout="vertical" onFinish={handleSubmitForm} validateMessages={DEFAULT_VALIDATIONS_MESSAGES}>
        <Form.Item name={"title"} label="Title" rules={[{ required: true }]}>
          <AntInput
            className="input"
            // label="Title"
            value={formValues.title}
            name="title"
            type="text"
            placeholder="Select"
            prefix={<></>}
            onChange={(e: any) => setFormValues({ ...formValues, title: e.target.value })}
          />
        </Form.Item>
        <Form.Item name={"attendees"} label="Attendees" className="attendees" rules={[{ required: false }, { type: "array" }]}>
          {/* <label className="label">Attendees</label> */}
          {/* <DropDownNew
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
            {attendees &&
              attendees
                .filter((attendee: any) => {
                  if (searchUser.trim() === "") return true;

                  const fullName = attendee?.firstName + " " + attendee?.lastName;
                  return fullName.toLowerCase().includes(searchUser.toLowerCase());
                })
                .map((user: any, index: number) => (
                  <Select.Option key={index} value={user?.id}>
                    <div className="flex items-center gap-3">
                      {/* <img src={UserAvatar} className="h-[25px] w-[25px]" /> */}
                      <Avatar size={30} src={`${constants.MEDIA_URL}/${user?.profileImage?.mediaId}.${user?.profileImage?.metaData?.extension}`}>
                        {user?.firstName?.charAt(0)}
                        {user?.lastName?.charAt(0)}
                      </Avatar>
                      <p>{user?.firstName + " " + user?.lastName}</p>
                    </div>
                  </Select.Option>
                ))}
          </Select>
        </Form.Item>

        <Form.Item name={"recurrence"} label="Recurrence" className="recurrence" rules={[{ required: true }]}>
          {/* <label className="label">Recurrence</label> */}
          {/* <DropDown
            value={formValues.recurrence}
            options={recurrenceData}
            setValue={(e: string) => {
              setFormValues({ ...formValues, recurrence: e });
              form.setFieldValue("recurrence", e);
              if (e === "every weekday (mon-fri)") {
                const updatedDays = ["mon", "tue", "wed", "thu", "fri"];
                setActiveDay(updatedDays);
                form.setFieldValue(
                  "repeatDay",
                  updatedDays.map((active) => days.indexOf(active).toString())
                );
              } else setActiveDay([]);
            }}
            name="Select"
          /> */}
          <Select
            placeholder="Select"
            value={formValues.recurrence}
            className="w-[100%] capitalize"
            onChange={(e: any) => {
              setFormValues({ ...formValues, recurrence: e });
              form.setFieldValue("recurrence", e);
              if (e === "every weekday (mon-fri)") {
                const updatedDays = ["mon", "tue", "wed", "thu", "fri"];
                setActiveDay(updatedDays);
                form.setFieldValue(
                  "repeatDay",
                  updatedDays.map((active) => days.indexOf(active).toString())
                );
              } else setActiveDay([]);
            }}
          >
            {recurrenceData.map((recr: any) => (
              <Select.Option className="capitalize" value={recr}>
                {recr}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {/* {formValues.recurrence === "does not repeat" && (
          <Form.Item name="date" className="date-from" label="Date" rules={[{ required: true }]}>
            <CommonDatePicker
              // label="Date"
              disabledDates={handleDisableDate}
              open={openDate.date}
              setOpen={() => setOpenDate({ from: false, to: false, date: !openDate.date })}
            />
          </Form.Item>
        )} */}
        {formValues.recurrence !== "" && (
          <Row gutter={[15, 15]}>
            <Col xs={12}>
              <Form.Item className="date-from" name="dateFrom" label="Date From" rules={[{ required: true }]}>
                {/* <CommonDatePicker
                  // label="Date From"
                  disabledDates={handleDisableDate}
                  open={openDate.from}
                  setOpen={() => {
                    setOpenDate({ from: !openDate.from, to: false, date: false });
                    calculateWeeks();
                  }}
                  className="date-picker-color-change"
                /> */}
                <DatePicker
                  value={undefined}
                  suffixIcon={<IconDatePicker />}
                  clearIcon={<IconCloseModal />}
                  disabledDate={handleDisableDate}
                  onOpenChange={(val) => calculateWeeks()}
                />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item
                className="date-to"
                name="dateTo"
                label="Date To"
                rules={[
                  { required: true, message: "" },
                  () => ({
                    validator(_, value: any) {
                      const startTime = form.getFieldValue("dateFrom");
                      return dateValidator(startTime, value);
                    },
                  }),
                ]}
              >
                <DatePicker
                  value={undefined}
                  suffixIcon={<IconDatePicker />}
                  clearIcon={<IconCloseModal />}
                  disabledDate={handleDisableDate}
                  onOpenChange={(val) => calculateWeeks()}
                />
                {/* <CommonDatePicker
                  // label="Date To"
                  disabledDates={handleDisableDate}
                  open={openDate.to}
                  setOpen={() => {
                    setOpenDate({ from: false, to: !openDate.to, date: false });
                    calculateWeeks();
                  }}
                /> */}
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
                  <input type="number" name="repeatWeeks" value={weekDuration} className="repeat-week w-[20px] border-none text-center" />
                </p>
                <p className="weeks">Week(s)</p>
              </div>
              <div className="flex items-center gap-3 mt-3">
                {days.map((day: any, index: number) => (
                  <p
                    key={day}
                    onClick={() => {
                      if (formValues?.recurrence !== "every weekday (mon-fri)") {
                        const updatedActiveDays = activeDay.includes(day) ? activeDay.filter((active) => active !== day) : [...activeDay, day];
                        setActiveDay(updatedActiveDays);
                        form.setFieldValue(
                          "repeatDay",
                          updatedActiveDays.map((active) => days.indexOf(active).toString())
                        );
                      }
                    }}
                    className={`day capitalize rounded-full cursor-pointer flex items-center justify-center 
                  ${activeDay.includes(day) ? "active" : ""} ${formValues.recurrence === "every weekday (mon-fri)" ? "cursor-not-allowed" : ""}`}
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
              <TimePickerFormat
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
            <Form.Item
              name="endTime"
              label="End Time"
              rules={[
                { required: true, message: "" },
                () => ({
                  validator(_, value: any) {
                    const startTime = form.getFieldValue("startTime");
                    return timeValidator(startTime, value);
                  },
                }),
              ]}
            >
              <TimePickerFormat
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
          <Radio.Group value={formValues.location} onChange={(e) => setFormValues({ ...formValues, location: e.target.value })}>
            <Radio value={"virtual"} className="mr-[20px]">
              Virtual
            </Radio>
            <Radio value={"onSite"}>On Site</Radio>
          </Radio.Group>
          {formValues?.location === "virtual" ? (
            <div className=" mt-[20px] rounded-lg ">
              <Form.Item name="address" rules={[{ required: true }, { pattern: /^https?:\/\//, message: "Please enter a valid Link" }]}>
                {/* <a href="https://zoom.com/call/0234" target="_blank" rel="noopener noreferrer">
                https://zoom.com/call/0234
              </a> */}
                {/* <VideoRecoder className="mr-[15px]" /> */}
                <AntInput
                  className="input"
                  // label="Title"
                  type="text"
                  placeholder="Enter Zoom link"
                  prefix={<VideoRecoder className="mr-[15px]" />}
                />
              </Form.Item>
            </div>
          ) : (
            <Form.Item name="address2" rules={[{ required: true }]} className="mt-[20px]">
              <AntInput
                className="input"
                // label="Title"
                type="text"
                placeholder="Enter address"
                prefix={<LocationDarkIcon className="mr-[15px]" />}
              />
            </Form.Item>
            // <div className="on-site-address mt-[20px] rounded-lg p-[15px] flex items-center">
            //   <LocationDarkIcon className="mr-[20px]" />
            //   <p className="break-words">6-9 The Square, Hayes, Uxbridge UB11 1FW, UK</p>
            // </div>
          )}
        </Form.Item>

        <Form.Item label="Description" name="description">
          {/* <label className="label">Description (Optional)</label> */}
          <TextArea rows={5} placeholder="Write Something..." onChange={(e: any) => setFormValues({ ...formValues, description: e.target.value })} />
        </Form.Item>

        <div className="flex gap-4 justify-end">
          <ButtonThemeSecondary className="cancel-btn" onClick={resetFields}>
            Cancel
          </ButtonThemeSecondary>
          <ButtonThemePrimary htmlType="submit" className="add-btn green-graph-tooltip-bg text-white">
            Add
          </ButtonThemePrimary>
        </div>
      </Form>
    </div>
  );
};

export default Meeting;
