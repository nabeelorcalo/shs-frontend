import { Avatar, Col, Form, Input, Modal, Radio, Row, TimePicker } from "antd";
import { CommonDatePicker } from "../calendars/CommonDatePicker/CommonDatePicker";
import Loader from "../Loader";
import dayjs from "dayjs";
import { CloseCircleFilled, DownOutlined } from "@ant-design/icons";
import { CloseCircleIcon, LocationDarkIcon, VideoRecoder } from "../../assets/images";
import { useRef, useState } from "react";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../config/validationMessages";
import { SearchBar } from "../SearchBar/SearchBar";
import { getUserAvatar } from "../../helpers";
import DropDownNew from "../Dropdown/DropDownNew";
import { ButtonThemeSecondary } from "../ButtonThemeSecondary";
import { ButtonThemePrimary } from "../ButtonThemePrimary";


export const ScheduleModalComp = (props: any) => {
  const {
    isLoading,
    open,
    setOpen,
    assignUser,
    setAssignUser,
    candidateId,
    data,
    handleUpdateInterview,
    values,
    setValues,
    scheduleInterview,
    handleEdit,
    isDate,
    isDateTouched,
    getCompanyManagerList,
    managerList,
    isLocation,
  } = props;
  const [form]: any = Form.useForm();
  const isAttendees = useRef(false);
  const isAttendeesTouched = useRef(false);
  const isLocationTouched = useRef(false);

  const [isOpenDate, setIsOpenDate] = useState(false);
  const [isIntial, setIsIntial] = useState(false);
  const [openAttendiesDropdown, setOpenAttendiesDropdown] = useState(false);


  const handleRemoveUser = (id: string) => {
    setAssignUser(assignUser?.filter((user: any) => user.id !== id) ?? []);
    setValues({ ...values, attendees: assignUser?.filter((user: any) => user.id !== id) });
  };

  const onFinish = async () => {
    // modifying values obj according to create schedule request body
    values.attendees = assignUser?.map(({ id }: any) => id);
    values.candidateId = candidateId;

    if (values.startTime && values.endTime && values.attendees && values.candidateId && values.locationType) {
      values.startTime = dayjs(values?.startTime).format("YYYY-MM-DD HH:mm:ss.SSS");
      values.endTime = dayjs(values?.endTime).format("YYYY-MM-DD HH:mm:ss.SSS");

      // custom hook for create schedule
      if (data) {
        await handleUpdateInterview(candidateId, data?.id, values).then(() => {
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
    }
  };

  //  date change function
  const handleValue = (value: any) => {
    if (value) {
      setValues({ ...values, dateFrom: value, dateTo: value });
      isDate.current = true;
    }
  };

  const handleAddUser = (user: any) => {
    const filtered = assignUser?.find((u: any) => u.id === user.id) ? true : false;
    if (!filtered) {
      setAssignUser([...assignUser, user]);
      setValues({ ...values, attendees: [...assignUser, user] });
      setOpenAttendiesDropdown((prevValue) => prevValue);
    }
  };

  const handleAttendeesDropdown = (value: boolean) => {
    !value && values?.attendees?.length < 1 && (isAttendeesTouched.current = true);
    setOpenAttendiesDropdown(value);
  };

  const handleSubmit = (value: boolean) => {
    !value && values?.attendees?.length < 1 && (isAttendeesTouched.current = true);
    !value && !values?.dateFrom && (isDateTouched.current = true);
    !value && !values?.locationType && (isLocationTouched.current = true);
    setIsIntial(!isIntial);
  };

  const onCancel = () => {
    setOpen(false);
    form.resetFields();
    handleEdit(undefined);
    setAssignUser([]);
    setValues({});
  };

  // attendees validation
  if (values?.attendees?.length > 0) isAttendees.current = true;
  else isAttendees.current = false;

  return (
    <Modal
      closeIcon={<img src={CloseCircleIcon} />}
      title="Schedule Interview"
      open={open}
      onCancel={onCancel}
      footer={false}
      width={700}
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
            value={values?.dateTo}
            open={isOpenDate}
            setValue={handleValue}
            name={"dateFrom"}
            disabledDates={(current: any) => current.isBefore(dayjs().subtract(1, "day"))}
            setOpen={(value: boolean) => {
              !value && (isDateTouched.current = true);
              setIsOpenDate(value);
            }}
          />
          {!isDate.current && isDateTouched.current && (
            <p className="text-sm text-error-color absolute">Required Field</p>
          )}
        </Form.Item>
        <div className="asignee-wrapper mt-7">
          <div className="heading mb-2">
            <p className="required">Attendees</p>
          </div>
          <Form.Item>
            <DropDownNew
              value={""}
              open={openAttendiesDropdown}
              onOpenChange={(open: boolean) => handleAttendeesDropdown(open)}
              items={[
                { label: <SearchBar handleChange={getCompanyManagerList} />, key: "search" },
                {
                  label: (
                    <div className="max-h-[200px] overflow-y-scroll">
                      {managerList?.map((item: any) => (
                        <div
                          key={item?.id}
                          className="flex justify-between mb-4"
                          onClick={() => handleAddUser(item)}
                        >
                          <div className="flex">
                            <div className="mr-2">
                              <Avatar
                                className="h-[32px] w-[32px] rounded-full object-cover relative"
                                src={getUserAvatar({ profileImage: item?.profileImage })}
                                alt={item?.firstName}
                                icon={
                                  <span className="uppercase text-sm leading-[16px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                                    {item?.firstName[0]}
                                    {item?.lastName[0]}
                                  </span>
                                }
                              />
                            </div>
                            <div>{`${item?.firstName} ${item?.lastName}`}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ),
                  key: "users",
                },
              ]}
            >
              <div>
                <div className="light-gray-border h-[48px] rounded-[8px] flex items-center justify-between pl-4 pr-4">
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <div className="candidates-attendees flex items-center gap-2 overflow-x-scroll">
                      {assignUser?.length > 0 ? (
                        assignUser?.map((user: any) => (
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
            </DropDownNew>
            {!isAttendees.current && isAttendeesTouched.current && (
              <p className="text-sm text-error-color absolute">Required Field</p>
            )}
          </Form.Item>
          <Row gutter={[20, 0]}>
            <Col xs={24} md={12}>
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
                  popupClassName={`CustomTimePicker`}
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
            </Col>
            <Col xs={24} md={12}>
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
                  popupClassName={`CustomTimePicker`}
                  name="endTime"
                  // className="time-p"
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
            </Col>
          </Row>

          <div className="location-wrapper">
            <p className="heading mb-2 required">Location</p>
            <Radio.Group
              name="locationType"
              value={values?.locationType}
              onChange={(e) => {
                isLocation.current = true;
                setValues({ ...values, locationType: e?.target?.value });
              }}>
              <Radio value={"VIRTUAL"}>Virtual</Radio>
              <Radio value={"ONSITE"}>On Site</Radio>
            </Radio.Group>
            {!isLocation.current && isLocationTouched.current && (
              <p className="text-sm text-error-color absolute">Required Field</p>
            )}

            {values?.locationType &&
              <Input
                name="address"
                value={values?.address}
                className='input mt-4'
                prefix={values?.locationType === "ONSITE" ? <LocationDarkIcon /> : <VideoRecoder />}
                placeholder={values?.locationType === "VIRTUAL" ? "Enter Invitaion link here" : "Enter office address"}
                onChange={(e) => {
                  setValues({ ...values, address: e?.target?.value });
                }}
              />}

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
          <ButtonThemeSecondary onClick={onCancel}
          //  className="reqCancelBtn"
          >
            Cancel
          </ButtonThemeSecondary>
          <ButtonThemePrimary
            type="primary"
            htmlType="submit"
            onClick={() => {
              handleSubmit(false);
            }}
          // className="reqSubmitBtn"
          >
            {data ? "Update" : "Submit"}
          </ButtonThemePrimary>
        </div>
      </Form>
    </Modal>
  );
};
