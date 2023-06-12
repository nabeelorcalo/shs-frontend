import React, { useEffect, useState } from "react";
import { Button, Col, Divider, Input, Row, Select, Space, Dropdown, Menu, Form } from "antd";
import {
  ArchiveFilledIcon,
  ArchiveIcon,
  AttachmentIcon,
  Avatar,
  EmojiIcon,
} from "../../../../assets/images";
import { PopUpModal, SearchBar, TextArea } from "../../../../components";
import SelectComp from "../../../../components/Select/Select";
import CommentCard from "../CommentCard";
import StatusDropdown from "../statusDropDown/statusDropdown";
import "./style.scss";
import { DownOutlined, CloseCircleFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import { P } from "@antv/g2plot";
import useCustomHook from "../../actionHandler";
import UserSelector from "../../../../components/UserSelector";

const Options = Select;

const StatusOptions = [
  {
    key: "1",
    value: "PENDING",
  },
  {
    key: "2",
    value: "INPROGRESS",
  },
  {
    key: "3",
    value: "RESOLVED",
  },
];

const drawerAssignToData = [
  {
    id: "1",
    avatar: Avatar,
    name: "David Miller",
    btn: "Add",
  },
  {
    id: "2",
    avatar: Avatar,
    name: "Amelia Clark",
    btn: "Add",
  },
  {
    id: "3",
    avatar: Avatar,
    name: "Maria Sanoid",
    btn: "Add",
  },
  {
    id: "4",
    avatar: Avatar,
    name: "Jessica Alba",
    btn: "Add",
  },
];

const AttendaceLog = (props: any) => {
  const { open, setOpen } = props;

  const [isArchive, setIsArchive] = useState(false);
  const [assignUser, setAssignUser] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<any>({
    type: null,
    priority: null,
    status: open?.details?.status,
    assigns: []
  })

  const { EditHelpDeskDetails, getRoleBaseUser, roleBaseUsers }: any = useCustomHook()

  useEffect(() => {
    getRoleBaseUser()
  }, [])

  // const handleVisibleChange = (visible: any) => {
  //   setVisible(visible);
  // };

  // const handleRemoveUser = (id: string) => {
  //   setAssignUser(assignUser.filter((user: any) => user.id !== id));
  // };

  const handleAddUser = (user: any) => {
    const filtered = assignUser.find((u: any) => u.id === user.id)
      ? true
      : false;
    if (!filtered) {
      setAssignUser([...assignUser, user]);
    }
  };

  // function tagRender(props: any) {
  //   const { label, value, closable, onClose } = props;
  //   return (
  //     <span key={value} onClick={() => onClose(value)}>
  //       {label}
  //     </span>
  //   );
  // }

  const newRoleBaseUsers = roleBaseUsers.map((item: any) => {
    return ({
      key: item.id,
      value: item.id,
      label: item.firstName,
    })
  })

  const onFinishHandler = (values: any) => {
    const myValues = {
      type: values.issueType,
      priority: values.priority,
      assign: values.assign
    }
    EditHelpDeskDetails(open.details?.id, myValues)
  }

  const initialValues = {
    issueType: open.details?.type,
    priority: open?.details?.priority,
    status: open?.details?.status
  }

  const opriorityOption = (
    <Menu>
      <div className="mt-2 ml-2 mr-2">
        <SearchBar handleChange={() => { }} />
      </div>
      {
        drawerAssignToData.map((item) => {
          return (
            <Menu.Item key={item.id}>
              <div className="flex justify-between ">
                <div className="flex">
                  <div className="mr-2">
                    <img src={item.avatar} alt="icon" />
                  </div>

                  <div>{item.name}</div>
                </div>

                <div
                  className="cursor-pointer light-grey-color text-xs"
                  onClick={() => handleAddUser(item)}
                >
                  {item.btn}
                </div>
              </div>
            </Menu.Item>
          )
        })
      }
    </Menu>
  );

  return (
    <PopUpModal
      width={1000}
      title=""
      footer={false}
      close={() => setOpen(false)}
      open={open.openModal}
    >
      <Row className="attendance" gutter={[20, 20]}>
        <Col xs={24} xxl={16} xl={16} lg={16}>
          <Row className="mb-12">
            <Col xxl={18} xl={18} lg={18} md={8} xs={24}>
              <Row align="middle" className="gap-3">
                <div
                  className="cursor-pointer"
                  onClick={() => setIsArchive(!isArchive)}
                >
                  {isArchive ? <ArchiveFilledIcon /> : <ArchiveIcon />}
                </div>
                <p className="font-semibold text-[20px] leading-[28px] capitalize">
                  Attendance Log Issue
                </p>
              </Row>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={6} xs={24}>
              <StatusDropdown
                StatusOptions={StatusOptions}
                state={initialValues.status ? initialValues.status : state.status}
                setState={setState} />
            </Col>
          </Row>
          <Form layout="vertical" onFinish={onFinishHandler} initialValues={initialValues}>
            <Row
              gutter={[30, 0]}
              style={{ maxHeight: 550, overflowY: "scroll" }}
              className="attendance-log-content"
            >
              <Col xs={24} xxl={12} xl={12} lg={12}>
                <Form.Item>
                  <label>User</label>
                  <Input
                    className="input"
                    disabled
                    onChange={() => { }}
                    id=""
                    name="user"
                    placeholder="placeholder"
                    size="large"
                    type="text"
                    value={open.details?.assignedUsers?.map((item: any) => {
                      return item.assignedTo?.firstName + ' ' + item.assignedTo?.lastName
                    })}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} xxl={12} xl={12} lg={12}>
                <Form.Item>
                  <label>User Role</label>
                  <Input
                    className="input"
                    disabled
                    onChange={() => { }}
                    id=""
                    name="userRole"
                    placeholder="placeholder"
                    size="large"
                    type="text"
                    value={open.details?.assignedUsers?.map((item: any) => (
                      item.assignedTo?.role
                    ))}
                  />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item name='issueType'>
                  <SelectComp
                    className=""
                    label="Issue Type"
                    onChange={(e: any) => setState({ ...state, type: e })}
                    placeholder="Select"
                    popupClassName=""
                    value={state.type}
                    options={[
                      { value: "PAYMENT", label: "Payment" },
                      { value: "BUG", label: "Bug" },
                      { value: "ISSUE_NAME", label: "Issue Name" },
                      { value: "WRONG_INFORMATION", label: "Wrong Information" },
                      { value: "OTHER", label: "Other" },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item name='priority'>
                  <SelectComp
                    label="Priority"
                    placeholder="Select"
                    popupClassName=""
                    value={state.priority}
                    onChange={(e: any) => setState({ ...state, priority: e })}
                    options={[
                      { value: "LOW", label: "Low" },
                      { value: "MEDIUM", label: "Medium" },
                      { value: "HIGH", label: "High" },
                      { value: "HIGHEST", label: "Highest" },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item name='assign'>
                  <UserSelector
                    placeholder="select"
                    hasSearch={true}
                    hasMultiple={true}
                    options={newRoleBaseUsers}
                  />
                  {/* <Dropdown
                    placement="bottomRight"
                    overlay={opriorityOption}
                    visible={visible}
                    onVisibleChange={handleVisibleChange}
                    trigger={["click"]}
                    arrow={true}
                  >
                    <div>
                      <label>Assign</label>
                      <div className="border-[1px] border-solid border-[#DDE2E6] h-[48px] rounded-[8px] flex items-center justify-between pl-4 pr-4">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            {assignUser.map((user) => (
                              <div className="flex items-center gap-2 p-2 pr-2 pl-2 text-input-bg-color rounded-[50px]">
                                <span className="text-teriary-color font-normal text-xs">
                                  {user.name}
                                </span>
                                <CloseCircleFilled
                                  style={{ color: "#A3AED0", fontSize: "20px" }}
                                  onClick={() => handleRemoveUser(user.id)}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        <DownOutlined className="text-sm ml-2" />
                      </div>
                    </div>
                  </Dropdown> */}
                </Form.Item>
              </Col>

              <Col xs={24}>
                <label>Log Time</label>
                <Row gutter={[16, 20]}>
                  <Col xs={24} xxl={8} xl={8} lg={8}>
                    <div>
                      <Input
                        className="input"
                        disabled
                        onChange={() => { }}
                        id=""
                        name="hours"
                        placeholder="Hours"
                        size="large"
                        type="text"
                        value={dayjs(open.details?.date).format('hh')}
                      />
                    </div>
                  </Col>

                  <Col xs={24} xxl={8} xl={8} lg={8}>
                    <Input
                      className="input"
                      disabled
                      onChange={() => { }}
                      id=""
                      name="minutes"
                      placeholder="Minutes"
                      size="large"
                      type="text"
                      value={dayjs(open.details?.date).format('mm')}
                    />
                  </Col>

                  <Col xs={24} xxl={8} xl={8} lg={8}>
                    <Input
                      className="input"
                      disabled
                      onChange={() => { }}
                      id=""
                      name="seconds"
                      placeholder="Seconds"
                      size="large"
                      type="text"
                      value={dayjs(open.details?.date).format('ss')}
                    />
                  </Col>
                </Row>
              </Col>

              <Col xs={24}>
                <Row gutter={[16, 20]}>
                  <Col xs={24} xxl={12}>
                    <div>
                      <label>Date</label>
                      <Input
                        className="input"
                        disabled
                        onChange={() => { }}
                        id=""
                        name="hours"
                        placeholder="placeholder"
                        size="large"
                        type="text"
                        value={dayjs(open.details?.date).format('YYYY-MM-DD')}
                      />
                    </div>
                  </Col>

                  <Col xs={24} xxl={12}>
                    <div>
                      <label>Reporting Time</label>
                      <Input
                        className="input"
                        disabled
                        onChange={() => { }}
                        id=""
                        name="minutes"
                        placeholder="placeholder"
                        size="large"
                        type="text"
                        value={dayjs(open.details?.date).format('hh:mm A')}
                      />
                    </div>
                  </Col>
                </Row>
              </Col>

              <Col xs={24}>
                <div>
                  <label>Description</label>
                  <TextArea
                    rows={5}
                    placeholder="Describe your problem"
                    maxLength={"100%"}
                    disabled
                    value={open.details?.description}
                  />
                </div>
              </Col>

              <Col xs={24}>
                <label>Attachment (Optional)</label>
                <Row gutter={[20, 20]} className="pt-3">
                  {[""]?.map((img) => (
                    <Col xs={24} xxl={12} xl={12} lg={12} md={12}>
                      <img
                        className="w-full"
                        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"
                        alt="sdf"
                      />
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>

            <Col xs={24} className="pt-8">
              <Row justify="end" gutter={20}>
                <Col>
                  <Button onClick={() => setOpen(false)}>cancel</Button>
                </Col>
                <Col>
                  <Button htmlType="submit" className="attendence-log-btn teriary-bg-color white-color capitalize font-semibold	text-base ">
                    save
                  </Button>
                </Col>
              </Row>
            </Col>
          </Form>
        </Col>

        <Col className="flex flex-col justify-between" xs={24} xxl={8} xl={8} lg={8}>
          <div className="pr-2 pl-6">
            <div className="mb-16 text-xl font-medium text-primary-color">
              Comments
            </div>
            {[1, 2].map((item) => {
              return (
                <>
                  <div>
                    <CommentCard
                      name={"Maude Hall"}
                      image={""}
                      content="That's a fantastic new app feature. You and your team did an excellent job of incorporating user testing feedback."
                      time={"14 min"}
                      likes={"5"}
                    />
                  </div>
                  <Divider />
                </>
              );
            })}
          </div>

          <div className="ml-3 ">
            <div className=" mt-2 p-2 rounded-lg border border-solid border-[#D9DBE9]">
              <textarea
                placeholder="Comment here"
                className="w-full h-24 border-0 outline-0 resize-none"
              />

              <Row
                justify="space-between"
                align="middle"
                className="bg-[#F8F8F8] px-[10px] py-[6px] rounded-md"
              >
                <Col>
                  <Row className="gap-[10px]">
                    <p className="text-[16px] font-medium leading-[14px]">B</p>
                    <EmojiIcon />
                    <AttachmentIcon />
                  </Row>
                </Col>

                <Col>
                  <button
                    className="
                teriary-bg-color 
                cursor-pointer
                white-color 
                capitalize 
                font-normal 
                p-0 text-xs 
                h-[27px] 
                min-w-[67px] 
                rounded-lg 
                border-0 
                outline-0"
                  >
                    send
                  </button>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </PopUpModal>
  );
};

export default AttendaceLog;