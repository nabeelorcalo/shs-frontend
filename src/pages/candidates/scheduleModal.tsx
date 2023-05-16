import { useEffect, useState } from "react";
import { Button, Form, Modal, Radio, RadioChangeEvent, TimePicker, Dropdown, Menu, Avatar } from "antd";
import { DownOutlined, CloseCircleFilled } from "@ant-design/icons";
import { ArrowDownDark, CloseCircleIcon, UserAvatar } from "../../assets/images";
import { CommonDatePicker, SearchBar } from "../../components";
import DropDownNew from "../../components/Dropdown/DropDownNew";
import "./style.scss";
import dayjs from "dayjs";
import actionHandler from "./actionHandler";

const ScheduleInterviewModal = (props: any) => {
  const { open, setOpen, handleReject, candidateId } = props;
  const [user, setUser] = useState({ userName: "Select" });
  const [isOpenDate, setIsOpenDate] = useState(false);
  const [dateTimeVal, setDateTimeVal] = useState("");
  const [visible, setVisible] = useState(false);

  const [value, setValue] = useState(1);
  const { companyManagerList = [], getCompanyManagerList, scheduleInterview } = actionHandler();

  const [assignUser, setAssignUser] = useState<any[]>([]);

  console.log("companyManagerList", assignUser);

  useEffect(() => {
    getCompanyManagerList();
  }, []);

  const [form] = Form.useForm();

  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };

  const handleRemoveUser = (id: string) => {
    setAssignUser(assignUser.filter((user: any) => user.id !== id));
  };

  const handleAddUser = (user: any) => {
    const filtered = assignUser.find((u: any) => u.id === user.id) ? true : false;
    if (!filtered) {
      setAssignUser([...assignUser, user]);
    }
  };

  const onFinish = (value: any) => {
    value.dateFrom = dayjs(value?.dateFrom).format("YYYY-MM-DD");
    value.dateTo = dayjs(value?.dateFrom).format("YYYY-MM-DD");
    value.timeTo = dayjs(value?.timeTo).format("HH:MM");
    value.timeFrom = dayjs(value?.timeFrom).format("HH:MM");
    value.attendees = [candidateId, ...assignUser?.map(({ id }) => id)];
    scheduleInterview(value);
  };

  const opriorityOption = (
    <Menu className="max-h-[300px] overflow-scroll">
      <div className="mt-2 ml-2 mr-2">
        <SearchBar handleChange={getCompanyManagerList} />
      </div>
      {companyManagerList?.map((item: any) => {
        return (
          <Menu.Item key={item.id}>
            <div className="flex justify-between ">
              <div className="flex">
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
        onCancel={() => setOpen(false)}
        footer={false}
      >
        <Form form={form} onFinish={onFinish} autoComplete="off">
          <div className="title">
            <p>Date</p>
          </div>
          <Form.Item name="dateFrom" rules={[{ required: true }]}>
            <CommonDatePicker open={isOpenDate} name={"dateFrom"} setOpen={setIsOpenDate} setValue={setDateTimeVal} />
          </Form.Item>
          <div className="asignee-wrapper mt-7">
            <div className="heading mb-2">
              <p>Attendees</p>
            </div>
            <Form.Item name="attendees" rules={[{ required: false }]}>
              <Dropdown
                placement="bottomRight"
                overlay={opriorityOption}
                visible={visible}
                onVisibleChange={handleVisibleChange}
                trigger={["click"]}
                arrow={true}
              >
                <div>
                  <div className="light-gray-border h-[48px] rounded-[8px] flex items-center justify-between pl-4 pr-4">
                    <div className="candidates-attendees flex items-center gap-2 overflow-x-scroll">
                      {assignUser.length > 0 ? (
                        assignUser.map((user) => (
                          <div className="flex items-center gap-2 p-2 pr-2 pl-2 text-input-bg-color rounded-[50px]">
                            <span className="text-teriary-color font-normal text-xs whitespace-nowrap	">{`${user?.firstName} ${user?.lastName}`}</span>
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
              {/* <DropDownNew
                items={[
                  { label: <SearchBar handleChange={() => {}} />, key: "search" },
                  {
                    label: (
                      <div>
                        {userData.map((users: any) => (
                          <div className="flex items-center gap-3 mb-[20px]" onClick={() => setUser(users)}>
                            <img src={users.userImg} className="h-[24px] w-[24px] rounded-full object-cover" />
                            <p>{users.userName}</p>
                          </div>
                        ))}
                      </div>
                    ),
                    key: "users",
                  },
                ]}
              >
                <div className="drop-down-with-imgs flex items-center gap-3">
                  <div className="flex items-center gap-3 mr-[40px]">
                    <p>{user.userName}</p>
                  </div>
                  <ArrowDownDark />
                </div>
              </DropDownNew> */}
            </Form.Item>

            <div className="time-pick-wrapper flex flex-wrap justify-between mt-5">
              <div className="time-from">
                <div className="heading mt-2 mb-3">Time From</div>
                <Form.Item name="timeFrom" rules={[{ required: true }]}>
                  <TimePicker className="time-p" />
                </Form.Item>
              </div>
              <div className="time-to">
                <div className="heading mt-2 mb-3">Time To</div>
                <Form.Item name="timeTo" rules={[{ required: true }]}>
                  <TimePicker className="time-p" />
                </Form.Item>
              </div>
            </div>

            <div className="location-wrapper">
              <p className="heading mb-2 ">Location</p>
              <Form.Item name="location" rules={[{ required: true }]}>
                <Radio.Group value={value}>
                  <Radio value={"virtual"}>Virtual</Radio>
                  <Radio value={"onSite"}>On Site</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <label className="title" htmlFor="text-area">
              <p>Description (optional)</p>
            </label>
            <Form.Item name="description">
              <textarea className="input" name="description" placeholder="Describe your problem" id="text-area" />
            </Form.Item>
          </div>
          <div className="flex mt-3 justify-end gap-4">
            <Button onClick={() => setOpen(false)} className="reqCancelBtn">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className="reqSubmitBtn">
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ScheduleInterviewModal;
