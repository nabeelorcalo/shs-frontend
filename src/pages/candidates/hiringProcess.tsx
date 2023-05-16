import { FC, useEffect, useState } from "react";
import { Col, Row, Avatar } from "antd";
import { Input } from "antd";
import HiringPipeline from "../../components/HiringPIpeline/hiringPipeline";
import BtnIcon from "../../assets/images/Button-icon.png";
import RejectModal from "./RejectModal";
import DropDownNew from "../../components/Dropdown/DropDownNew";
import { ArrowDownDark, Dot, UserAvatar } from "../../assets/images";
import { NoDataFound, Notifications, SearchBar } from "../../components";
import OfferLetterTemplateModal from "./OfferLetterTemplateModal";
import SelectTemplateModal from "./selectTemplateModal";
import { hiringList } from "./data";
import actionHandler from "./actionHandler";
import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../store";
interface IHiringProcess {
  selectedCandidate: any;
}
const HiringProcess: FC<IHiringProcess> = (props) => {
  const {
    selectedCandidate,
    selectedCandidate: { id },
    selectedCandidate: {
      internship: { title: internshipTitle, internType },
      stage,
      createdAt,
      userDetail: {
        // id,
        firstName,
        lastName,
        avatar,
        gender,
        DOB,
        phoneNumber,
        veriffStatus,
        postCode,
        email,
        address,
        country,
        city,
      },
    },
  } = props;

  const [open, setOpen] = useState(false);
  const [hiringProcessStatusList, setHiringProcessStatusList] = useState(hiringList);
  const [isSelectTemplateModal, setIsSelectTemplateModal] = useState(false);
  const [offerContractStatus, setOfferContractStatus] = useState({ pending: false, signed: false });
  const [isOfferLetterTemplateModal, setIsOfferLetterTemplateModal] = useState(false);
  const [selectTemplate, setSelectTemplate] = useState({ title: "Offer Letter", options: ["offer template 1"] });
  const [user, setUser] = useState({ userImg: UserAvatar, userName: "amelia clark" });
  const [hiringBtnText, setHiringBtnText] = useState("Move");
  // create comment State
  const [comment, setComment] = useState<string>("");

  // logged in user data
  const userData = useRecoilValue(currentUserState);

  useEffect(() => {
    setHiringProcessList(handleInitialPiple(stage));
    getComments(id);
  }, []);

  // custom hooks and states
  const {
    getComments,
    handleCreateComment,
    commentsList,
    handleInitialPiple,
    hiringProcessList,
    setHiringProcessList,
    handleStage,
  } = actionHandler();

  // assignee details
  const detailsData = [
    { title: "Source", value: "Career Website" },
    { title: "Owner", value: `${userData?.firstName} ${userData?.lastName}`, image: userData?.avatar ?? "avatar" },
    { title: "Internship Type", value: internType.replace("_", " ").toLowerCase() },
    { title: "Applied Date", value: dayjs(createdAt).format("DD/MM/YYYY") },
    {
      title: "Assignee",
      userData: [
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
      ],
    },
  ];

  // resend offer letter
  const handleResendOfferLetter = () => {
    Notifications({ title: "Success", description: "Offer letter re-sent successfully", type: "success" });
  };

  // resend contract
  const handleResendContract = () => {
    Notifications({ title: "Success", description: "Contract re-sent successfully", type: "success" });
  };

  // check already processed
  const handleCheckList = (text: string) => {
    !hiringProcessList.includes(text) && setHiringProcessList([...hiringProcessList, text]);
  };

  // logic for interviewed
  const handleInterviewed = () => {
    handleStage(id, "interviewed");
    return handleCheckList("interviewed");
  };

  // logic for recommended
  const handleRecomended = () => {
    handleStage(id, "recommended");
    return handleCheckList("recommended");
  };

  // logic for offer letter
  const HandleOfferLetter = () => {
    if (!hiringProcessList.includes("offer letter")) {
      setIsSelectTemplateModal(true);
      setSelectTemplate({ title: "offer letter", options: ["offer letter template 1"] });
    }
    return;
  };

  // logic for contract
  const HandleContract = () => {
    if (!hiringProcessList.includes("contract") && hiringBtnText !== "Initiate Contract") {
      setOfferContractStatus({ ...offerContractStatus, signed: true, pending: false });
      return setHiringBtnText("Initiate Contract");
    }
    if (hiringBtnText === "Initiate Contract") {
      setSelectTemplate({ title: "Contract", options: ["contract template 1"] });
      setIsSelectTemplateModal(true);
    }
    return;
  };

  // logic for hired
  const handleHired = () => {
    setOfferContractStatus({ ...offerContractStatus, signed: true, pending: false });
    setHiringProcessStatusList(hiringProcessStatusList?.filter((item) => item?.title !== "rejected"));
    return handleCheckList("hired");
  };
  // logic for rejected
  const handleRejected = () => {
    let list = hiringProcessStatusList?.filter((item) => item?.title !== "hired");
    !list.some(({ title }) => title === "rejected") &&
      list.push({
        title: "rejected",
        value: "0",
        color: "#D83A52",
      });
    setHiringProcessStatusList(list);
    setHiringProcessList(list.map(({ title }) => title));
    setOpen(false);
    return;
  };
  // move hiring process in flow
  const handleHiringProcess = (pipeline?: string) => {
    // resend offer letter and contract
    if (!pipeline && hiringBtnText === "Resend") {
      if (hiringProcessList?.includes("contract")) {
        handleResendContract();
      } else {
        handleResendOfferLetter();
      }
      return;
    }
    // pipline clicked flow
    if (pipeline) {
      pipeline === "interviewed" && hiringProcessList?.includes("applied") && handleInterviewed();
      pipeline === "recommended" && hiringProcessList?.includes("interviewed") && handleRecomended();
      pipeline === "offer letter" && hiringProcessList?.includes("recommended") && HandleOfferLetter();
      pipeline === "contract" && hiringProcessList?.includes("offer letter") && HandleContract();
      pipeline === "hired" && hiringProcessList?.includes("contract") && handleHired();
      pipeline === "rejected" && hiringProcessList?.includes("hired") && handleRejected();
    } else {
      // move button flow
      switch (hiringProcessList[hiringProcessList.length - 1]) {
        case "applied":
          return handleInterviewed();
        case "interviewed":
          return handleRecomended();
        case "recommended":
          return HandleOfferLetter();
        case "offer letter":
          return HandleContract();
        case "contract":
          return handleHired();
        case "hired":
          return handleRejected();
        default:
          break;
      }
    }
  };
  //select template for offer letter and contract
  const handleTemplate = () => {
    setIsOfferLetterTemplateModal(true);
    setIsSelectTemplateModal(false);
  };
  // constomized or edit template for offer letter and contract
  const handleOfferLetterTemplate = () => {
    if (selectTemplate?.title === "offer letter") {
      handleCheckList("offer letter");
      Notifications({ title: "Success", description: "Offer letter sent successfully", type: "success" });
      setOfferContractStatus({ ...offerContractStatus, pending: true });
    }
    if (selectTemplate?.title === "Contract") {
      handleCheckList("contract");
      Notifications({ title: "Success", description: "Contract sent successfully", type: "success" });
      setOfferContractStatus({ ...offerContractStatus, signed: false, pending: true });
    }
    setIsOfferLetterTemplateModal(false);
    setHiringBtnText("Resend");
  };

  return (
    <div className="hiring-wrapper">
      <div className="hiring flex flex-wrap justify-between items-center mt-5">
        <div className="flex items-center gap-5">
          <p className="heading ">{internshipTitle}</p>
          {offerContractStatus?.pending && (
            <p className="text-sm text-white capitalize yellow-bg px-[10px] py-[2px] rounded-lg">pending</p>
          )}
          {offerContractStatus?.signed && (
            <p className="text-sm text-white capitalize text-success-bg-color px-[10px] py-[2px] rounded-lg">signed</p>
          )}
        </div>
        {!hiringProcessList?.includes("rejected") && (
          <div className="rej-mov gap-2 flex">
            <button onClick={() => setOpen(true)} className="rej-btn cursor-pointer">
              Reject
            </button>
            <RejectModal setOpen={setOpen} open={open} handleReject={handleRejected} />
            {!hiringProcessList?.includes("hired") && (
              <button className="move-btn cursor-pointer" onClick={() => handleHiringProcess()}>
                {hiringBtnText}
              </button>
            )}
          </div>
        )}
      </div>

      <div className="pipeline mt-10">
        <HiringPipeline
          hiringList={hiringProcessList}
          handleHiringProcess={handleHiringProcess}
          hiringProcessStatusList={hiringProcessStatusList}
        />
      </div>

      <div className="details mt-7 ">
        <div className="heading">
          <p>Details</p>
        </div>
        <div className="mt-3">
          <Row gutter={[30, 35]}>
            {detailsData.map((item: any) => (
              <Col xl={8} lg={8} md={8} sm={12} xs={24}>
                <div className="asignee-wrap">
                  <h2 className="m-0 font-medium text-base title">{item.title}</h2>
                  {item.title === "Assignee" ? (
                    <DropDownNew
                      placement={"bottomRight"}
                      items={[
                        { label: <SearchBar handleChange={() => {}} />, key: "search" },
                        {
                          label: (
                            <div>
                              {item.userData.map((users: any) => (
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
                          <img src={user.userImg} />
                          <p>{user.userName}</p>
                        </div>
                        <ArrowDownDark />
                      </div>
                    </DropDownNew>
                  ) : (
                    <div className={`flex ${item.title === "Owner" ? "gap-2" : ""}`}>
                      {item.image && (
                        <Avatar
                          className="h-[32px] w-[32px] rounded-full object-cover relative"
                          src={userData?.avatar}
                          alt={userData?.firstName}
                          icon={
                            <span className="uppercase text-base leading-[16px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                              {userData?.firstName[0]}
                              {userData?.lastName[0]}
                            </span>
                          }
                        />
                      )}
                      <p className="m-0 capitalize">{item.value}</p>
                    </div>
                  )}
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      <div className="cmnt-wrapper mt-8">
        <p className="heading">Comments</p>
      </div>

      <div className="Comments flex justify-between mt-6">
        <div className="icon ">
          <Avatar
            className="h-[48px] w-[48px] rounded-full object-cover relative"
            src={avatar}
            alt={firstName}
            icon={
              <span className="uppercase text-[18px] leading-[22px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                {firstName[0]}
                {lastName[0]}
              </span>
            }
          />
        </div>

        <div className="Input">
          <Input
            className="ant-inp"
            value={comment}
            onChange={(e) => setComment(e?.target?.value)}
            placeholder="Write anything here..."
          ></Input>
        </div>

        <button className="btn-icon" onClick={() => handleCreateComment(id, comment)}>
          <img src={BtnIcon} alt="btn-icon" />
        </button>
      </div>
      <div className="comments-list">
        {commentsList.length > 0 ? (
          commentsList?.map(({ commentedByUser, createdAt, comment }: any) => (
            <div className="avatar flex items-center gap-3 mt-6">
              <Avatar
                className="h-[48px] w-[48px] rounded-full object-cover relative"
                src={commentedByUser?.avatar}
                alt={commentedByUser?.firstName}
                icon={
                  <span className="uppercase text-[18px] leading-[22px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                    {commentedByUser?.firstName[0]}
                    {commentedByUser?.lastName[0]}
                  </span>
                }
              />
              <div className="text">
                <div className="flex gap-3">
                  <p className="font-medium">{`${commentedByUser?.firstName} ${commentedByUser?.lastName}`}</p>
                  <p className="mt-1 txt-p">
                    {dayjs(createdAt).format(`HH.mm`)} <Dot /> {dayjs(createdAt).format(`DD MMM YYYY`)}
                  </p>
                </div>
                <p>{comment}</p>
              </div>
              <div></div>
            </div>
          ))
        ) : (
          <div className="p-1">
            <NoDataFound />
          </div>
        )}
      </div>

      {/* modals */}
      <SelectTemplateModal
        open={isSelectTemplateModal}
        setOpen={setIsSelectTemplateModal}
        handleTemplate={handleTemplate}
        title={selectTemplate.title}
        options={selectTemplate.options}
      />
      <OfferLetterTemplateModal
        open={isOfferLetterTemplateModal}
        setOpen={setIsOfferLetterTemplateModal}
        handleOfferLetterTemplate={handleOfferLetterTemplate}
      />
    </div>
  );
};

export default HiringProcess;
