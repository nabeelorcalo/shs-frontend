import { useState } from "react";
import { Col, Row } from "antd/es/grid";
import { Input } from "antd";
import HiringPipeline from "../../components/HiringPIpeline/hiringPipeline";
import DocAvatar from "../../assets/images/doc-avatar.png";
import BtnIcon from "../../assets/images/Button-icon.png";
import RejectModal from "./RejectModal";
import DropDownNew from "../../components/Dropdown/DropDownNew";
import { ArrowDownDark, UserAvatar } from "../../assets/images";
import { Notifications, SearchBar } from "../../components";
import OfferLetterTemplateModal from "./OfferLetterTemplateModal";
import SelectTemplateModal from "./selectTemplateModal";

const detailsData = [
  { title: "Source", value: "Career Website" },
  { title: "Owner", value: "David Miler", image: DocAvatar },
  { title: "Internship Type", value: "Paid" },
  { title: "Applied Date", value: "04/12/1996" },
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

const hiringList = [
  {
    title: "applied",
    value: "0",
    color: "#363565",
  },
  {
    title: "interviewed",
    value: "0",
    color: "#D2D6DC",
  },
  {
    title: "recommended",
    value: "0",
    color: "#D2D6DC",
  },
  {
    title: "offer letter",
    value: "0",
    color: "#D2D6DC",
  },
  {
    title: "contract",
    value: "0",
    color: "#D2D6DC",
  },
  {
    title: "hired",
    value: "0",
    color: "#D2D6DC",
  },
];

const HiringProcess = () => {
  const [open, setOpen] = useState(false);
  const [hiringProcessStatusList, setHiringProcessStatusList] = useState(hiringList);
  const [isSelectTemplateModal, setIsSelectTemplateModal] = useState(false);
  const [offerContractStatus, setOfferContractStatus] = useState({ pending: false, signed: false });
  const [isOfferLetterTemplateModal, setIsOfferLetterTemplateModal] = useState(false);
  const [selectTemplate, setSelectTemplate] = useState({ title: "Offer Letter", options: ["offer template 1"] });
  const [user, setUser] = useState({ userImg: UserAvatar, userName: "amelia clark" });
  const [hiringBtnText, setHiringBtnText] = useState("Move");
  const [hiringProcessList, setHiringProcessList] = useState(["applied"]);

  const handleResendOfferLetter = () => {
    Notifications({ title: "Success", description: "Offer letter and re-sent", type: "success" });
  };

  const handleResendContract = () => {
    Notifications({ title: "Success", description: "Contract and re-sent", type: "success" });
  };

  // check already processed
  const handleCheckList = (text: string) => {
    !hiringProcessList.includes(text) && setHiringProcessList([...hiringProcessList, text]);
  };

  // logic for interviewed
  const handleInterviewed = () => {
    return handleCheckList("interviewed");
  };

  // logic for recommended
  const handleRecomended = () => {
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

  const handleTemplate = () => {
    setIsOfferLetterTemplateModal(true);
    setIsSelectTemplateModal(false);
  };

  const handleOfferLetterTemplate = () => {
    if (selectTemplate?.title === "offer letter") {
      handleCheckList("offer letter");
      Notifications({ title: "Success", description: "Offer letter signed and sent", type: "success" });
      setOfferContractStatus({ ...offerContractStatus, pending: true });
    }
    if (selectTemplate?.title === "Contract") {
      handleCheckList("contract");
      Notifications({ title: "Success", description: "Contract signed and sent", type: "success" });
      setOfferContractStatus({ ...offerContractStatus, signed: false, pending: true });
    }
    setIsOfferLetterTemplateModal(false);
    setHiringBtnText("Resend");
  };

  return (
    <div className="hiring-wrapper">
      <div className="hiring flex flex-wrap justify-between items-center mt-5">
        <div className="flex items-center gap-5">
          <p className="heading ">UI UX Designer</p>
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
              <button className="move-btn" onClick={() => handleHiringProcess()}>
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
                      {item.image && <img src={item.image} alt="" />}
                      <p className="m-0">{item.value}</p>
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
          <img className="h-[48px] w-[48px]" src={DocAvatar} alt="icon" />
        </div>

        <div className="Input">
          <Input className="ant-inp" placeholder="Write anything here..."></Input>
        </div>

        <button className="btn-icon">
          <img src={BtnIcon} alt="btn-icon" />
        </button>
      </div>

      <div className="avatar flex items-center gap-3 mt-6">
        <img src={DocAvatar} alt="doc-avatar" />
        <div className="text">
          <div className="flex gap-3">
            <p className="font-medium">Albert John</p>
            <p className="mt-1 txt-p">15.45 . 10 Nov 2022</p>
          </div>
          <p>I have interviewed the candidate and I recommend her to be added as part of design team.</p>
        </div>
        <div></div>
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
