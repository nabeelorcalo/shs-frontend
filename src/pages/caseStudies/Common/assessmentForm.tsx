import { useEffect, useRef, useState } from "react";
import { Alert, BoxWrapper, Breadcrumb, ButtonThemePrimary, ButtonThemeSecondary, Loader, SignatureAndUploadModal } from "../../../components";
import { Divider, Button, Typography, Form, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES_CONSTANTS, STATUS_CONSTANTS } from "../../../config/constants";
import ManagerRemarks from "./managerRemarks";
import useCustomHook from "../actionHandler";
import "./style.scss";
import dayjs from "dayjs";
import { Emoji3rd } from "../../../assets/images";
import { checkForImage } from "../../../helpers";
const { TextArea } = Input;

const AssessmentFormCaseStudies = () => {
  const [openWarningModal, setOpenWarningModal] = useState(false);

  const {
    getSelectedCasStudyData,
    getParamId,
    selectedCasStudyData,
    HandleCleare,
    handleSignature,
    feedbackFormData,
    setfeedbackFormData,
    openModal,
    setOpenModal,
    handleManagerSignature,
    isLoading,
    getSignPadValue,
    signature,
    handleUploadFile,
    handleTextSignature,
    files,
    setFiles,
    learningCategories
  } = useCustomHook();

  // for cleanup re-rendering
  const shouldLoogged = useRef(true);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (shouldLoogged.current) {
      getSelectedCasStudyData(getParamId(pathname));
      shouldLoogged.current = false;
    }
  }, []);

  useEffect(() => {
    setfeedbackFormData({
      ...feedbackFormData,
      feedback: selectedCasStudyData?.feedback ?? "",
      supervisorSig: selectedCasStudyData?.supervisorSig ?? "",
      supervisorStatus: selectedCasStudyData?.supervisorStatus ?? "",
    });
  }, [selectedCasStudyData]);

  const rejectHandler = () => {
    handleSubmit("Rejected");
  };

  const breadcrumbArray = [
    { name: "Assessment Form" },
    { name: "Case Studies", onClickNavigateTo: `/${ROUTES_CONSTANTS.CASE_STUDIES}` },
  ];

  const [form] = Form.useForm();
  const tableData =
    selectedCasStudyData?.assessmentForm?.map((obj: any) => ({
      learningCategories: learningCategories[obj?.learningCategorie],
      learningObjectives: obj?.learningObjective,
      evidenceOfProgress: obj?.evidenceOfProgress,
      managerRemarks: obj?.supervisorRemarks,
      id: obj?.id,
    })) ?? [];
  const remarked = selectedCasStudyData?.remarked;
  const userDetail = selectedCasStudyData?.intern?.userDetail;

  const handleSubmit = (type: string) => {
    handleManagerSignature(selectedCasStudyData?.id, type);
    // navigate(`/${ROUTES_CONSTANTS.CASE_STUDIES}`);
  };

  const handleManagerRemarks = (id: number | string, supervisorRemarks: string) => {
    setfeedbackFormData({
      ...feedbackFormData,
      assessmentForm:
        feedbackFormData?.assessmentForm?.length > 0
          ? feedbackFormData?.assessmentForm?.map((item: any) => (item?.id === id ? { id, supervisorRemarks } : item))
          : [...feedbackFormData?.assessmentForm, { id, supervisorRemarks }],
    });
  };
  const managerStatus = selectedCasStudyData?.supervisorStatus?.toLowerCase();

  console.log("feedbackFormData", feedbackFormData);

  return (
    <div className="company-admin-assessment-form">
      <Breadcrumb breadCrumbData={breadcrumbArray} />
      <Divider />
      {/* for destop */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="scroll ">
          <BoxWrapper className="my-5 destop-view">
            <Typography className="md:text-3xl font-medium primary-color capitalize">{`${userDetail?.firstName} ${userDetail?.lastName
              } - ${dayjs(selectedCasStudyData?.createdAt).format("MMMM YYYY")}`}</Typography>
            <div className="mt-5 flex gap-10">
              <span className="font-semibold text-xl lg:w-[200px] text-primary-color font-[outfit]">
                Learning Categories
              </span>
              <span className="font-semibold text-xl lg:w-[400px] text-primary-color font-[outfit]">
                Learning Objectives
              </span>
              <span className="font-semibold text-xl lg:w-[400px] text-primary-color font-[outfit]">
                Evidence of Progress
              </span>
              <span className="font-semibold text-xl lg:w-[400px] text-primary-color font-[outfit]">
                Manager’s Remarks
              </span>
            </div>
            <Divider />
            {tableData.map((item: any, index: number) => {
              return (
                <div key={index} className="mt-5 flex gap-10">
                  <span className="text-base font-normal lg:w-[200px] font-[outfit]">
                    {item?.learningCategories || "N/A"}
                  </span>
                  <span className="text-base font-normal lg:w-[400px] font-[outfit]">
                    {item?.learningObjectives || "N/A"}
                  </span>
                  <span className="text-base font-normal lg:w-[400px] font-[outfit]">
                    {item?.evidenceOfProgress || "N/A"}
                  </span>
                  <div className="lg:w-[400px]">
                    {managerStatus === "approved" ? (
                      item?.managerRemarks ? (
                        <ManagerRemarks
                          image={<Emoji3rd />}
                          remarksStatus={selectedCasStudyData?.supervisorStatus}
                          id={item?.id}
                          managerRemarks={item?.managerRemarks}
                        />
                      ) : (
                        "N/A"
                      )
                    ) : (
                      <ManagerRemarks
                        managerRemarks={item?.managerRemarks}
                        id={item?.id}
                        handleManagerRemarks={handleManagerRemarks}
                      />
                    )}
                  </div>
                </div>
              );
            })}
            <Form layout="vertical" form={form}>
              {["approved", "rejected"].includes(managerStatus?.toLowerCase()) ? (
                <>
                  <Typography className="text-xl font-semibold my-1 mt-4">Feedback</Typography>
                  <span className="text-base font-normal lg:w-[400px] font-[outfit]">
                    {feedbackFormData?.feedback || "N/A"}
                  </span>
                </>
              ) : (
                <>
                  <Typography className={`text-xl font-semibold my-1 `}>
                    Feedback
                    <span className="form-title font-medium">(Optional)</span>
                  </Typography>

                  <TextArea
                    value={feedbackFormData?.feedback}
                    onChange={(e) => setfeedbackFormData({ ...feedbackFormData, feedback: e?.target?.value })}
                    rows={6}
                    placeholder="Type here..."
                  />
                </>
              )}

              <div className="flex gap-10">
                <div className="w-full">
                  <Typography className="text-xl font-semibold mt-5 capitalize">
                    {`${userDetail?.firstName} ${userDetail?.lastName}`}
                  </Typography>
                  <div className="sign-box w-full rounded-lg flex justify-center items-center">
                    <div className="w-[90%] relative flex items-center justify-center min-h-[120px]">
                      {selectedCasStudyData?.internSig ? (
                        checkForImage(selectedCasStudyData?.internSig) ? (
                          <img
                            className="absolute w-full h-full overflow-hidden object-scale-down	"
                            src={selectedCasStudyData?.internSig}
                          />
                        ) : (
                          <p>{selectedCasStudyData?.internSig}</p>
                        )
                      ) : (
                        "N/A"
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full relative">
                  <Typography className="text-xl font-semibold mt-5 capitalize">{`${remarked?.firstName} ${remarked?.lastName}`}</Typography>
                  <div className="sign-box w-full rounded-lg flex items-center justify-around">
                    {!feedbackFormData?.supervisorSig &&
                      !["approved", "rejected"].includes(managerStatus?.toLowerCase()) ? (
                      <span
                        onClick={() => {
                          setOpenModal(true);
                          HandleCleare();
                        }}
                        className="sign-btn cursor-pointer"
                      >
                        Click here to sign
                      </span>
                    ) : (
                      <div className="w-[90%] relative flex items-center justify-center min-h-[120px]">
                        {checkForImage(feedbackFormData?.supervisorSig) ||
                          feedbackFormData?.supervisorSig?.includes("base64") ? (
                          <img
                            className="absolute w-full h-full overflow-hidden object-scale-down	"
                            src={feedbackFormData?.supervisorSig}
                          />
                        ) : (
                          <p>{feedbackFormData?.supervisorSig || "N/A"}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Form>
            <div className="flex justify-end gap-5 my-5 assessment-footer">
              {["approved", "rejected"]?.includes(managerStatus) ? (
                <ButtonThemeSecondary
                  onClick={() => navigate(-1)}
                  className=""
                > Back</ButtonThemeSecondary>
              ) : (
                <>
                  <Button
                    onClick={() => setOpenWarningModal(true)}
                    type="primary"
                    className="text-error-bg-color white-color reject-btn font-semibold"
                  >
                    Reject
                  </Button>
                  <ButtonThemePrimary
                    // className="teriary-bg-color  white-color  finalise-btn font-semibold  "
                    onClick={() => handleSubmit("Approved")}
                  >
                    Finalise
                  </ButtonThemePrimary>
                </>
              )}
            </div>
          </BoxWrapper>
        </div>
      )}
      {openModal && (
        <SignatureAndUploadModal
          title="Signature"
          width={650}
          state={openModal}
          cancelBtntxt={() => {
            setOpenModal(false);
            HandleCleare();
          }}
          okBtntxt="Upload"
          closeFunc={() => {
            setOpenModal(false);
            HandleCleare();
          }}
          files={files}
          setFiles={setFiles}
          handleUploadFile={handleUploadFile}
          okBtnFunc={() => { }}
          getSignPadValue={getSignPadValue}
          handleTextSignature={handleTextSignature}
          HandleCleare={HandleCleare}
          signature={signature}
          footer={
            <>
              <Button
                onClick={() => {
                  HandleCleare();
                  setOpenModal(false);
                }}
                className="white-bg-color teriary-color font-semibold assessment-form-signature-modal-cancel-btn"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSignature}
                type="primary"
                className="white-color teriary-bg-color font-semibold assessment-form-signature-modal-sign-btn"
              >
                Sign
              </Button>
            </>
          }
        />
      )}
      {openWarningModal && (
        <Alert
          state={openWarningModal}
          setState={setOpenWarningModal}
          type={STATUS_CONSTANTS?.WARNING}
          okBtntxt="Continue"
          cancelBtntxt="Cancel"
          okBtnFunc={rejectHandler}
          children={<p>Are you sure you want to reject this case study?</p>}
        />
      )}
    </div>
  );
};

export default AssessmentFormCaseStudies;
