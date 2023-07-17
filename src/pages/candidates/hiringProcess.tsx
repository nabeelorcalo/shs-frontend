import { FC, useEffect, useRef, useState } from "react";
import { Col, Row, Avatar,Input } from "antd";
import HiringPipeline from "../../components/HiringPIpeline/hiringPipeline";
import RejectModal from "./RejectModal";
import DropDownNew from "../../components/Dropdown/DropDownNew";
import { ArrowDownDark, Dot,SendBtn } from "../../assets/images";
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
    selectedCandidate: {
      id,
      userId,
      internship: { title: internshipTitle, internType },
      stage,
      createdAt,
    },
  } = props;
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);
  const [open, setOpen] = useState(false);
  const [hiringProcessStatusList, setHiringProcessStatusList] = useState(hiringList);
  const [isSelectTemplateModal, setIsSelectTemplateModal] = useState(false);
  const [offerContractStatus, setOfferContractStatus] = useState({ pending: false, signed: false });
  const [isOfferLetterTemplateModal, setIsOfferLetterTemplateModal] = useState(false);
  const [selectTemplate, setSelectTemplate] = useState({ title: "offerLetter", options: [] });
  const [assignee, setAssignee] = useState<any>();
  const [hiringBtnText, setHiringBtnText] = useState("Move");
  const [templateValues, setTemplateValues] = useState({ subject: "", content: "", templateId: "", type: "" });
  const [selecteTemplate, setSelecteTemplate] = useState();

  // logged in user data
  const userData = useRecoilValue(currentUserState);
  // custom hooks and states
  const {
    getComments,
    handleCreateComment,
    commentsList,
    handleInitialPiple,
    hiringProcessList,
    setHiringProcessList,
    handleStage,
    companyManagerList = [],
    getCompanyManagerList,
    HandleAssignee,
    comment,
    setComment,
    handleRejectCandidate,
    handleSendOfferConract,
    resendOfferContract,
  } = actionHandler();

  useEffect(() => {
    if (shouldLoogged.current) {
      shouldLoogged.current = false;
      setHiringProcessList(handleInitialPiple(stage));
      getComments(id);
      getCompanyManagerList();
      stage === "rejected" &&
        setHiringProcessStatusList([
          ...hiringProcessStatusList?.filter((obj: any) => obj?.title !== "hired"),
          {
            title: "rejected",
            value: "0",
            color: "#D83A52",
          },
        ]);
    }
    // set assignee manager if already assigned
    selectedCandidate?.manager?.companyManager && setAssignee(selectedCandidate?.manager?.companyManager);

    // set offerLetter, contract status and hiring process btn text
    if (selectedCandidate?.letters?.some((obj: any) => ["new", "pending"].includes(obj?.status.toLowerCase()))) {
      setHiringBtnText("Resend");
      setOfferContractStatus({ pending: true, signed: false });
    } else {
      // variables fir check offerLetter and contract
      const offerCheck = selectedCandidate?.letters?.find((obj: any) => "OFFER_LETTER" === obj?.type);
      const contractCheck = selectedCandidate?.letters?.find((obj: any) => "CONTRACT" === obj?.type);
      if (offerCheck && offerCheck?.status?.toLowerCase() === "signed") {
        setHiringBtnText("Initiate Contract");
        setOfferContractStatus({ pending: false, signed: true });
        return;
      }
      if (contractCheck && contractCheck?.status?.toLowerCase() === "signed") {
        setHiringBtnText("Move");
        setOfferContractStatus({ pending: false, signed: true });
        return;
      }
    }
  }, []);

  // assignee details
  const detailsData = [
    { title: "Source", value: "Career Website" },
    { title: "Owner", value: `${userData?.firstName} ${userData?.lastName}`, image: userData?.avatar ?? "avatar" },
    { title: "Internship Type", value: internType ? internType?.replace("_", " ")?.toLowerCase() : "" },
    { title: "Applied Date", value: dayjs(createdAt).format("DD/MM/YYYY") },
    {
      title: "Assignee",
      userData: companyManagerList,
    },
  ];

  // resend offerLetter
  const handleResendOfferLetter = () => {
    const offerLetter = selectedCandidate?.letters?.find((obj: any) => obj?.type === "OFFER_LETTER");
    resendOfferContract(offerLetter?.id);
    Notifications({ title: "Success", description: "offerLetter re-sent successfully", type: "success" });
  };

  // resend contract
  const handleResendContract = () => {
    const conttract = selectedCandidate?.letters?.find((obj: any) => obj?.type === "CONTRACT");
    resendOfferContract(conttract?.id);
    Notifications({ title: "Success", description: "Contract re-sent successfully", type: "success" });
  };

  // check already processed
  const handleCheckList = (text: string) => {
    !hiringProcessList.includes(text) && setHiringProcessList([...hiringProcessList, text]);
  };

  // logic for interviewed
  const handleInterviewed = () => {
    handleStage(id, { stage: "interviewed" });
    return handleCheckList("interviewed");
  };

  // logic for recommended
  const handleRecomended = () => {
    handleStage(id, { stage: "recommended" });
    return handleCheckList("recommended");
  };

  // logic for offerLetter
  const HandleOfferLetter = () => {
    if (!hiringProcessList.includes("offerLetter")) {
      setIsSelectTemplateModal(true);
      setSelectTemplate({ title: "offerLetter", options: [] });
    }
    return;
  };
  // check for offerLetter signed
  const isOfferContractPending = selectedCandidate?.letters?.some((obj: any) =>
    ["new", "pending"].includes(obj?.status.toLowerCase())
  );
  // logic for contract
  const HandleContract = () => {
    const hasOfferLetter = selectedCandidate?.letters?.some((obj: any) => obj?.type === "OFFER_LETTER");
    if (!isOfferContractPending && hasOfferLetter) {
      if (!hiringProcessList.includes("contract") && hiringBtnText !== "Initiate Contract") {
        setOfferContractStatus({ ...offerContractStatus, signed: true, pending: false });
        return setHiringBtnText("Initiate Contract");
      }
      if (hiringBtnText === "Initiate Contract") {
        setSelectTemplate({ title: "Contract", options: [] });
        setIsSelectTemplateModal(true);
      }
    } else {
      Notifications({
        title: "Restriction",
        description: "Can't Intiate Contract before offerLetter signed",
        type: "error",
      });
    }
    return;
  };

  // logic for hired
  const handleHired = () => {
    const hasContract = selectedCandidate?.letters?.some((obj: any) => obj?.type === "CONTRACT");
    if (!isOfferContractPending && hasContract) {
      setOfferContractStatus({ ...offerContractStatus, signed: true, pending: false });
      setHiringProcessStatusList(hiringProcessStatusList?.filter((item) => item?.title !== "rejected"));
      id && handleStage(id, { stage: "hired", userId });
      return handleCheckList("hired");
    } else {
      Notifications({ title: "Restriction", description: "Can't hire before contract signed", type: "error" });
    }
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
    // resend offerLetter and contract
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
      pipeline === "offerLetter" && hiringProcessList?.includes("recommended") && HandleOfferLetter();
      pipeline === "contract" && hiringProcessList?.includes("offerLetter") && HandleContract();
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
        case "offerLetter":
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
  //select template for offerLetter and contract
  const handleTemplate = () => {
    if (templateValues?.subject !== "" && templateValues?.content !== "") {
      setIsOfferLetterTemplateModal(true);
      setIsSelectTemplateModal(false);
    } else {
      Notifications({ title: "Error", description: "Please select Template", type: "error" });
    }
  };
  // constomized or edit template for offerLetter and contract
  const handleOfferLetterTemplate = () => {
    handleSendOfferConract({ ...templateValues, internId: id }, userId);
    if (selectTemplate?.title === "offerLetter") {
      handleCheckList("offerLetter");
      setOfferContractStatus({ ...offerContractStatus, pending: true });
    }
    if (selectTemplate?.title === "Contract") {
      handleCheckList("contract");
      setOfferContractStatus({ ...offerContractStatus, signed: false, pending: true });
    }
    setIsOfferLetterTemplateModal(false);
    setHiringBtnText("Resend");
    setTemplateValues({ subject: "", content: "", templateId: "", type: "" });
  };
  // select assignee
  const handleSelectAssignee = (item: any) => {
    if (selectedCandidate?.stage === "hired") {
      HandleAssignee(id, item?.id).then(() => setAssignee(item?.companyManager));
    } else {
      Notifications({
        title: "Restriction",
        description: "Can't Assign manager before hiring candidate",
        type: "error",
      });
    }
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
          <div className="gap-2 flex">
            <button onClick={() => setOpen(true)} className="rej-btn cursor-pointer">
              Reject
            </button>
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
            {detailsData?.map((item: any) => (
              <Col xl={8} lg={8} md={8} sm={12} xs={24}>
                <div className="asignee-wrap">
                  <h2 className="m-0 font-medium text-base title">{item.title}</h2>
                  {item.title === "Assignee" ? (
                    <DropDownNew
                      placement={"bottomRight"}
                      value={""}
                      items={[
                        { label: <SearchBar handleChange={getCompanyManagerList?.companyManager} />, key: "search" },
                        {
                          label: (
                            <div className="max-h-[200px] overflow-y-scroll">
                              {companyManagerList?.map((item: any) => (
                                <div
                                  key={item?.companyManager?.id}
                                  className="flex justify-between mb-4"
                                  onClick={() => handleSelectAssignee(item)}
                                >
                                  <div className="flex">
                                    <div className="mr-2">
                                      <Avatar
                                        className="h-[32px] w-[32px] rounded-full object-cover relative"
                                        src={item?.companyManager?.avatar}
                                        alt={item?.companyManager?.firstName}
                                        icon={
                                          <span className="uppercase text-sm leading-[16px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                                            {item?.companyManager?.firstName[0]}
                                            {item?.companyManager?.lastName[0]}
                                          </span>
                                        }
                                      />
                                    </div>
                                    <div>{`${item?.companyManager?.firstName} ${item?.companyManager?.lastName}`}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ),
                          key: "users",
                        },
                      ]}
                    >
                      <div className="drop-down-with-imgs flex items-center gap-3 h-12">
                        {assignee ? (
                          <div className="flex items-center gap-3 mr-[40px]">
                            <Avatar
                              className="h-[32px] w-[32px] rounded-full object-cover relative"
                              src={assignee?.avatar}
                              alt={assignee?.firstName}
                              icon={
                                <span className="uppercase text-sm leading-[16px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                                  {assignee?.firstName[0]}
                                  {assignee?.lastName[0]}
                                </span>
                              }
                            />
                            <p>{`${assignee?.firstName} ${assignee?.lastName}`}</p>
                          </div>
                        ) : (
                          <p>Select</p>
                        )}
                        <ArrowDownDark />
                      </div>
                    </DropDownNew>
                  ) : (
                    <div className={`flex ${item.title === "Owner" ? "gap-2" : ""}`}>
                      {item?.image ? (
                        <div className="flex items-center gap-2">
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
                          <p className="m-0 capitalize">{item.value}</p>
                        </div>
                      ) : (
                        <p className="capitalize">{item?.value}</p>
                      )}
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
            src={userData?.avatar}
            alt={userData?.firstName}
            icon={
              <span className="uppercase text-[18px] leading-[22px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                {userData?.firstName[0]}
                {userData?.lastName[0]}
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

        <button className="btn-icon cursor-pointer" onClick={() => handleCreateComment(id, comment)}>
          <SendBtn/>
          {/* <img src={} alt="btn-icon" /> */}
        </button>
      </div>
      <div className="comments-list">
        {commentsList?.length > 0 ? (
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
      {isSelectTemplateModal && (
        <SelectTemplateModal
          open={isSelectTemplateModal}
          setOpen={setIsSelectTemplateModal}
          handleTemplate={handleTemplate}
          title={selectTemplate?.title}
          selecteTemplate={selecteTemplate}
          setSelecteTemplate={setSelecteTemplate}
          setTemplateValues={setTemplateValues}
        />
      )}
      {isOfferLetterTemplateModal && (
        <OfferLetterTemplateModal
          open={isOfferLetterTemplateModal}
          setOpen={setIsOfferLetterTemplateModal}
          handleOfferLetterTemplate={handleOfferLetterTemplate}
          setTemplateValues={setTemplateValues}
          templateValues={templateValues}
          selectedCandidate={selectedCandidate}
        />
      )}

      {open && (
        <RejectModal
          setOpen={setOpen}
          open={open}
          handleReject={handleRejected}
          handleRejectCandidate={handleRejectCandidate}
        />
      )}
    </div>
  );
};

export default HiringProcess;
