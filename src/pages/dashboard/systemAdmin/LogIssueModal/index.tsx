import { useState } from "react";
import { Button, Col, Divider, Input, Row, Select, Dropdown, Menu, Form } from "antd";
import {
  ArchiveFilledIcon,
  ArchiveIcon,
  AttachmentIcon,
  Avatar,
  EmojiIcon,
  EyeActionIcon,
  UserAvatar,
} from "../../../../assets/images";
import { PopUpModal, SearchBar, TextArea } from "../../../../components";
import SelectComp from "../../../../components/Select/Select";
import "./style.scss";
import { DownOutlined, CloseCircleFilled } from "@ant-design/icons";
import StatusDropdown from "../../../helpDesk/systemAdmin/statusDropDown/statusDropdown";
import CommentCard from "../Comments/CommentCard";
import useCustomHook from "../actionHandler";
import dayjs from "dayjs";
import UserSelector from "../../../../components/UserSelector";
import constants from "../../../../config/constants";

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
const priorityOptions = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "HIGHEST", label: "Highest" },
];

const issueTypeOptions = [
  { value: "PAYMENT", label: "Payment" },
  { value: "BUG", label: "Bug" },
  { value: "ISSUE_NAME", label: "Issue Name" },
  { value: "WRONG_INFORMATION", label: "Wrong Information" },
  { value: "OTHER", label: "Other" },
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

const LogIssueModal = (props: any) => {
  const { id } = props;
  const { getHepDeskDetail, helpDeskDetail, roleBaseUsers, EditHelpDeskDetails, fetchAdminDahsboardData } =
    useCustomHook();
  const [isArchive, setIsArchive] = useState(false);
  const [assignUser, setAssignUser] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [initialState, setInitialState] = useState<any>({
    type: null,
    priority: null,
    status: null,
    assigns: null,
  });
  const [form] = Form.useForm();
  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };

  const handleRemoveUser = (id: string) => {
    setAssignUser(assignUser.filter((user: any) => user.id !== id));
  };

  if (helpDeskDetail) {
    form.setFieldValue(
      "attendees",
      helpDeskDetail?.assignedUsers?.map((user: any) => user.assignedId)
    );
  }

  const handleAddUser = (user: any) => {
    const filtered = assignUser.find((u: any) => u.id === user.id) ? true : false;
    if (!filtered) {
      setAssignUser([...assignUser, user]);
    }
  };
  const newRoleBaseUsers = roleBaseUsers.map((item: any) => {
    return {
      key: item.id,
      value: item.id,
      label: item.firstName,
    };
  });

  const onFinishHandler = (values: any) => {
    let payload: any = {
      assign: values?.attendees,
    };
    if (initialState.type) payload["type"] = initialState.type;
    if (initialState.status) payload["status"] = initialState.status;
    if (initialState.priority) payload["priority"] = initialState.priority;
    EditHelpDeskDetails(id, payload, () => {
      setOpen(false);
      fetchAdminDahsboardData();
    });
  };

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  function tagRender(props: any) {
    const { label, value, closable, onClose } = props;
    return (
      <span key={value} onClick={() => onClose(value)}>
        {label}
      </span>
    );
  }

  const opriorityOption = (
    <Menu>
      <div className="mt-2 ml-2 mr-2">
        <SearchBar handleChange={() => {}} />
      </div>
      {drawerAssignToData.map((item) => {
        return (
          <Menu.Item key={item.id}>
            <div className="flex justify-between ">
              <div className="flex">
                <div className="mr-2">
                  <img src={item.avatar} alt="icon" />
                </div>
                <div>{item.name}</div>
              </div>
              <div className="cursor-pointer light-grey-color text-xs" onClick={() => handleAddUser(item)}>
                {item.btn}
              </div>
            </div>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <>
      <div
        className="cursor-pointer"
        onClick={() => {
          // setOpen(true);
          getHepDeskDetail(id, () => {
            setOpen(true);
          });
        }}
      >
        <EyeActionIcon />
      </div>
      <PopUpModal width={1000} title="" footer={false} close={() => setOpen(false)} open={open}>
        <Row className="attendance" gutter={[20, 20]}>
          <Col xs={24} xxl={16} xl={16} lg={16}>
            <Row className="mb-12">
              <Col xxl={18} xl={18} lg={18} md={8} xs={24}>
                <Row align="middle" className="gap-3">
                  <div className="cursor-pointer" onClick={() => setIsArchive(!isArchive)}>
                    {isArchive ? <ArchiveFilledIcon /> : <ArchiveIcon />}
                  </div>
                  <p className="font-semibold text-[20px] leading-[28px] capitalize">{helpDeskDetail?.subject}</p>
                </Row>
              </Col>
              <Col xxl={6} xl={6} lg={6} md={6} xs={24}>
                <StatusDropdown
                  StatusOptions={StatusOptions}
                  state={initialState?.status || helpDeskDetail?.status}
                  setState={setInitialState}
                />
              </Col>
            </Row>
            <Form layout="vertical" form={form} onFinish={onFinishHandler}>
              <Row gutter={[30, 20]} style={{ maxHeight: 550, overflowY: "scroll" }} className="attendance-log-content">
                <Col xs={24} xxl={12} xl={12} lg={12}>
                  <div>
                    <label>User</label>
                    <Input
                      className="input"
                      disabled
                      onChange={() => {}}
                      id=""
                      name="user"
                      placeholder="placeholder"
                      size="large"
                      type="text"
                      value={helpDeskDetail?.reportedBy?.firstName + " " + helpDeskDetail?.reportedBy?.lastName}
                    />
                  </div>
                </Col>
                <Col xs={24} xxl={12} xl={12} lg={12}>
                  <div>
                    <label>User Role</label>
                    <Input
                      className="input"
                      disabled
                      onChange={() => {}}
                      id=""
                      name="userRole"
                      placeholder="placeholder"
                      size="large"
                      type="text"
                      value={helpDeskDetail?.reportedBy?.role}
                    />
                  </div>
                </Col>

                <Col xs={24}>
                  <SelectComp
                    className=""
                    label="Issue Type"
                    placeholder="Select"
                    popupClassName=""
                    onChange={(e: any) => setInitialState({ ...initialState, type: e })}
                    value={initialState?.type || helpDeskDetail?.type}
                    options={issueTypeOptions}
                  />
                </Col>

                <Col xs={24}>
                  <SelectComp
                    className=""
                    label="Priority"
                    placeholder="Select"
                    popupClassName=""
                    value={initialState?.priority || helpDeskDetail?.priority}
                    onChange={(e: any) => setInitialState({ ...initialState, priority: e })}
                    options={priorityOptions}
                  />
                </Col>

                <Col xs={24}>
                  {/* <div>
                  <Dropdown
                    placement="bottomRight"
                    overlay={opriorityOption}
                    visible={visible}
                    onVisibleChange={handleVisibleChange}
                    trigger={["click"]}
                    arrow={true}
                  >
                    <div>
                      <label>Assign</label>
                      <div className="light-gray-border h-[48px] rounded-[8px] flex items-center justify-between pl-4 pr-4">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            {assignUser.map((user) => (
                              <div className="flex items-center gap-2 p-2 pr-2 pl-2 text-input-bg-color rounded-[50px]">
                                <span className="text-teriary-color font-normal text-xs">{user.name}</span>
                                <CloseCircleFilled
                                  className="text-[20px] gray-color"
                                  onClick={() => handleRemoveUser(user.id)}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        <DownOutlined className="text-sm ml-2" />
                      </div>
                    </div>
                  </Dropdown>
                  </div> */}
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
                      {roleBaseUsers
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
                </Col>
                <Col xs={24}>
                  <label>Log Time</label>
                  <Row gutter={[16, 20]}>
                    <Col xs={24} xxl={8} xl={8} lg={8}>
                      <div>
                        <Input
                          className="input"
                          disabled
                          onChange={() => {}}
                          id=""
                          name="hours"
                          placeholder="Hours"
                          size="large"
                          type="text"
                          value={dayjs(helpDeskDetail?.date).format("hh")}
                        />
                      </div>
                    </Col>

                    <Col xs={24} xxl={8} xl={8} lg={8}>
                      <Input
                        className="input"
                        disabled
                        onChange={() => {}}
                        id=""
                        name="minutes"
                        placeholder="Minutes"
                        size="large"
                        type="text"
                        value={dayjs(helpDeskDetail?.date).format("mm")}
                      />
                    </Col>
                    <Col xs={24} xxl={8} xl={8} lg={8}>
                      <Input
                        className="input"
                        disabled
                        onChange={() => {}}
                        id=""
                        name="seconds"
                        placeholder="Seconds"
                        size="large"
                        type="text"
                        value={dayjs(helpDeskDetail?.date).format("ss")}
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
                          onChange={() => {}}
                          id=""
                          name="hours"
                          placeholder="placeholder"
                          size="large"
                          type="text"
                          value={dayjs(helpDeskDetail?.date).format("YYYY-MM-DD")}
                        />
                      </div>
                    </Col>
                    <Col xs={24} xxl={12}>
                      <div>
                        <label>Reporting Time</label>
                        <Input
                          className="input"
                          disabled
                          onChange={() => {}}
                          id=""
                          name="minutes"
                          placeholder="placeholder"
                          size="large"
                          type="text"
                          value={dayjs(helpDeskDetail?.date).format("hh:mm A")}
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
                      value={helpDeskDetail?.description}
                    />
                  </div>
                </Col>
                <Col xs={24}>
                  <label>Attachment (Optional)</label>
                  <Row gutter={[20, 20]} className="pt-3">
                    {helpDeskDetail?.attachments?.map((img: any) => (
                      <Col xs={24} xxl={12} xl={12} lg={12} md={12}>
                        <img
                          className="w-full"
                          src={`${constants.MEDIA_URL}/${img?.mediaId}.${img?.metaData?.extension}`}
                          alt={img?.filename || "sdf"}
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
                    <Button htmlType="submit" className="teriary-bg-color text-white capitalize font-semibold	text-base">
                      save
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Form>
          </Col>

          <Col className="flex flex-col justify-between" xs={24} xxl={8} xl={8} lg={8}>
            <div className="pr-2 pl-6">
              <div className="mb-16 text-xl font-medium text-primary-color">Comments</div>
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
              <div className=" mt-2 p-2 rounded-lg light-gray-border">
                <textarea placeholder="Comment here" className="w-full h-24 border-0 outline-0 resize-none" />
                <Row justify="space-between" align="middle" className="off-white-bg px-[10px] py-[6px] rounded-md">
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
                text-white 
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
    </>
  );
};

export default LogIssueModal;
