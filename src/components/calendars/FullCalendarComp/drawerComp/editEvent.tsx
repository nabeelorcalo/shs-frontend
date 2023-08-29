import { useEffect, useState } from "react";
import { calendarMockData } from "../mockData";
import { Button, Form, Radio, Input, Select, Avatar, Input as AntInput, TimePicker, DatePicker } from "antd";
// import { Input } from "../../../Input/input";
import { DropDown } from "../../../Dropdown/DropDown";
import TimePickerComp from "../../TimePicker/timePicker";
import { ArrowDownDark, IconCloseModal, IconDatePicker, LocationDarkIcon, UserAvatar, VideoRecoder } from "../../../../assets/images";
import DropDownNew from "../../../Dropdown/DropDownNew";
import { SearchBar } from "../../../SearchBar/SearchBar";
import { TextArea } from "../../../TextArea";
import { useRecoilState } from "recoil";
import { attendesListState, calendarListState } from "../../../../store";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../config/validationMessages";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ButtonThemePrimary, ButtonThemeSecondary, TimePickerFormat } from "../../../../components";
import { timeValidator } from "../../../../helpers/dateTimeValidator";
import constants from "../../../../config/constants";

dayjs.extend(utc);

const EditEvent = (props: any) => {
  const recurrenceData = ["does not repeat", "every weekday (mon-fri)", "daily", "weekly", "monthly", "yearly"];

  const recurrenceTypes: any = {
    DOES_NOT_REPEAT: "does not repeat",
    EVERY_WEEK_DAY: "every weekday (mon-fri)",
    DAILY: "daily",
    WEEKLY: "weekly",
    MONTHLY: "monthly",
    YEARLY: "yearly",
  };
  const recurrencePayload: any = {
    "does not repeat": "DOES_NOT_REPEAT",
    "every weekday (mon-fri)": "EVERY_WEEK_DAY",
    daily: "DAILY",
    weekly: "WEEKLY",
    monthly: "MONTHLY",
    yearly: "YEARLY",
  };
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  const { eventId, onClose, updateEvent, getData } = props;
  const [listCalendar, setListCalendar] = useRecoilState(calendarListState);
  const [attendees, setAttendees] = useRecoilState(attendesListState);
  const [activeDay, setActiveDay] = useState<string[]>([]);
  const [weekDuration, setWeekDuration] = useState(0);
  const [selectedTime, setSelectedTime] = useState<any>(null);
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  // const [recurrenceType, setRecurrenceType] = useState<string>("");

  const selectedEvent: any = listCalendar.find((event: any) => event.taskId === parseInt(eventId) && event.category !== "reminder");

  const [openPicker, setOpenPicker] = useState({ from: false, to: false });
  const [pickerVal, setPickerVal] = useState<any>({
    from: dayjs(selectedEvent?.startTime),
    to: dayjs(selectedEvent?.endTime),
  });

  const [startTimePicker, setStartTimePicker] = useState(dayjs(pickerVal.from, "HH:mm:ss").utc());
  const [searchUser, setSearchUser] = useState("");
  const [location, setLocation] = useState(selectedEvent?.location?.type || "onsite");
  const [recurrence, setRecurrence] = useState(recurrenceTypes[selectedEvent?.recurrence]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedEvent) {
      form.setFields([
        { name: "attendees", value: selectedEvent?.attendees?.map((att: any) => att.id) },
        { name: "title", value: selectedEvent?.title },
        { name: "startTime", value: selectedEvent?.category === "meeting" ? selectedEvent?.startTime : dayjs(selectedEvent?.startTime).utc() },
        { name: "endTime", value: selectedEvent?.category === "meeting" ? selectedEvent?.endTime : dayjs(selectedEvent?.endTime).utc() },
        { name: "location", value: selectedEvent?.location?.type || "onsite" },
        { name: "recurrence", value: recurrenceTypes[selectedEvent?.recurrence] },
        { name: "description", value: selectedEvent?.description },
        { name: "dateFrom", value: dayjs(selectedEvent.dateFrom) },
        {
          name: "repeatDay",
          value: Array.isArray(JSON.parse(selectedEvent?.repeatDay)) ? JSON.parse(selectedEvent?.repeatDay)?.map((letter: any) => letter) : null,
        },
        {
          name: "address",
          value: selectedEvent?.location?.type === "virtual" ? selectedEvent?.address : "",
        },
      ]);
      if (Array.isArray(JSON.parse(selectedEvent?.repeatDay))) {
        setActiveDay(
          JSON.parse(selectedEvent?.repeatDay)?.map((day: any) => {
            return days[day];
          })
        );
      }
      calculateWeeks();
      // setActiveDay(Array.isArray(selectedEvent?.repeatDay) ? selectedEvent?.repeatDay?.map((letter: any) => letter) : []);
    }
  }, []);

  const handleSubmitForm = (values: any) => {
    const fromDate = dayjs(selectedEvent?.dateFrom);
    const toDate = dayjs(selectedEvent?.dateTo);

    const payload: any = {
      title: values.title,
      address: values?.location === "onsite" ? "6-9 The Square, Hayes, Uxbridge UB11 1FW, UK" : values?.address,
      description: values?.description,

      recurrence: recurrencePayload[values?.recurrence],
      locationType: values?.location?.toUpperCase(),
      attendees: values?.attendees || [],
    };
    if (selectedEvent?.category === "meeting") {
      if (values?.recurrence === "every weekday (mon-fri)" || values?.recurrence === "weekly") {
        payload["repeatDay"] = values?.repeatDay || [];
      }
      if (typeof pickerVal.from === "string")
        payload["startTime"] = dayjs(pickerVal.from, "HH:mm").date(fromDate.date()).month(fromDate.month()).year(fromDate.year()).toISOString();
      if (typeof pickerVal.to === "string")
        payload["endTime"] = dayjs(pickerVal.to, "HH:mm").date(toDate.date()).month(toDate.month()).year(toDate.year()).toISOString();
    } else if (selectedEvent.category === "interview") {
      delete payload["recurrence"];
      payload["startTime"] = dayjs(values?.startTime).format("YYYY-MM-DD HH:mm:ss.SSS");
      payload["endTime"] = dayjs(values?.endTime).format("YYYY-MM-DD HH:mm:ss.SSS");
      payload["dateFrom"] = dayjs(values?.dateFrom).format("YYYY-MM-DD");
      payload["dateTo"] = dayjs(values?.dateFrom).format("YYYY-MM-DD");
    }

    updateEvent(payload, selectedEvent?.taskId, () => {
      onClose(false);
      getData();
    });
  };

  const calculateWeeks = () => {
    const dateFrom = dayjs(selectedEvent?.dateFrom).utc();
    const dateTo = dayjs(selectedEvent?.dateTo).utc();
    if (dateFrom && dateTo && (dateFrom?.isBefore(dateTo) || dateFrom?.isSame(dateTo))) {
      setWeekDuration(dateTo?.week() - dateFrom?.week() + 1);
    } else {
      setWeekDuration(0);
    }
  };
  const handleDisableDate = (current: any) => {
    return current.isBefore(dayjs().startOf("day"));
  };
  const handleTimeChange = (time: any, label: any) => {
    setPickerVal({ ...pickerVal, [label]: time.format("HH:mm:ss") });
  };

  const handleTimePickerOpenChange = (open: any) => {
    if (!open && selectedTime) {
      setPickerVal({ from: selectedTime.format("HH:mm:ss") });
      console.log("Selected Time:", selectedTime.format("HH:mm:ss"));
    }
  };

  // const attendeesData = [
  //   {
  //     label: <SearchBar handleChange={(e) => {}} />,
  //     key: "searchbar",
  //   },
  //   {
  //     label: (
  //       <>
  //         {selectedEvent?.attendees?.map((users: any) => (
  //           <div className="flex items-center gap-4 mb-[15px]">
  //             <img src={users.userProfile} alt="icon" />
  //             <p>{users.firstName + " " + users.lastName}</p>
  //           </div>
  //         ))}
  //       </>
  //     ),
  //     key: "users-list",
  //   },
  // ];

  return (
    <div className="edit-detail-wrapper pt-[30px]">
      <Form form={form} layout="vertical" onFinish={handleSubmitForm} validateMessages={DEFAULT_VALIDATIONS_MESSAGES}>
        <div className="event-title">
          {/* <label className="label block">Event Title</label> */}
          <Form.Item label="Event Title" name="title" rules={[{ required: true }]}>
            <Input type="text" name="title" />
          </Form.Item>{" "}
        </div>

        {selectedEvent?.category === "meeting" && (
          <div className="recurrence mt-[25px]">
            {/* <label className="label pb-2 block">Recurrence</label> */}
            <Form.Item name="recurrence" label="Recurrence" rules={[{ required: true }]}>
              {/* <DropDown
                name="Daily"
                // value={recurrence}
                setValue={(e: any) => {
                  setRecurrence(e);
                  form.setFieldValue("recurrence", e);
                  if (e === "every weekday (mon-fri)") {
                    const updatedDays = ["mon", "tue", "wed", "thu", "fri"];
                    setActiveDay(updatedDays);
                    form.setFieldValue(
                      "repeatDay",
                      updatedDays.map((active) => days.indexOf(active).toString())
                    );
                  } else {
                    form.setFieldValue("repeatDay", null);
                    setActiveDay([]);
                  }
                }}
                options={["does not repeat", "every weekday (mon-fri)", "daily", "weekly", "monthly", "yearly"]}
              /> */}
              <Select
                placeholder="Select"
                // value={formValues.recurrence}
                className="w-[100%] capitalize"
                onChange={(e: any) => {
                  setRecurrence(e);
                  form.setFieldValue("recurrence", e);
                  if (e === "every weekday (mon-fri)") {
                    const updatedDays = ["mon", "tue", "wed", "thu", "fri"];
                    setActiveDay(updatedDays);
                    form.setFieldValue(
                      "repeatDay",
                      updatedDays.map((active) => days.indexOf(active).toString())
                    );
                  } else {
                    form.setFieldValue("repeatDay", null);
                    setActiveDay([]);
                  }
                }}
              >
                {recurrenceData.map((recr: any) => (
                  <Select.Option className="capitalize" value={recr}>
                    {recr}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        )}
        {(recurrence === "every weekday (mon-fri)" || recurrence === "weekly") && (
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
                      if (recurrence !== "every weekday (mon-fri)") {
                        const updatedActiveDays = activeDay.includes(day) ? activeDay.filter((active) => active !== day) : [...activeDay, day];
                        setActiveDay(updatedActiveDays);
                        form.setFieldValue(
                          "repeatDay",
                          updatedActiveDays.map((active) => days.indexOf(active).toString())
                        );
                      }
                    }}
                    className={`day capitalize rounded-full cursor-pointer flex items-center justify-center 
                  ${activeDay.includes(day) ? "active" : ""} ${recurrence === "every weekday (mon-fri)" ? "cursor-not-allowed" : ""}`}
                  >
                    {day.substring(0, 1)}
                  </p>
                ))}
              </div>
            </div>
          </Form.Item>
        )}

        {selectedEvent?.category === "meeting" && (
          <div className="flex items-center gap-4">
            <div className="time-from mt-[25px] basis-[50%]">
              <Form.Item name="startTime" label="Start Time" rules={[{ required: true }]}>
                <TimePickerFormat
                  // label={<p className="pb-[6px]">Time From</p>}
                  open={openPicker.from}
                  setOpen={() => setOpenPicker({ from: !openPicker.from, to: false })}
                  optionalTime={pickerVal.from}
                  setValue={(e: string) => {
                    setPickerVal({ ...pickerVal, from: e });
                    form.setFieldValue("startTime", e);
                  }}
                />
              </Form.Item>
            </div>
            <div className="time-to mt-[25px] basis-[50%]">
              <Form.Item
                name="endTime"
                label="End Time"
                rules={[
                  { required: true },
                  () => ({
                    validator(_, value: any) {
                      return timeValidator(pickerVal.from, pickerVal.to);
                    },
                  }),
                ]}
              >
                <TimePickerFormat
                  // label={<p className="pb-[6px]">Time To</p>}
                  open={openPicker.to}
                  setOpen={() => setOpenPicker({ from: false, to: !openPicker.to })}
                  optionalTime={pickerVal.to}
                  setValue={(e: string) => {
                    setPickerVal({ ...pickerVal, to: e });
                    form.setFieldValue("endTime", e);
                  }}
                />
              </Form.Item>
            </div>
          </div>
        )}
        {selectedEvent?.category === "interview" && (
          <>
            <div className="mt-[25px]">
              <Form.Item name="dateFrom" rules={[{ required: true }]} label="Date">
                <DatePicker value={undefined} suffixIcon={<IconDatePicker />} clearIcon={<IconCloseModal />} disabledDate={handleDisableDate} />
              </Form.Item>
            </div>
            <div className="flex items-center gap-4">
              <div className="time-from mt-[25px] basis-[50%]">
                <Form.Item name="startTime" label="Start Time" rules={[{ required: true }]}>
                  <TimePicker
                    open={startOpen}
                    name="startTime"
                    className="custom-picker"
                    popupClassName="custom-format-picker"
                    // value={startTimePicker}
                    format={"HH:mm"}
                    onChange={(time: any) => handleTimeChange(time, "from")}
                    onOpenChange={(val) => {
                      setStartOpen(val);
                      if (!val) setSelectedTime(null);
                    }}
                    onSelect={(e: any) => {
                      setSelectedTime(e);
                      // setTime(e);
                    }}
                    renderExtraFooter={() => (
                      <>
                        <label className="absolute header">Set Time</label>
                        <Button className="footer-btn" onClick={() => setStartOpen(false)}>
                          Cancel
                        </Button>
                        <Button
                          className="footer-btn save-btn"
                          onClick={() => {
                            selectedTime && setStartTimePicker(selectedTime);
                            form.setFieldValue("startTime", selectedTime);
                            // setValue(dayjs(time).format("HH:mm"));
                            setStartOpen(false);
                          }}
                        >
                          Save
                        </Button>
                      </>
                    )}
                  />
                </Form.Item>
              </div>
              <div className="time-to mt-[25px] basis-[50%]">
                <Form.Item
                  name="endTime"
                  label="End Time"
                  rules={[
                    { required: true },
                    () => ({
                      validator(_, value: any) {
                        const startTimeOpen = form.getFieldValue("startTime");
                        const endTimeOpen = form.getFieldValue("endTime");
                        return timeValidator(startTimeOpen, endTimeOpen);
                      },
                    }),
                  ]}
                >
                  <TimePicker
                    open={endOpen}
                    name="endTime"
                    className="custom-picker"
                    popupClassName="custom-format-picker"
                    // value={dayjs(pickerVal.to, "HH:mm:ss").utc()}
                    onChange={(time: any) => handleTimeChange(time, "to")}
                    format={"HH:mm"}
                    onOpenChange={(val) => {
                      setEndOpen(val);
                      if (!val) setSelectedTime(null);
                    }}
                    onSelect={(e: any) => {
                      setSelectedTime(e);
                    }}
                    renderExtraFooter={() => (
                      <>
                        <label className="absolute header">Set Time</label>
                        <Button className="footer-btn" onClick={() => setEndOpen(false)}>
                          Cancel
                        </Button>
                        <Button
                          className="footer-btn save-btn"
                          onClick={() => {
                            selectedTime && setStartTimePicker(selectedTime);
                            form.setFieldValue("endTime", selectedTime);
                            setEndOpen(false);
                          }}
                        >
                          Save
                        </Button>
                      </>
                    )}
                  />
                </Form.Item>
              </div>
            </div>
          </>
        )}

        <div className="location mt-[25px]">
          {/* <label className="label pb-2 block">Location</label> */}
          <Form.Item label="Location" name="location">
            <Radio.Group defaultValue={location} onChange={(e: any) => setLocation(e.target.value)}>
              <Radio value={"virtual"} className="mr-[50px]">
                Virtual
              </Radio>
              <Radio value={"onsite"}>On Site</Radio>
            </Radio.Group>
          </Form.Item>
          {location === "virtual" ? (
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
            <div className="on-site-address mt-[20px] rounded-lg p-[15px] flex items-center">
              <LocationDarkIcon className="mr-[20px]" />
              <p className="break-words">6-9 The Square, Hayes, Uxbridge UB11 1FW, UK</p>
            </div>
          )}
        </div>

        <div className="attendees mt-[25px]">
          {/* <label className="label pb-2 block">Attendess</label> */}
          <Form.Item
            name={"attendees"}
            label="Attendees"
            className="attendees"
            rules={[{ required: selectedEvent?.category === "interview" ? true : false }, { type: "array" }]}
          >
            {/* <DropDownNew items={attendeesData}>
            <div className="attendees-dropdown rounded-lg flex items-center h-[48px] cursor-pointer justify-between gap-3 py-2 px-4">
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
          <div className="flex items-center gap-2 mt-[10px] flex-wrap">
            {selectedEvent?.attendees?.map((user: any, i: number) => (
              // <img key={i} src={users?.userProfile || UserAvatar} className="h-[32px] w-[32px] rounded-full object-cover" />
              <Avatar size={30} src={`${constants.MEDIA_URL}/${user?.profileImage?.mediaId}.${user?.profileImage?.metaData?.extension}`}>
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </Avatar>
            ))}
          </div>
        </div>

        <div className="description mt-[25px]">
          {/* <label className="label pb-2 block">Description</label> */}
          <Form.Item name="description" label="Description">
            <TextArea
              rows={4}
              // value={selectedEvent?.description}
              placeholder="write something..."
              // onChange={(e: any) => {}}
            />
          </Form.Item>
        </div>

        <div className="flex items-center justify-end gap-3 mt-[30px]">
          <ButtonThemeSecondary className="outlined-btn" onClick={() => onClose(false)}>
            Cancel
          </ButtonThemeSecondary>
          <ButtonThemePrimary className="primary-btn" htmlType="submit">
            Submit
          </ButtonThemePrimary>
        </div>
      </Form>
    </div>
  );
};

export default EditEvent;
