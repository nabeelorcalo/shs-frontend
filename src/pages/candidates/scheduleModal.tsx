import { useEffect, useRef, useState } from "react";
import { Button, Form, Modal, Radio, TimePicker, Dropdown, Menu, Avatar } from "antd";
import { DownOutlined, CloseCircleFilled } from "@ant-design/icons";
import { CloseCircleIcon } from "../../assets/images";
import { CommonDatePicker, SearchBar } from "../../components";
import "./style.scss";
import dayjs from "dayjs";
import actionHandler from "./actionHandler";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../config/validationMessages";

const ScheduleInterviewModal = (props: any) => {
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);
  const { open, setOpen, candidateId, data, handleEdit } = props;
  const [isOpenDate, setIsOpenDate] = useState(false);
  const { companyManagerList = [], getCompanyManagerList, scheduleInterview, handleUpdateInterview } = actionHandler();
  const [assignUser, setAssignUser] = useState<any[]>([]);
  const [form] = Form.useForm();

  const [values, setValues] = useState<any>({
    dateFrom: "",
    dateTo: "",
    attendees: [],
    startTime: "",
    endTime: "",
    locationType: "",
    description: "",
  });
  console.log(values);
  console.log(data, "data");

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
    }
  };

  console.log(values);
  const onFinish = () => {
    // modifying values obj according to create schedule request body
    console.log(values);
    values.startTime = dayjs(values?.startTime).format("YYYY-MM-DD HH:mm:ss.SSS");
    values.endTime = dayjs(values?.endTime).format("YYYY-MM-DD HH:mm:ss.SSS");
    values.attendees = [candidateId, ...assignUser?.map(({ managerId }) => managerId)];
    values.candidateId = candidateId;

    // custom hook for create schedule
    if (data) {
      handleUpdateInterview(data?.id, values).then(() => {
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
    value && setValues({ ...values, dateFrom: value, dateTo: value });
  };

  const onCancel = () => {
    setOpen(false);
    form.resetFields();
    handleEdit(undefined);
    setAssignUser([]);
    setValues({});
  };

  useEffect(() => {
    if (data) {
      setValues({
        dateFrom: dayjs(data?.dateFrom).format("YYYY-MM-DD"),
        dateTo: dayjs(data?.dateTo).format("YYYY-MM-DD"),
        startTime: dayjs(data?.startTime).format("HH:mm:ss"),
        endTime: dayjs(data?.endTime).format("HH:mm:ss"),
        attendees: data?.attendees ?? [],
        locationType: data?.locationType,
        description: data?.description,
      });
      setAssignUser(data?.attendees ?? []);
    }
  }, [data]);

  const opriorityOption = (
    <Menu className="max-h-[300px] overflow-scroll">
      <div className="mt-2 ml-2 mr-2">
        <SearchBar handleChange={getCompanyManagerList} />
      </div>
      {companyManagerList?.map((item: any) => {
        return (
          <Menu.Item key={item.id}>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="mr-2">
                  <Avatar
                    className="h-[32px] w-[32px] rounded-full object-cover relative"
                    src={item?.companyManager?.avatar}
                    alt={item?.companyManager?.firstName}
                    icon={
                      <span className="uppercase text-base leading-[16px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                        {item?.companyManager?.firstName[0]}
                        {item?.companyManager?.lastName[0]}
                      </span>
                    }
                  />
                </div>
                <div>{`${item?.companyManager?.firstName} ${item?.companyManager?.lastName}`}</div>
              </div>
              <div className="cursor-pointer light-grey-color text-xs" onClick={() => handleAddUser(item)}>
                Add
              </div>
            </div>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <div className="Modal">
      <Modal
        closeIcon={<img src={CloseCircleIcon} />}
        title="Schedule Interview"
        open={open}
        onCancel={onCancel}
        footer={false}
      >
        <Form form={form} onFinish={onFinish} autoComplete="off" validateMessages={DEFAULT_VALIDATIONS_MESSAGES}>
          <div className="title">
            <p>Date</p>
          </div>
          <Form.Item rules={[{ required: false }]} valuePropName={"date"}>
            <CommonDatePicker open={isOpenDate} setValue={handleValue} name={"dateFrom"} setOpen={setIsOpenDate} />
          </Form.Item>
          <div className="asignee-wrapper mt-7">
            <div className="heading mb-2">
              <p>Attendees</p>
            </div>
            <Form.Item name="attendees" rules={[{ required: false }]}>
              <Dropdown
                placement="bottomRight"
                overlay={opriorityOption}
                // visible={visible}
                // onVisibleChange={handleVisibleChange}
                trigger={["click"]}
                // arrow={true}
              >
                <div>
                  <div className="light-gray-border h-[48px] rounded-[8px] flex items-center justify-between pl-4 pr-4">
                    <div className="candidates-attendees flex items-center gap-2 overflow-x-scroll">
                      {assignUser?.length > 0 ? (
                        assignUser?.map((user) => (
                          <div
                            key={user?.id}
                            className="flex items-center gap-2 p-2 pr-2 pl-2 text-input-bg-color rounded-[50px]"
                          >
                            <span className="text-teriary-color font-normal text-xs whitespace-nowrap	">
                              {`${user?.companyManager?.firstName} ${user?.companyManager?.lastName}`}
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
                    <DownOutlined className="text-sm ml-2" />
                  </div>
                </div>
              </Dropdown>
            </Form.Item>

            <div className="time-pick-wrapper flex flex-wrap justify-between mt-5">
              <div className="time-from">
                <div className="heading mt-2 mb-3">Time From</div>
                <Form.Item
                  name="startTime"
                  rules={[{ required: values?.startTime ? false : true }]}
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
                <div className="heading mt-2 mb-3">Time To</div>
                <Form.Item name="endTime" rules={[{ required: values?.endTime ? false : true }]} valuePropName={"date"}>
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
              <p className="heading mb-2 ">Location</p>
              <Form.Item name="location" rules={[{ required: true }]}>
                <Radio.Group
                  name="location"
                  value={values?.locationType}
                  onChange={(e) => setValues({ ...values, locationType: e?.target?.value })}
                >
                  <Radio checked={values?.locationType === "VIRTUAL"} value={"VIRTUAL"}>
                    Virtual
                  </Radio>
                  <Radio checked={values?.locationType === "ONSITE"} value={"ONSITE"}>
                    On Site
                  </Radio>
                </Radio.Group>
              </Form.Item>
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
            <Button type="primary" htmlType="submit" className="reqSubmitBtn">
              {data ? "Update" : "Submit"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ScheduleInterviewModal;
