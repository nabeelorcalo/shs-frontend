import { useEffect, useRef } from "react";
import { BoxWrapper, Breadcrumb, Loader } from "../../../../components";
import { Divider, Button, Typography, Form } from "antd";
import { DownloadIconLeave, Emoji1st, Emoji3rd, Emoji4th } from "../../../../assets/images";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../../../config/constants";
import useCustomHook from "../../actionHandler";
import ManagerRemarks from "./manageRemarksforUni";
import "./style.scss";
import dayjs from "dayjs";

const index = () => {
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);
  const {
    getSelectedAsseessmentReport,
    selectedAsseessmentReport,
    getParamId,
    checkForImage,
    downloadPdfOrCsv,
    isLoading,
    assessmentDataFormatter
  } = useCustomHook();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const breadcrumbArray = [
    { name: "Assessment Form" },
    { name: "Case Studies", onClickNavigateTo: `/${ROUTES_CONSTANTS.REPORT_VIEW_DETAILS}` },
  ];
  useEffect(() => {
    if (shouldLoogged.current) {
      shouldLoogged.current = false;
      getSelectedAsseessmentReport(getParamId(pathname));
    }
  }, []);
  const [form] = Form.useForm();
  // pdf download and view assessment report
  const [assessmenTitle, assessmentDate, assessmentDataColumn, assessmentData] = assessmentDataFormatter(selectedAsseessmentReport)

  const intern = selectedAsseessmentReport?.intern?.userDetail;
  const manager = selectedAsseessmentReport?.remarked;
  return (
    <div className="company-admin-assessment-form">
      <Breadcrumb breadCrumbData={breadcrumbArray} />
      <Divider />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="scroll ">
          <BoxWrapper className="my-5 destop-view">
            <div className="flex justify-between">
              <Typography className="md:text-3xl font-medium primary-color">{assessmenTitle} - {dayjs(assessmentDate).format("MMMM YYYY")}</Typography>

              <div
                className="mr-[-5px] drop-down-wrapper"
                onClick={() => {
                  downloadPdfOrCsv("pdf", assessmentDataColumn, assessmentData, `${assessmenTitle} - ${dayjs(assessmentDate).format("MMMM YYYY")}`, false);
                }}
              >
                <DownloadIconLeave />
              </div>
            </div>
            <div className="mt-5 flex gap-10">
              <span className="font-semibold text-xl lg:w-[200px]">Learning Categories</span>
              <span className="font-semibold text-xl lg:w-[400px]">Learning Objectives</span>
              <span className="font-semibold text-xl lg:w-[400px]">Evidence of Progress</span>
              <span className="font-semibold text-xl lg:w-[400px]">Manager’s Remarks</span>
            </div>
            <Divider />
            {assessmentData?.map((item: any) => {
              return (
                <div key={item?.id} className="mt-5 flex gap-10">
                  <span className="text-base font-normal lg:w-[200px]">{item?.learningCategories}</span>
                  <span className="text-base font-normal lg:w-[400px]">{item?.learningObjectives}</span>
                  <span className="text-base font-normal lg:w-[400px]">{item?.evidenceOfProgress}</span>
                  <ManagerRemarks
                    image={
                      item?.managerRemarks === "Does not meet expectations" ? (
                        <Emoji1st />
                      ) : item?.managerRemarks === "Meets expectations" ? (
                        <Emoji3rd />
                      ) : (
                        <Emoji4th />
                      )
                    }
                    managerRemarks={item?.managerRemarks}
                  />
                </div>
              );
            })}
            <Form layout="vertical" form={form}>
              <Typography className="text-xl font-semibold my-1">Feedback </Typography>
              <Typography className="font-normal text-base my-1">
                {selectedAsseessmentReport?.feedback ?? ""}
              </Typography>
              <div className="flex gap-10">
                <div className="w-full">
                  <Typography className="text-xl font-semibold mt-5 capitalize">{`${intern?.firstName} ${intern?.lastName}`}</Typography>
                  <div className="sign-box w-full rounded-lg flex justify-center items-center">
                    {checkForImage(selectedAsseessmentReport?.internSig) ? (
                      <div className="w-[90%] relative flex items-center justify-center min-h-[120px]">
                        <img
                          className="absolute w-full h-full overflow-hidden"
                          src={selectedAsseessmentReport?.internSig}
                        />
                      </div>
                    ) : (
                      <p>{selectedAsseessmentReport?.internSig}</p>
                    )}
                  </div>
                </div>
                <div className="w-full">
                  <Typography className="text-xl font-semibold mt-5 capitalize">{`${manager?.firstName} ${manager?.lastName}`}</Typography>
                  <div className="sign-box w-full rounded-lg flex justify-center items-center">
                    {checkForImage(selectedAsseessmentReport?.supervisorSig) ? (
                      <div className="w-[90%] relative flex items-center justify-center min-h-[120px]">
                        <img
                          className="absolute w-full h-full overflow-hidden"
                          src={selectedAsseessmentReport?.supervisorSig}
                        />
                      </div>
                    ) : (
                      <p>{selectedAsseessmentReport?.supervisorSig}</p>
                    )}
                  </div>
                </div>
              </div>
            </Form>
            <div className="flex justify-end gap-5 my-5 assessment-footer">
              <Button onClick={() => navigate(-2)} type="primary" className="white-bg-color teriary-color save-btn">
                Back
              </Button>
            </div>
          </BoxWrapper>
        </div>
      )}
    </div>
  );
};

export default index;
