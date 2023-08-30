import { useEffect, useState } from "react";
import { Button, Col, Input, Row, Form, Tree, UploadFile } from "antd";
import {
  ArchiveFilledIcon,
  ArchiveIcon,
  EyeActionIcon,
} from "../../../../assets/images";
import { NoDataFound, PopUpModal, TextArea } from "../../../../components";
import SelectComp from "../../../../components/Select/Select";
import "./style.scss";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import StatusDropdown from "../../../helpDesk/systemAdmin/statusDropDown/statusDropdown";
import CommentCard from "../Comments/CommentCard";
import useCustomHook from "../actionHandler";
import dayjs from "dayjs";
import UserSelector from "../../../../components/UserSelector";
import constants from "../../../../config/constants";
import { DataNode } from "antd/es/tree";
import { getUserAvatar } from "../../../../helpers";
import CreateComment from "./createComment";


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
  { value: "OTHERS", label: "Other" },
];

const LogIssueModal = (props: any) => {
  const { id } = props;
  const {
    getHepDeskDetail,
    helpDeskDetail,
    roleBaseUsers,
    EditHelpDeskDetails,
    fetchAdminDahsboardData,
    getHelpDeskComment,
    helpdeskComments,
    addHelpDeskComment,
    updateHelpDeskComment,
  } = useCustomHook();

  const [isArchive, setIsArchive] = useState(helpDeskDetail?.isFlaged);
  const [expandedKeys, setExpandedKeys] = useState<any[]>([]);
  const [comment, setComment] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [open, setOpen] = useState(false);
  const [initialState, setInitialState] = useState<any>({
    type: null,
    priority: null,
    editStatus: null,
    assigns: null,
    isFlaged: null,
  });
  const [form] = Form.useForm();

  useEffect(() => { setIsArchive(helpDeskDetail?.isFlaged) }, [helpDeskDetail?.isFlaged])

  if (helpDeskDetail) {
    form.setFieldValue(
      "attendees",
      helpDeskDetail?.assignedUsers?.map((user: any) => user.assignedId)
    );
  }

  const newRoleBaseUsers = roleBaseUsers.map((item: any) => {
    return {
      key: item.id,
      value: item.id,
      label: item.firstName,
    };
  });

  const onFinishHandler = (values: any) => {
    let payload: any = {
      assignedId:
        values?.attendees?.length > 0 ? values?.attendees?.map((attendee: any) => attendee?.toString()) : [" "],
    };
    payload["type"] = initialState.type || helpDeskDetail?.type;
    if (initialState.editStatus) payload["status"] = initialState.editStatus;
    if (initialState.priority) payload["priority"] = initialState.priority;
    payload["isFlaged"] = `${isArchive}`;

    EditHelpDeskDetails(id, payload, () => {
      setOpen(false);
      fetchAdminDahsboardData();
    });
  };

  const handleCommentAdd = () => {
    const payload: any = {
      entityId: id,
      entityType: "HELPDESK_MESSAGES",
      comment,
    };
    fileList?.length > 0 && (payload.media = fileList)
    return addHelpDeskComment(payload, () => {
      getHelpDeskComment(id);
      setComment("");
      setFileList([])
    });
  };

  const handleUpdateComment = (helpdeskCommentId: string, like: boolean) => {
    updateHelpDeskComment({ helpdeskCommentId, like }, () => {
      getHelpDeskComment(id);
    });
  };

  const handleCommentReply = (payload: any) => {
    payload["entityId"] = id;
    payload["entityType"] = "HELPDESK_MESSAGES";
    addHelpDeskComment(payload, () => {
      getHelpDeskComment(id);
    });
  };

  const handleExpand = (index: string) => {
    setExpandedKeys(
      expandedKeys.some(item => index === item) ?
        expandedKeys?.filter(item => index !== item) :
        [...expandedKeys, index])
  }

  const treeData: DataNode[] = helpdeskComments.map((item: any, index: number) => ({
    title: <>
      <CommentCard
        name={item?.commentedBy?.firstName + " " + item?.commentedBy?.lastName}
        image={getUserAvatar({ profileImage: item?.commentedBy?.profileImage })
        }
        content={item?.comment}
        attachments={item?.attachments}
        time={dayjs(item?.createdAt).fromNow()}
        likes={item?.totalLikes}
        youLike={item?.youLike}
        updateLike={handleUpdateComment}
        commentId={item?.id}
        handleReply={handleCommentReply}
      />
      <div className="flex gap-2 items-center cursor-pointer" onClick={() => handleExpand(index.toString())}>
        <p className="primary-color text-[14px]">{item?.replies?.length || 0} replies</p>
        {expandedKeys.some(item => index.toString() === item) ?
          <DownOutlined className="w-3 h-3 primary-color" /> :
          <RightOutlined className="w-3 h-3 primary-color" />
        }
      </div>
    </>,
    key: `${index}`,
    selectable: false,
    switcherIcon: false,
    children: [...item?.replies]?.reverse()?.map((obj: any, idx: number) => ({
      title: <CommentCard
        name={obj?.commentedBy?.firstName + " " + obj?.commentedBy?.lastName}
        image={getUserAvatar({ profileImage: obj?.commentedBy?.profileImage })}
        content={obj?.comment}
        attachments={obj?.attachments}
        time={dayjs(obj?.createdAt).fromNow()}
        likes={obj?.totalLikes}
        youLike={obj?.youLike}
        updateLike={handleUpdateComment}
        commentId={obj?.id}
        handleReply={handleCommentReply}
        isNested={true}
      />,
      key: `${index}-${idx}`,
      selectable: false,
      switcherIcon: false,
    })
    )

  }))

  return (
    <>
      <div
        className="cursor-pointer"
        onClick={() => {
          getHepDeskDetail(id, () => {
            setOpen(true);
            getHelpDeskComment(id);
          });
        }}
      >
        <EyeActionIcon />
      </div>
      {
        open &&
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
                    state={initialState?.editStatus || helpDeskDetail?.status}
                    setState={setInitialState}
                  />
                </Col>
              </Row>
              <Form layout="vertical" form={form} onFinish={onFinishHandler}>
                <Row gutter={[30, 20]}
                  className="attendance-log-content custom-scrollbar"
                >
                  <Col xs={24} xxl={12} xl={12} lg={12}>
                    <div>
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
                        onChange={() => { }}
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
                    <Form.Item
                      name={"attendees"}
                      label="Asign"
                      className="attendees"
                      rules={[{ required: false }, { type: "array" }]}
                    >
                      <UserSelector placeholder="select" hasSearch={true} hasMultiple={true} options={newRoleBaseUsers} />
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
                            value={dayjs(helpDeskDetail?.date).format("hh")}
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
                          value={dayjs(helpDeskDetail?.date).format("mm")}
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
                            onChange={() => { }}
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
                            onChange={() => { }}
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
              <div className="pr-2 pl-6 flex-1">
                <div className="mb-16 text-xl font-medium text-primary-color">Comments</div>
                <div className="attendance-log-comment custom-scrollbar"
                >
                  <div className="tree-parent-wrapper pr-1">
                    {
                      treeData?.length > 0 ?
                        <Tree
                          showLine
                          switcherIcon={false}
                          treeData={treeData}
                          expandedKeys={expandedKeys}
                        /> :
                        <div>
                          <NoDataFound isNoBorder />
                        </div>
                    }
                  </div>
                </div>
              </div>
              <div className="ml-3 ">
                <CreateComment
                  handleCommentAdd={handleCommentAdd}
                  comment={comment}
                  setComment={setComment}
                  fileList={fileList}
                  setFileList={setFileList}
                />
              </div>
            </Col>
          </Row>
        </PopUpModal>
      }
    </>
  );
};

export default LogIssueModal;
