import { useEffect, useState } from "react";
import { calendarMockData } from "../mockData";
import { Button, Form, Radio, Input, Select, Avatar } from "antd";
// import { Input } from "../../../Input/input";
import { DropDown } from "../../../Dropdown/DropDown";
import TimePickerComp from "../../TimePicker/timePicker";
import { ArrowDownDark, LocationDarkIcon, UserAvatar, VideoRecoder } from "../../../../assets/images";
import DropDownNew from "../../../Dropdown/DropDownNew";
import { SearchBar } from "../../../SearchBar/SearchBar";
import { TextArea } from "../../../TextArea";
import { useRecoilState } from "recoil";
import { attendesListState, calendarListState } from "../../../../store";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../config/validationMessages";
import dayjs from "dayjs";
import { ButtonThemePrimary, ButtonThemeSecondary, TimePickerFormat } from "../../../../components";
import { timeValidator } from "../../../../helpers/dateTimeValidator";
import constants from "../../../../config/constants";

const EditEvent = (props: any) => {
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
  };
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  const { eventId, onClose, updateEvent, getData } = props;
  const [listCalendar, setListCalendar] = useRecoilState(calendarListState);
  const [attendees, setAttendees] = useRecoilState(attendesListState);
  const [activeDay, setActiveDay] = useState<string[]>([]);
  // const [recurrenceType, setRecurrenceType] = useState<string>("");

  const selectedEvent: any = listCalendar.find((event: any) => event.taskId === parseInt(eventId) && event.category !== "reminder");

  const [openPicker, setOpenPicker] = useState({ from: false, to: false });
  const [pickerVal, setPickerVal] = useState<any>({
    from: dayjs(selectedEvent?.startTime),
    to: dayjs(selectedEvent?.endTime),
  });
  const [searchUser, setSearchUser] = useState("");
  const [location, setLocation] = useState(selectedEvent?.location?.type);
  const [recurrence, setRecurrence] = useState(recurrenceTypes[selectedEvent?.recurrence]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedEvent) {
      form.setFields([
        { name: "attendees", value: selectedEvent?.attendees?.map((att: any) => att.id) },
        { name: "title", value: selectedEvent?.title },
        { name: "startTime", value: selectedEvent?.startTime },
        { name: "endTime", value: selectedEvent?.endTime },
        { name: "location", value: selectedEvent?.location?.type },
        { name: "recurrence", value: recurrenceTypes[selectedEvent?.recurrence] },
        { name: "description", value: selectedEvent?.description },
        {
          name: "repeatDay",
          value: Array.isArray(JSON.parse(selectedEvent?.repeatDay)) ? JSON.parse(selectedEvent?.repeatDay)?.map((letter: any) => letter) : null,
        },
      ]);
      if (Array.isArray(JSON.parse(selectedEvent?.repeatDay))) {
        setActiveDay(
          JSON.parse(selectedEvent?.repeatDay)?.map((day: any) => {
            return days[day];
          })
        );
      }
      // setActiveDay(Array.isArray(selectedEvent?.repeatDay) ? selectedEvent?.repeatDay?.map((letter: any) => letter) : []);
    }
  }, []);

  const handleSubmitForm = (values: any) => {
    const fromDate = dayjs(selectedEvent?.dateFrom);
    const toDate = dayjs(selectedEvent?.dateTo);

    const payload: any = {
      title: values.title,
      address: values?.location === "onSite" ? "6-9 The Square, Hayes, Uxbridge UB11 1FW, UK" : "https://zoom.com/call/0234",
      description: values?.description,

      recurrence: recurrencePayload[values?.recurrence],
      locationType: values?.location?.toUpperCase(),
      attendees: values?.attendees || [],
    };
    if (values?.recurrence === "every weekday (mon-fri)" || values?.recurrence === "weekly") {
      payload["repeatDay"] = values?.repeatDay || [];
    }
    if (typeof pickerVal.from === "string")
      payload["startTime"] = dayjs(pickerVal.from, "HH:mm").date(fromDate.date()).month(fromDate.month()).year(fromDate.year()).toISOString();
    if (typeof pickerVal.to === "string")
      payload["endTime"] = dayjs(pickerVal.to, "HH:mm").date(toDate.date()).month(toDate.month()).year(toDate.year()).toISOString();

    updateEvent(payload, selectedEvent?.taskId, () => {
      onClose(false);
      getData();
    });
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

        <div className="recurrence mt-[25px]">
          {/* <label className="label pb-2 block">Recurrence</label> */}
          <Form.Item name="recurrence" label="Recurrence" rules={[{ required: true }]}>
            <DropDown
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
              options={["does not repeat", "every weekday (mon-fri)", "daily", "weekly"]}
            />
          </Form.Item>
        </div>
        {(recurrence === "every weekday (mon-fri)" || recurrence === "weekly") && (
          <Form.Item name="repeatDay" rules={[{ required: true }]}>
            <div className="repeat-weekday">
              <label className="label">Repeat Every</label>
              <div className="flex items-center gap-3">
                <p className="total-count rounded-[8px] flex items-center justify-center">
                  <input type="number" name="repeatWeeks" value={1} className="repeat-week w-[20px] border-none text-center" />
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

        <div className="location mt-[25px]">
          {/* <label className="label pb-2 block">Location</label> */}
          <Form.Item label="Location" name="location">
            <Radio.Group defaultValue={location} onChange={(e: any) => setLocation(e.target.value)}>
              <Radio value={"virtual"} className="mr-[50px]">
                Virtual
              </Radio>
              <Radio value={"onSite"}>On Site</Radio>
            </Radio.Group>
          </Form.Item>
          {location === "virtual" ? (
            <div className="virtual-link mt-[20px] rounded-lg p-[15px]">
              <VideoRecoder className="mr-[15px]" />
              <a href="https://zoom.com/call/0234" target="_blank" rel="noopener noreferrer">
                {selectedEvent?.location.link}
              </a>
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
          <Form.Item name={"attendees"} label="Attendees" className="attendees" rules={[{ required: false }, { type: "array" }]}>
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
