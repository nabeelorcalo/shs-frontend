import { useEffect, useRef, useState } from "react";
import { Button, Form, Modal, Radio, TimePicker, Dropdown, Menu, Avatar } from "antd";
import { DownOutlined, CloseCircleFilled } from "@ant-design/icons";
import { CloseCircleIcon } from "../../assets/images";
import { CommonDatePicker, Loader, SearchBar } from "../../components";
import "./style.scss";
import dayjs from "dayjs";
import actionHandler from "./actionHandler";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../config/validationMessages";

const ScheduleInterviewModal = (props: any) => {
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);
  // custom validation
  const isManagerList = useRef(true);
  const isAttendees = useRef(false);
  const isAttendeesTouched = useRef(false);
  const isLocation = useRef(false);
  const isLocationTouched = useRef(false);
  const isDate = useRef(false);
  const isDateTouched = useRef(false);

  const { open, setOpen, candidateId, data, handleEdit } = props;
  const [isOpenDate, setIsOpenDate] = useState(false);
  const [isIntial, setIsIntial] = useState(false);
  const [openAttendiesDropdown, setOpenAttendiesDropdown] = useState(false);
  const {
    companyManagerList = [],
    getCompanyManagerList,
    scheduleInterview,
    handleUpdateInterview,
    isLoading,
  } = actionHandler();
  const [assignUser, setAssignUser] = useState<any[]>([]);
  const [form]: any = Form.useForm();

  const [values, setValues] = useState<any>({
    dateFrom: "",
    dateTo: "",
    attendees: [],
    startTime: "",
    endTime: "",
    locationType: "",
    description: "",
  });

  useEffect(() => {
    if (shouldLoogged.current) {
      shouldLoogged.current = false;
      getCompanyManagerList();
    }
  }, []);

  const handleRemoveUser = (id: string) => {
    setAssignUser(assignUser?.filter((user: any) => user.id !== id) ?? []);
    setValues({ ...values, attendees: assignUser?.filter((user: any) => user.id !== id) });
  };

  const handleAddUser = (user: any) => {
    const filtered = assignUser?.find((u: any) => u.id === user.id) ? true : false;
    if (!filtered) {
      setAssignUser([...assignUser, user]);
      setValues({ ...values, attendees: [...assignUser, user] });
      setOpenAttendiesDropdown((prevValue) => prevValue);
    }
  };
  // attendees validation
  if (values?.attendees?.length > 0) isAttendees.current = true;
  else isAttendees.current = false;

  const onFinish = async () => {
    console.log("sf");

    // modifying values obj according to create schedule request body
    values.startTime = dayjs(values?.startTime).format("YYYY-MM-DD HH:mm:ss.SSS");
    values.endTime = dayjs(values?.endTime).format("YYYY-MM-DD HH:mm:ss.SSS");
    values.attendees = assignUser?.map(({ id }) => id);
    values.candidateId = candidateId;

    // custom hook for create schedule
    if (data) {
      await handleUpdateInterview(data?.id, values).then((res: any) => {
        // empty fields after form submitting
        onCancel();
      });
    } else {
      scheduleInterview(values).then(() => {
        // empty fields after form submitting
        onCancel();
      });
    }
    setOpen(false);
  };

  //  date change function
  const handleValue = (value: any) => {
    console.log("asf", value);

    if (value) {
      setValues({ ...values, dateFrom: value, dateTo: value });
      isDate.current = true;
    }
  };

  const onCancel = () => {
    setOpen(false);
    form.resetFields();
    handleEdit(undefined);
    setAssignUser([]);
    setValues({});
  };

  useEffect(() => {
    // for update event
    if (data) {
      setValues({
        dateFrom: dayjs(data?.dateFrom).format("YYYY-MM-DD"),
        dateTo: dayjs(data?.dateTo).format("YYYY-MM-DD"),
        startTime: dayjs(data?.startTime),
        endTime: dayjs(data?.endTime),
        attendees: data?.attendees ?? [],
        locationType: data?.locationType,
        description: data?.description,
      });
      data?.locationType && (isLocation.current = true);
      data?.dateFrom && (isDate.current = true);
      if (companyManagerList?.length > 0 && isManagerList.current) {
        setAssignUser(
          data?.attendees?.map((item: any) => companyManagerList?.find((obj: any) => item?.id === obj?.id) ?? [])
        );
        isManagerList.current = false;
      }
    }
  }, [data, companyManagerList]);
  const opriorityOption: any = (
    <Menu className="max-h-[300px] overflow-scroll">
      <div className="mt-2 ml-2 mr-2">
        <SearchBar handleChange={getCompanyManagerList} />
      </div>
      {companyManagerList?.map((item: any) => (
        <Menu.Item key={item.id}>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="mr-2">
                <Avatar
                  className="h-[32px] w-[32px] rounded-full object-cover relative"
                  src={item?.avatar}
                  alt={item?.firstName}
                  icon={
                    <span className="uppercase text-base leading-[16px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                      {item?.firstName[0]}
                      {item?.lastName[0]}
                    </span>
                  }
                />
              </div>
              <div>{`${item?.firstName} ${item?.lastName}`}</div>
            </div>
            <div className="cursor-pointer light-grey-color text-xs" onClick={() => handleAddUser(item)}>
              Add
            </div>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );
  console.log(values);

  const handleOpen = (value: boolean) => {
    isAttendeesTouched.current = true;
    isLocationTouched.current = true;
    isDateTouched.current = true;
    setOpenAttendiesDropdown(value);
    setIsIntial(!isIntial);
  };

  return (
    <div className="Modal">
      <Modal
        closeIcon={<img src={CloseCircleIcon} />}
        title="Schedule Interview"
        open={open}
        onCancel={onCancel}
        footer={false}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
        >
          <div className="title">
            <p className="required">Date</p>
          </div>
          <Form.Item rules={[{ required: true }]} valuePropName={"date"}>
            <CommonDatePicker
              open={isOpenDate}
              setValue={handleValue}
              name={"dateFrom"}
              setOpen={(value: boolean) => {
                isDateTouched.current = true;
                setIsOpenDate(value);
              }}
            />
            {!isDate.current && isDateTouched.current && <p className="text-sm text-error-color">Required Field</p>}
          </Form.Item>
          <div className="asignee-wrapper mt-7">
            <div className="heading mb-2">
              <p className="required">Attendees</p>
            </div>
            <Form.Item>
              <Dropdown
                placement="bottomRight"
                overlay={opriorityOption}
                trigger={["click"]}
                open={openAttendiesDropdown}
                onOpenChange={(open) => handleOpen(open)}
              >
                <div>
                  <div className="light-gray-border h-[48px] rounded-[8px] flex items-center justify-between pl-4 pr-4">
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <div className="candidates-attendees flex items-center gap-2 overflow-x-scroll">
                        {assignUser?.length > 0 ? (
                          assignUser?.map((user) => (
                            <div
                              key={user?.id}
                              className="flex items-center gap-2 p-2 pr-2 pl-2 text-input-bg-color rounded-[50px]"
                            >
                              <span className="text-teriary-color font-normal text-xs whitespace-nowrap	">
                                {`${user?.firstName} ${user?.lastName}`}
                              </span>
                              <CloseCircleFilled
                                className="text-[20px] gray-color w-5 h-5"
                                onClick={() => handleRemoveUser(user.id)}
                              />
                            </div>
                          ))
                        ) : (
                          <span className="light-grey-color">Select</span>
                        )}
                      </div>
                    )}
                    <DownOutlined className="text-sm ml-2" />
                  </div>
                </div>
              </Dropdown>
              {!isAttendees.current && isAttendeesTouched.current && (
                <p className="text-sm text-error-color">Required Field</p>
              )}
            </Form.Item>

            <div className="time-pick-wrapper flex flex-wrap justify-between mt-5">
              <div className="time-from">
                <div className="heading mt-2 mb-3 required">Time From</div>
                <Form.Item
                  name="startTime"
                  rules={[
                    () => ({
                      validator(_, value: any) {
                        let [startHours, startMinutes] = ["", ""];
                        let [endHours, endMinutes] = ["", ""];
                        if (values?.startTime)
                          [startHours, startMinutes] = dayjs(values.startTime).format("HH:mm").split(":");
                        if (values?.endTime) [endHours, endMinutes] = dayjs(values?.endTime).format("HH:mm").split(":");
                        if (+endHours > +startHours) return Promise.resolve();
                        else if (+endMinutes > +startMinutes) return Promise.resolve();
                        else if (endHours && endMinutes && value)
                          return Promise.reject(new Error("Time To must be greater"));
                        else if (value) return Promise.resolve();
                        else return Promise.reject(new Error("Required Field"));
                      },
                    }),
                  ]}
                  valuePropName={"date"}
                >
                  <TimePicker
                    name="startTime"
                    className="time-p"
                    value={
                      data?.startTime
                        ? values?.startTime
                          ? dayjs(values?.startTime, "HH:mm:ss").utc()
                          : values?.startTime
                        : values?.startTime
                    }
                    format={"HH:mm:ss"}
                    onChange={(e) => setValues({ ...values, startTime: e })}
                  />
                </Form.Item>
              </div>
              <div className="time-to">
                <div className="heading mt-2 mb-3 required">Time To</div>
                <Form.Item
                  name="endTime"
                  rules={[
                    () => ({
                      validator(_, value: any) {
                        let [startHours, startMinutes] = ["", ""];
                        let [endHours, endMinutes] = ["", ""];
                        if (values?.startTime)
                          [startHours, startMinutes] = dayjs(values?.startTime).format("HH:mm").split(":");
                        if (values?.endTime) [endHours, endMinutes] = dayjs(value).format("HH:mm").split(":");
                        if (+endHours > +startHours) return Promise.resolve();
                        else if (+endMinutes > +startMinutes) return Promise.resolve();
                        else if (startHours && startMinutes && value)
                          return Promise.reject(new Error("Time To must be greater"));
                        else if (value) return Promise.resolve();
                        else return Promise.reject(new Error("Required Field"));
                      },
                    }),
                  ]}
                  valuePropName={"date"}
                >
                  <TimePicker
                    name="endTime"
                    className="time-p"
                    format={"HH:mm:ss"}
                    value={
                      data?.endTime
                        ? values?.endTime
                          ? dayjs(values?.endTime, "HH:mm:ss").utc()
                          : values?.endTime
                        : values?.endTime
                    }
                    onChange={(e) => setValues({ ...values, endTime: e })}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="location-wrapper">
              <p className="heading mb-2 required">Location</p>
              {/* <Form.Item name="locationType" rules={[{ required: true }]}> */}
              <Radio.Group
                name="locationType"
                value={values?.locationType}
                onChange={(e) => {
                  isLocation.current = true;
                  setValues({ ...values, locationType: e?.target?.value });
                }}
              >
                <Radio value={"VIRTUAL"}>Virtual</Radio>
                <Radio value={"ONSITE"}>On Site</Radio>
              </Radio.Group>
              {!isLocation.current && isLocationTouched.current && (
                <p className="text-sm text-error-color">Required Field</p>
              )}
              {/* </Form.Item> */}
            </div>
            <label className="title" htmlFor="text-area">
              <p>Description (optional)</p>
            </label>
            <Form.Item>
              <textarea
                onChange={(e) => setValues({ ...values, description: e?.target?.value })}
                className="input"
                name="description"
                placeholder="Enter description here..."
                id="text-area"
                value={values?.description}
              />
            </Form.Item>
          </div>
          <div className="flex mt-3 justify-end gap-4">
            <Button onClick={onCancel} className="reqCancelBtn">
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                handleOpen(false);
              }}
              className="reqSubmitBtn"
            >
              {data ? "Update" : "Submit"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ScheduleInterviewModal;
