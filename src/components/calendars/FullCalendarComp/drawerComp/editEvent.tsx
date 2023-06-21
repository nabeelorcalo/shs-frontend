import { useState } from "react";
import { calendarMockData } from "../mockData";
import { Button, Form, Radio, Input, Select } from "antd";
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
import { TimePickerFormat } from "../../../../components";

const EditEvent = (props: any) => {
  const recurrenceTypes: any = {
    DOES_NOT_REPEAT: "does not repeat",
    EVERY_WEEK_DAY: "every weekday (Mon - Fri)",
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
  const { eventId, onClose, updateEvent, getData } = props;
  const [listCalendar, setListCalendar] = useRecoilState(calendarListState);
  const [attendees, setAttendees] = useRecoilState(attendesListState);

  const selectedEvent: any = listCalendar.find(
    (event: any) => event.id === parseInt(eventId) && event.category !== "reminder"
  );

  const [openPicker, setOpenPicker] = useState({ from: false, to: false });
  const [pickerVal, setPickerVal] = useState<any>({
    from: dayjs(selectedEvent?.startTime),
    to: dayjs(selectedEvent?.endTime),
  });
  const [searchUser, setSearchUser] = useState("");
  const [location, setLocation] = useState(selectedEvent?.location?.type);
  const [recurrence, setRecurrence] = useState(recurrenceTypes[selectedEvent?.recurrence]);
  const [form] = Form.useForm();

  if (selectedEvent) {
    form.setFields([
      { name: "attendees", value: selectedEvent?.attendees?.map((att: any) => att.id) },
      { name: "title", value: selectedEvent?.title },
      { name: "startTime", value: selectedEvent?.startTime },
      { name: "endTime", value: selectedEvent?.endTime },
      { name: "location", value: selectedEvent?.location?.type },
      { name: "recurrence", value: recurrenceTypes[selectedEvent?.recurrence] },
    ]);
  }

  const handleSubmitForm = (values: any) => {
    const fromDate = dayjs(selectedEvent?.dateFrom);
    const payload = {
      title: values.title,
      address:
        values?.location === "onSite" ? "6-9 The Square, Hayes, Uxbridge UB11 1FW, UK" : "https://zoom.com/call/0234",
      description: values?.description,
      startTime: dayjs(values?.startTime).date(fromDate.date()).month(fromDate.month()).year(fromDate.year()),
      endTime: dayjs(values?.endTime).date(fromDate.date()).month(fromDate.month()).year(fromDate.year()),
      recurrence: recurrencePayload[values?.recurrence],
      locationType: values?.location?.toUpperCase(),
      attendees: values?.attendees || [],
    };
    updateEvent(payload, selectedEvent?.id, () => {
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
                // setRecurrence(e);
                form.setFieldValue("recurrence", e);
              }}
              options={["does not repeat", "every weekday (Mon - Fri)", "daily", "weekly"]}
            />
          </Form.Item>
        </div>

        <div className="flex items-center gap-4">
          <div className="time-from mt-[25px] basis-[50%]">
            <Form.Item name="startTime" label="Start Time" rules={[{ required: true }]}>
              <TimePickerFormat
                // label={<p className="pb-[6px]">Time From</p>}
                open={openPicker.from}
                setOpen={() => setOpenPicker({ from: !openPicker.from, to: false })}
                optionalTime={pickerVal.from}
                setValue={(e: string) => setPickerVal({ ...pickerVal, from: e })}
              />
            </Form.Item>
          </div>
          <div className="time-to mt-[25px] basis-[50%]">
            <Form.Item name="endTime" label="End Time" rules={[{ required: true }]}>
              <TimePickerFormat
                // label={<p className="pb-[6px]">Time To</p>}
                open={openPicker.to}
                setOpen={() => setOpenPicker({ from: false, to: !openPicker.to })}
                optionalTime={pickerVal.to}
                setValue={(e: string) => setPickerVal({ ...pickerVal, to: e })}
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
          <Form.Item
            name={"attendees"}
            label="Attendees"
            className="attendees"
            rules={[{ required: false }, { type: "array" }]}
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
                        <img src={UserAvatar} className="h-[25px] w-[25px]" />
                        <p>{user?.firstName + " " + user?.lastName}</p>
                      </div>
                    </Select.Option>
                  ))}
            </Select>
          </Form.Item>
          <div className="flex items-center gap-2 mt-[10px] flex-wrap">
            {selectedEvent?.attendees?.map((users: any, i: number) => (
              <img
                key={i}
                src={users?.userProfile || UserAvatar}
                className="h-[32px] w-[32px] rounded-full object-cover"
              />
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
          <Button className="outlined-btn" onClick={() => onClose(false)}>
            Cancel
          </Button>
          <Button className="primary-btn" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditEvent;
