import { FC, useEffect, useRef } from "react";
import HiringPipeline from "../../components/HiringPIpeline/hiringPipeline";
import {
  CandidateDetails,
  CommentList,
  CreateComment,
  HiringProcessFlow,
  OfferLetterTemplateModal,
  RejectModal,
} from "../../components";
// import OfferLetterTemplateModal from "./OfferLetterTemplateModal";
import SelectTemplateModal from "./selectTemplateModal";
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
    companyManagerList = [],
    getCompanyManagerList,
    comment,
    setComment,
    handleRejectCandidate,
    getTemplates,
    templateList,
    handleHiringProcess,
    handleSelectAssignee,
    handleTemplate,
    handleOfferLetterTemplate,
    handleRejected,
    setHiringProcessStatusList,
    hiringProcessStatusList,
    setAssignee,
    setHiringBtnText,
    setOfferContractStatus,
    offerContractStatus,
    setOpen,
    open,
    hiringBtnText,
    assignee,
    isSelectTemplateModal,
    setIsSelectTemplateModal,
    selectTemplate,
    selecteTemplate,
    setSelecteTemplate,
    isOfferLetterTemplateModal,
    setIsOfferLetterTemplateModal,
    setTemplateValues,
    templateValues,
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
      ["offerLetter", "contract"].includes(selectedCandidate?.stage) && setHiringBtnText("Resend");
      setOfferContractStatus("pending");
    } else {
      // variables fir check offerLetter and contract
      const offerCheck = selectedCandidate?.letters?.find((obj: any) => "OFFER_LETTER" === obj?.type);
      const contractCheck = selectedCandidate?.letters?.find((obj: any) => "CONTRACT" === obj?.type);

      if (contractCheck && contractCheck?.status?.toLowerCase() === "signed") {
        setHiringBtnText("Move");
        setOfferContractStatus(contractCheck?.status);
        return;
      } else {
        setOfferContractStatus(contractCheck?.status);
      }

      if (!contractCheck && offerCheck && offerCheck?.status?.toLowerCase() === "signed") {
        setHiringBtnText("Initiate Contract");
        setOfferContractStatus(offerCheck?.status);
        return;
      } else {
        return setOfferContractStatus(offerCheck?.status);
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

  return (
    <div className="hiring-wrapper">
      <HiringProcessFlow
        internshipTitle={internshipTitle}
        offerContractStatus={offerContractStatus?.toLocaleLowerCase()}
        hiringProcessList={hiringProcessList}
        setOpen={setOpen}
        handleHiringProcess={handleHiringProcess}
        hiringBtnText={hiringBtnText}
      />

      <div className="pipeline mt-10">
        <HiringPipeline
          hiringList={hiringProcessList}
          handleHiringProcess={handleHiringProcess}
          hiringProcessStatusList={hiringProcessStatusList}
        />
      </div>

      <CandidateDetails
        detailsData={detailsData}
        getCompanyManagerList={getCompanyManagerList}
        companyManagerList={companyManagerList}
        handleSelectAssignee={handleSelectAssignee}
        assignee={assignee}
        userData={userData}
      />
      <div className="cmnt-wrapper mt-8">
        <p className="heading">Comments</p>
      </div>
      <CreateComment
        userData={userData}
        comment={comment}
        setComment={setComment}
        handleCreateComment={handleCreateComment}
        id={id}
      />
      <CommentList commentsList={commentsList} />

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
          getTemplates={getTemplates}
          templateList={templateList}
          selectedCandidate={selectedCandidate}
        />
      )}
    </div>
  );
};

export default HiringProcess;
