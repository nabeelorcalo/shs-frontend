import { useEffect, useState } from "react";
import { Button, Col, Divider, Input, Row, Menu, Form } from "antd";
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
import dayjs from "dayjs";
import useCustomHook from "../../actionHandler";
import UserSelector from "../../../../components/UserSelector";
import "./style.scss";

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

// const drawerAssignToData = [
//   {
//     id: "1",
//     avatar: Avatar,
//     name: "David Miller",
//     btn: "Add",
//   },
//   {
//     id: "2",
//     avatar: Avatar,
//     name: "Amelia Clark",
//     btn: "Add",
//   },
//   {
//     id: "3",
//     avatar: Avatar,
//     name: "Maria Sanoid",
//     btn: "Add",
//   },
//   {
//     id: "4",
//     avatar: Avatar,
//     name: "Jessica Alba",
//     btn: "Add",
//   },
// ];

const priorityOptions = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "HIGHEST", label: "Highest" },
]

const issueTypeOptions = [
  { value: "PAYMENT", label: "Payment" },
  { value: "BUG", label: "Bug" },
  { value: "ISSUE_NAME", label: "Issue Name" },
  { value: "WRONG_INFORMATION", label: "Wrong Information" },
  { value: "OTHER", label: "Other" },
]
const AttendaceLog = (props: any) => {
  const { open, setOpen } = props;
  const [isArchive, setIsArchive] = useState(false);
  const [assignUser, setAssignUser] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<any>({
    type: null,
    priority: null,
    editStatus: open.details?.status,
    assigns: []
  })
  const [form] = Form.useForm();

  const { EditHelpDeskDetails, getHelpDeskList, getRoleBaseUser, roleBaseUsers }: any = useCustomHook()

  useEffect(() => {
    getRoleBaseUser()
  }, [])

  const newRoleBaseUsers = roleBaseUsers.map((item: any) => {
    return ({
      key: item.id,
      value: item.id,
      label: item.firstName,
    })
  })

  const onFinishHandler = (values: any) => {
    setOpen({ ...open, openModal: false, update: !open.update })
    EditHelpDeskDetails(open.details?.id,
      values.priority,
      state.editStatus,
      values.issueType,
      values.assign.length !== 0 ? [String(values.assign)] : ['']
    )
    getHelpDeskList(null, null)
    form.resetFields();
  }

  let initialValues = {
    issueType: open.details?.type,
    priority: open.details?.priority,
    status: open.details?.status,
    assign: open?.details?.assignedUsers.map((item: any) => item.assignedTo?.id)
  }

  const onCloseHandler = () => {
    setOpen(false);
    setState({
      type: null,
      priority: null,
      status: null,
      assigns: []
    })
  }

  return (
    <PopUpModal
      width={1058}
      title=""
      footer={false}
      close={onCloseHandler}
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
                state={state.editStatus === null ? initialValues.status : state.editStatus}
                setState={setState} />
            </Col>
          </Row>
          <Form form={form} layout="vertical" onFinish={onFinishHandler} initialValues={initialValues}>
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
                    type="text"
                    value={`${open.details?.reportedBy?.firstName} ${open.details?.reportedBy?.lastName}`}
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
                    type="text"
                    value={open.details?.reportedBy?.role}
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
                    options={issueTypeOptions}
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
                    options={priorityOptions}
                  />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item label='Assign' name='assign'>
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

              <Col xs={24} className="mb-8">
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
                      type="text"
                      value={dayjs(open.details?.date).format('ss')}
                    />
                  </Col>
                </Row>
              </Col>

              <Col xs={24} className="mb-8">
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
                        type="text"
                        value={dayjs(open.details?.date).format('hh:mm A')}
                      />
                    </div>
                  </Col>
                </Row>
              </Col>

              <Col xs={24} className="mb-8">
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
                  <Button onClick={() => setOpen(false)}>Cancel</Button>
                </Col>
                <Col>
                  <Button htmlType="submit"
                    className="attendence-log-btn teriary-bg-color white-color capitalize font-semibold	text-base ">save
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