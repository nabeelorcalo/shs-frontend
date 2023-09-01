import { CheckOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Col, Divider, Form, Row, Typography, Input, Modal, Avatar } from "antd";
import { useEffect, useState } from "react";
import {
  ArrowDownDark,
  GrievancesCall,
  GrievancesDocDownload,
  GrievancesDocJPG,
  GrievancesDocPDF,
  GrievancesInbox,
  GrievancesLocation,
  GrievancesSidebarAvater,
  UserAvatar,
  GrivanceTime,
  Success,
  EmotIconUnSatis,
  EmotIconSatis,
  SadEmote,
  HappyEmote,
} from "../../../assets/images";
import { Alert, Breadcrumb, Button, BoxWrapper, ButtonThemePrimary } from "../../../components";
import DragAndDropWide from "../../../components/DragAndDrop";
import DropDownNew from "../../../components/Dropdown/DropDownNew";
import "./style.scss";
import dayjs from "dayjs";
import constants from "../../../config/constants";
import DragAndDropUpload from "./DragDropFile";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../config/validationMessages";
import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../../store";

const { Text } = Typography;
const { TextArea } = Input;
const rolesObject: any = {
  COMPANY_MANAGER: "Manager",
  COMPANY_ADMIN: "Admin",
  INTERN: "Intern",
  STUDENT: "Student",
};
const emojiDictionary: any = {
  SATISFIED: { title: "Satisfied", index: 1 },
  UNSATISFIED: { title: "UnSatisfied", index: 0 },
};
function handleChange(value: any) {}

const GrievancesDetails = (props: any) => {
  const {
    grievanceDetail,
    managers,
    addReply,
    grievanceId,
    fetchGrievanceDetail,
    updateGrievance,
    replyList,
    feedbackList,
    addFeedBack,
    fetchGreivanceDetailData,
  } = props;

  const [uploadFile, setUploadFile] = useState([]);
  const [emoji, setEmoji] = useState<any>({ id: null, title: "" });
  const [modalemoji, setModalEmoji] = useState<any>({ id: null, title: "" });
  const [openModalBox, setOpenModalBox] = useState(false);
  const role = useRecoilValue(currentUserRoleState);

  const breadcrumbArray = [
    { name: "Grievances Details", onClickNavigateTo: "/grievances/all-grievance" },
    { name: "Grievances", onClickNavigateTo: "/grievances" },
    role !== constants.INTERN && { name: "All Grievances", onClickNavigateTo: "/grievances/all-grievance" },
  ];
  const grievanceStatuses: any = {
    RESOLVED: "Resolved",
    REOPEN: "Re-Opened",
    NEW: "New",
    INPROGRESS: "In Progress",
  };
  const detailsData = [
    {
      userImg: UserAvatar,
      userName: "john doe",
    },
    {
      userImg: UserAvatar,
      userName: "mina marino",
    },
    {
      userImg: UserAvatar,
      userName: "clark",
    },
    {
      userImg: UserAvatar,
      userName: "sarah joe",
    },
  ];
  const emojisIcons = [
    {
      icon: emoji?.title === "UnSatisfied" ? EmotIconSatis : SadEmote,
      title: "UnSatisfied",
    },
    {
      icon: emoji?.title === "Satisfied" ? HappyEmote : EmotIconUnSatis,
      title: "Satisfied",
    },
  ];
  const ModalemojisIcons = [
    {
      icon: modalemoji?.title === "UnSatisfied" ? EmotIconSatis : SadEmote,
      title: "UnSatisfied",
    },
    {
      icon: modalemoji?.title === "Satisfied" ? HappyEmote : EmotIconUnSatis,
      title: "Satisfied",
    },
  ];
  const rendercolorEmoji: any = {
    UnSatisfied: EmotIconSatis,
    satisfied: EmotIconSatis,
  };
  const [filterValue, setFilterValue] = useState({
    escalatedBy: "Select",
    userImg: "",
    userName: "",
    showSuccess: false,
  });
  const [form] = Form.useForm();
  const downlaodFile = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
  };
  const handleFinish = (values: any) => {
    const formData = new FormData();
    formData.append("description", values?.description);
    formData?.append("grievanceId", grievanceId);
    if (uploadFile?.length) formData.append("media", uploadFile[0]);
    addReply(formData, () => {
      fetchGreivanceDetailData();
      form.resetFields();
      setUploadFile([]);
    });
  };
  const handleUpdate = (type?: any) => {
    let formData = new FormData();
    let status: any;
    if (type) {
      formData.append("escalatedTo", type);
    } else {
      status = grievanceDetail?.status !== "RESOLVED" ? "RESOLVED" : "REOPEN";
      formData.append("status", status);
    }
    updateGrievance(formData, grievanceId, () => {
      if (!type) setFilterValue({ ...filterValue, showSuccess: !filterValue.showSuccess });
      // if (status === "RESOLVED" && feedbackList?.length === 0) {
      //   setOpenModalBox(true);
      // } else {
      fetchGreivanceDetailData();
      // }
    });
  };

  const handleFeedback = () => {
    addFeedBack({ status: modalemoji?.title?.toUpperCase(), grievanceId }, () => {
      setOpenModalBox(false);
      fetchGreivanceDetailData();
    });
  };

  const statusClick = () => {
    if (role === constants.INTERN && grievanceDetail?.status !== "RESOLVED") {
      return;
    }
    setFilterValue({ ...filterValue, showSuccess: !filterValue.showSuccess });
  };

  useEffect(() => {
    if (feedbackList?.length) {
      setEmoji(emojiDictionary[feedbackList[0]?.status]);
    }
  }, [feedbackList]);
  return (
    <div className="grievance-details">
      <Breadcrumb breadCrumbData={breadcrumbArray} />
      <Divider />
      <Row gutter={[16, 16]}>
        <Col sm={24} md={24} lg={16} xl={16} xxl={18} className="grievance-details-scroll ">
          <BoxWrapper className="p-3">
            <div className="flex max-sm:flex-col justify-between">
              <Text className="text-lg sm:text-xl font-medium text-primary-color">{grievanceDetail?.subject}</Text>
              <Text
                disabled={role === constants.INTERN && grievanceDetail?.status !== "RESOLVED"}
                onClick={statusClick}
                className=" font-medium text-base px-1 attandance-button text-input-bg-color cursor-pointer  "
              >
                <CheckOutlined />
                <span className="mx-2">{grievanceDetail?.status !== "RESOLVED" ? "Mark as resolved" : "Re-Open"}</span>
              </Text>
            </div>
            <Text className="flex items-center mt-2">
              <span className="text-success-placeholder-color  ">
                <ClockCircleOutlined />
              </span>
              <span className="text-sm sm:mt-0 pl-3 text-success-placeholder-color ">Last Updated</span>
              <span className="text-sm sm:mt-0 pl-1 text-teriary-color ">{dayjs(grievanceDetail?.updatedAt).fromNow()}</span>
            </Text>
            <Text className="flex md:mt-5 xs:text-sm sm:text-base font-normal px-2 text-secondary-color">{grievanceDetail?.description || ""}</Text>
            <Row>
              <Col span={24}>
                <div className="Attactments md:mt-5">
                  <Text className="xs:text-base sm:text-base text-lg text-teriary-color mt-3 sm:mt-0">Attachments</Text>
                </div>
              </Col>
              <Row gutter={[16, 16]} className="w-full gap-2 p-2">
                {grievanceDetail?.attachments &&
                  grievanceDetail?.attachments.map((file: any) => (
                    <Col sm={12} lg={11} xl={10} xxl={6} className=" gutter-row text-input-bg-color">
                      <div className="flex justify-between py-2">
                        <div className="flex flex-row">
                          <GrievancesDocPDF className="mt-1" />
                          <div className="flex flex-col sm:px-1">
                            <Text className="text-sm font-normal">{file?.filename?.slice(0, 20) + "." + file?.metaData?.extension}</Text>
                            <Text className="text-xs font-normal">{Math.ceil(file?.mediaSize / (1024 * 1024))} MB</Text>
                          </div>
                        </div>
                        <div className="float-right cursor-pointer">
                          <span
                            onClick={() => downlaodFile(`${constants.MEDIA_URL}/${file.mediaId}.${file?.metaData?.extension}`, file?.filename)}
                            className="ml-5"
                          >
                            <GrievancesDocDownload />
                          </span>
                        </div>
                      </div>
                    </Col>
                  ))}
                {/* <Col sm={12} lg={11} xl={10} xxl={6} className="gutter-row text-input-bg-color">
                  <div className="flex justify-between py-2">
                    <div className="flex flex-row">
                      <GrievancesDocJPG className="mt-1" />
                      <div className="flex flex-col sm:px-1">
                        <Text className="text-sm font-normal">Document0023.pdf</Text>
                        <Text className="text-xs font-normal">2 MB</Text>
                      </div>
                    </div>
                    <div className="float-right">
                      <span className="ml-5">
                        <GrievancesDocDownload />
                      </span>
                    </div>
                  </div>
                </Col> */}
              </Row>
            </Row>
          </BoxWrapper>
          {grievanceDetail?.status && grievanceDetail?.status !== "RESOLVED" && (
            <BoxWrapper className="xs:mt-2 sm:mt-5 p-3">
              <Text className="text-lg sm:text-xl font-medium">Reply To Grievance</Text>
              <Form form={form} onFinish={handleFinish} validateMessages={DEFAULT_VALIDATIONS_MESSAGES}>
                <Form.Item className="mt-3" name="description" rules={[{ required: true }]}>
                  <TextArea
                    className="text-input-bg-color"
                    rows={6}
                    placeholder="Write Something here..."
                    // maxLength={6}
                  />
                </Form.Item>
                <Text className="font-normal text-base text-teriary-color">Attachment</Text>
                <Form.Item className="mt-3" name="media">
                  <DragAndDropUpload files={uploadFile} setFiles={setUploadFile} />
                </Form.Item>
                <div className="flex justify-end">
                  <ButtonThemePrimary className="teriary-bg-color replay-btn" htmlType="submit" type="primary">
                    Reply
                  </ButtonThemePrimary>
                </div>
              </Form>
            </BoxWrapper>
          )}

          <BoxWrapper className="xs:mt-2 sm:mt-5 p-3">
            <p>Conversation</p>
            {replyList?.length > 0 &&
              replyList?.map((reply: any) => (
                <>
                  <div className="flex items-start mt-5">
                    {/* <img
                      src={
                        reply?.user?.profileImage
                          ? `${constants.MEDIA_URL}/${reply?.user?.profileImage?.mediaId}.${reply?.user?.profileImage?.metaData?.extension}`
                          : UserAvatar
                      }
                      alt=""
                      className="w-12 h-12 rounded-full"
                    /> */}
                    <Avatar
                      size={44}
                      src={`${constants.MEDIA_URL}/${reply?.user?.profileImage?.mediaId}.${reply?.user?.profileImage?.metaData?.extension}`}
                    >
                      {reply?.user?.firstName?.charAt(0)}
                      {reply?.user?.lastName?.charAt(0)}
                    </Avatar>
                    <div className="ml-[20px]">
                      <div className="flex">
                        <p>{reply?.user ? reply?.user?.firstName + " " + reply?.user?.lastName : "N/A"}</p>
                        <p className="anchor-blue-bg-btn ml-4 anchor-bg-blue-color px-3 py-1 rounded-md">
                          {reply?.user ? rolesObject[reply?.user?.role] : "N/A"}
                        </p>
                      </div>
                      <div className="mt-1">
                        <div className="flex items-center">
                          <img src={GrivanceTime} alt="" />
                          <p className="ml-2 text-sm">{dayjs(reply?.createdAt).fromNow()}</p>
                        </div>
                        <p className="pt-5">{reply?.description}</p>

                        <Row gutter={[16, 16]} className="w-full gap-2 p-2">
                          {reply?.attachments &&
                            reply?.attachments.map((file: any) => (
                              <div className="flex justify-between py-2">
                                <div className="flex flex-row">
                                  <GrievancesDocPDF className="mt-1" />
                                  <div className="flex flex-col sm:px-1">
                                    <Text className="text-sm font-normal">{file?.filename?.slice(0, 20) + "." + file?.metaData?.extension}</Text>
                                    <Text className="text-xs font-normal">{Math.ceil(file?.mediaSize / (1024 * 1024))} MB</Text>
                                  </div>
                                </div>
                                <div className="float-right cursor-pointer">
                                  <span
                                    onClick={() =>
                                      downlaodFile(`${constants.MEDIA_URL}/${file.mediaId}.${file?.metaData?.extension}`, file?.filename)
                                    }
                                    className="ml-5"
                                  >
                                    <GrievancesDocDownload />
                                  </span>
                                </div>
                              </div>
                            ))}
                          {/* <Col sm={12} lg={11} xl={10} xxl={6} className="gutter-row text-input-bg-color">
                  <div className="flex justify-between py-2">
                    <div className="flex flex-row">
                      <GrievancesDocJPG className="mt-1" />
                      <div className="flex flex-col sm:px-1">
                        <Text className="text-sm font-normal">Document0023.pdf</Text>
                        <Text className="text-xs font-normal">2 MB</Text>
                      </div>
                    </div>
                    <div className="float-right">
                      <span className="ml-5">
                        <GrievancesDocDownload />
                      </span>
                    </div>
                  </div>
                </Col> */}
                        </Row>
                      </div>
                    </div>
                  </div>
                  <Divider />
                </>
              ))}
            {/* <div className="flex items-start mt-5">
                <img src={UserAvatar} alt="" className="w-18 h-18" />
                <div className="ml-[20px]">
                  <div className="flex">
                    <p>Amelia Clark</p>
                    <p className="anchor-blue-bg-btn ml-4 anchor-bg-blue-color px-3 py-1 rounded-md">Manager</p>
                  </div>
                  <div className="mt-1">
                    <div className="flex items-center">
                      <img src={GrivanceTime} alt="" />
                      <p className="ml-2 text-sm">1 day ago</p>
                    </div>
                    <p className="pt-5">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lobortis ante non lectus
                      porta, eu tincidunt massa pulvinar. Duis dignissim vel dui ac efficitur. Nunc consectetur pulvinar
                      eros, vel commodo neque condimentum sed. Duis ultricies, purus maximus mollis commodo, ipsum nibh
                      tincidunt ex, eu laoreet elit nibh vitae sapien.
                    </p>
                  </div>
                </div>
              </div>
              <Divider /> */}
            {feedbackList?.length > 0 &&
              feedbackList.slice(0, 1).map((feedback: any) => {
                return (
                  <>
                    <div className="flex flex-col justify-center items-center">
                      <Success />
                      <p className="py-3">
                        Grievance marked as resolved by {grievanceDetail?.resolver?.firstName + " " + grievanceDetail?.resolver?.lastName}
                      </p>
                      <p className="pt-4">How Would You Rate This Experience?</p>
                    </div>
                    <div className="flex  justify-center my-5">
                      {emojisIcons.map((data: any, index: number) => (
                        <div className="flex flex-col mx-7">
                          <img
                            src={data.icon}
                            alt=""
                            className="w-16 h-16 unsatisfy-emoji"
                            // onClick={() => setEmoji({ title: data?.title, id: index })}
                          />
                          {data?.title}
                        </div>
                      ))}
                    </div>
                  </>
                );
              })}

            {/* <div className="flex items-start mt-5">
                <img src={UserAvatar} alt="" className="w-18 h-18" />
                <div className="ml-[20px]">
                  <div className="flex">
                    <p>Amelia Clark</p>
                    <p className="anchor-blue-bg-btn ml-4 anchor-bg-blue-color px-3 py-1 rounded-md">Manager</p>
                  </div>
                  <div className="mt-1">
                    <div className="flex items-center">
                      <img src={GrivanceTime} alt="" />
                      <p className="ml-2 text-sm">1 day ago</p>
                    </div>
                    <p className="pt-5">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lobortis ante non lectus
                      porta, eu tincidunt massa pulvinar. Duis dignissim vel dui ac efficitur. Nunc consectetur pulvinar
                      eros, vel commodo neque condimentum sed. Duis ultricies, purus maximus mollis commodo, ipsum nibh
                      tincidunt ex, eu laoreet elit nibh vitae sapien.
                    </p>
                  </div>
                </div>
              </div> */}
          </BoxWrapper>
        </Col>

        <Col span={24} md={24} lg={8} xl={8} xxl={6}>
          <BoxWrapper className="grievancesDetails-boxWrapper">
            <Text className="text-lg sm:text-xl font-medium">Grievance Information</Text>
            <div className="flex justify-between  font-normal py-1 mt-1">
              <Text className="text-sm sm:text-base">Created on</Text>
              <Text className="text-sm sm:text-base">{dayjs(grievanceDetail?.createdAt).format("DD MMM, YYYY")}</Text>
            </div>
            <Divider className="mt-2 mb-1" />
            <div className="flex justify-between font-normal py-1">
              <Text className="text-sm sm:text-base">Type</Text>
              <Text className="text-sm sm:text-base capitalize">{grievanceDetail?.type?.toLowerCase()}</Text>
            </div>
            <Divider className="mt-2 mb-1" />
            <div className="flex justify-between font-normal py-1">
              <Text className="text-sm sm:text-base">Status</Text>
              <Text className="organ-status-bg rounded-md px-3 font-medium text-sm center white-color">
                {grievanceStatuses[grievanceDetail?.status] ?? grievanceDetail?.status}
              </Text>
            </div>
            <Divider className="mt-2 mb-1" />
            <div className="flex justify-between font-normal">
              <Text className="pt-2 w-[130px] text-sm sm:text-base mt-1.5 sm:mt-0">Escalated To</Text>

              <div className="asignee-wrap w-[70%]">
                <DropDownNew
                  placement={"bottomRight"}
                  items={[
                    {
                      label: (
                        <div className="max-h-96 overflow-y-auto">
                          {managers &&
                            managers.map((item: any, index: any) => (
                              <div
                                key={index}
                                className="flex items-center gap-3 mb-[20px]"
                                onClick={() => {
                                  setFilterValue({
                                    ...filterValue,
                                    userName: item?.companyManager?.firstName + " " + item?.companyManager?.lastName,
                                    userImg: `${constants.MEDIA_URL}/${item?.companyManager?.profileImage?.mediaId}.${item?.companyManager?.profileImage?.metaData?.extension}`,
                                  });
                                  handleUpdate(item?.managerId);
                                }}
                              >
                                {/* <img
                                  src={
                                    item?.companyManager?.profileImage
                                      ? `${constants.MEDIA_URL}/${item?.companyManager?.profileImage?.mediaId}.${item?.companyManager?.profileImage?.metaData?.extension}`
                                      : UserAvatar
                                  }
                                  className="h-[20px] w-[20px] rounded-full object-cover"
                                /> */}
                                <Avatar
                                  size={30}
                                  src={`${constants.MEDIA_URL}/${item?.companyManager?.profileImage?.mediaId}.${item?.companyManager?.profileImage?.metaData?.extension}`}
                                >
                                  {item?.companyManager?.firstName?.charAt(0)}
                                  {item?.companyManager?.lastName?.charAt(0)}
                                </Avatar>
                                <p>{item?.companyManager?.firstName + " " + item?.companyManager?.lastName}</p>
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
                      {/* <img
                        src={
                          filterValue?.userImg || grievanceDetail?.escalated?.profileImage
                            ? `${constants.MEDIA_URL}/${grievanceDetail?.escalated?.profileImage?.mediaId}.${grievanceDetail?.escalated?.profileImage?.metaData?.extension}`
                            : UserAvatar
                        }
                        className="h-10 w-10 rounded-full object-cover"
                      /> */}
                      <Avatar
                        size={38}
                        src={
                          filterValue.userImg ||
                          `${constants.MEDIA_URL}/${grievanceDetail?.escalated?.profileImage?.mediaId}.${grievanceDetail?.escalated?.profileImage?.metaData.extension}`
                        }
                      >
                        {grievanceDetail?.escalated?.firstName?.charAt(0)}
                        {grievanceDetail?.escalated?.lastName?.charAt(0)}
                      </Avatar>
                      <p className="text-primary-color">
                        {filterValue.userName || grievanceDetail?.escalated?.firstName + " " + grievanceDetail?.escalated?.lastName}
                      </p>
                    </div>
                    <ArrowDownDark />
                  </div>
                </DropDownNew>
              </div>
            </div>
          </BoxWrapper>
          <BoxWrapper className="my-5 pb-0">
            <Text className="text-lg sm:text-xl font-medium">Escalated By</Text>
            <div className="flex items-center flex-col">
              <span className="my-3">
                {/* <img
                  className="h-24 w-24 rounded-full"
                  src={
                    grievanceDetail?.escalater?.profileImage
                      ? `${constants.MEDIA_URL}/${grievanceDetail?.escalater?.profileImage?.mediaId}.${grievanceDetail?.escalater?.profileImage?.metaData?.extension}`
                      : UserAvatar
                  }
                /> */}
                <Avatar
                  size={100}
                  src={`${constants.MEDIA_URL}/${grievanceDetail?.escalater?.profileImage?.mediaId}.${grievanceDetail?.escalater?.profileImage?.metaData?.extension}`}
                >
                  {grievanceDetail?.escalater?.firstName?.charAt(0)}
                  {grievanceDetail?.escalater?.lastName?.charAt(0)}
                </Avatar>
                {/* <GrievancesSidebarAvater /> */}
              </span>
              <Text className="text-lg sm:text-xl font-semibold text-primary-color">
                {grievanceDetail?.escalater?.firstName + " " + grievanceDetail?.escalater?.lastName}
              </Text>
              <Text className="font-medium text-base">{grievanceDetail?.escalater?.role}</Text>
              <Text className="text-base font-normal">Design</Text>
            </div>
            <Divider className="mt-2 mb-1" />
            <div className="flex flex-col">
              <span className="py-2 sm:p-3">
                <GrievancesInbox />
                <span className="text-xs sm:text-sm px-3 font-normal">{grievanceDetail?.escalater?.email}</span>
              </span>
              <span className="py-2 sm:p-3">
                {" "}
                <GrievancesCall />
                <span className="text-xs sm:text-sm px-3 font-normal">{grievanceDetail?.escalater?.phoneNumber}</span>
              </span>
              <span className="py-2 sm:p-3">
                {" "}
                <GrievancesLocation />
                <span className="text-xs sm:text-sm px-3 font-normal">
                  {grievanceDetail?.escalater?.street ?? "N/A"},{grievanceDetail?.escalater?.city ?? "N/A"},
                  {grievanceDetail?.escalater?.country ?? "N/A"}
                </span>
              </span>
            </div>
          </BoxWrapper>
        </Col>
      </Row>
      <Alert
        cancelBtntxt="Cancel"
        okBtntxt="Proceed"
        state={filterValue.showSuccess}
        setState={setFilterValue}
        okBtnFunc={() => handleUpdate("")}
        type="success"
        width={570}
        title=""
        children={<p>Do you want to mark this grievance as {grievanceDetail?.status !== "RESOLVED" ? "resolved" : "reopen"}?</p>}
      />
      <Modal
        open={openModalBox}
        footer={[null]}
        onCancel={() => {
          setOpenModalBox(false);
          fetchGreivanceDetailData();
        }}
      >
        <p className="text-center my-9">How would you rate this experience?</p>
        <div className="flex  justify-center my-5">
          {ModalemojisIcons.map((data: any, index: number) => (
            <div className="flex flex-col mx-7">
              <img src={data.icon} alt="" className="w-16 h-16 unsatisfy-emoji" onClick={() => setModalEmoji({ title: data?.title, id: index })} />
              {data?.title}
            </div>
          ))}
        </div>
        <Button
          className="teriary-bg-color replay-btn w-full mt-7"
          label="Submit"
          disabled={!modalemoji?.title}
          // htmlType="submit"
          type="primary"
          onClick={handleFeedback}
        />
      </Modal>
    </div>
  );
};

export default GrievancesDetails;
