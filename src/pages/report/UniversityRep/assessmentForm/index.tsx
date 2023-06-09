import { useEffect, useRef, useState } from "react";
import { BoxWrapper, Breadcrumb, Loader, Notifications } from "../../../../components";
import { Divider, Button, Typography, Form, Spin } from "antd";
// import SignatureAndUploadModal from "../../../../components/SignatureAndUploadModal";
import { DownloadIconLeave, Emoji1st, Emoji3rd, Emoji4th } from "../../../../assets/images";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../../../config/constants";
import useCustomHook from "../../actionHandler";
// import useCustomHookforAssment from "./actionHandler";
import ManagerRemarks from "./manageRemarksforUni";
import "./style.scss";

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
  // const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();

  const tableData =
    selectedAsseessmentReport?.assessmentForm?.map((obj: any) => ({
      learningCategories: obj?.learningCategorie,
      learningObjectives: obj?.learningObjective,
      evidenceOfProgress: obj?.evidenceOfProgress,
      managerRemarks: obj?.supervisorRemarks,
      content: obj?.supervisorRemarks,
    })) ?? [];
  const TableColumn = ["Learning Categories", " Learning Objectives", "Evidence of Progress", "Manager's Remarks"];
  const intern = selectedAsseessmentReport?.intern?.userDetail;
  const manager = selectedAsseessmentReport?.remarked;
  // const action = useCustomHookforAssment();
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
            <div className="flex justify-between">
              <Typography className="md:text-3xl font-medium primary-color">Mino Marina - September 2022</Typography>

              <div
                className="mr-[-5px] drop-down-wrapper"
                onClick={() => {
                  downloadPdfOrCsv(event, TableColumn, tableData, "Mino Marina - September 2022 ");
                  Notifications({ title: "Success", description: "Assessment Form list downloaded ", type: "success" });
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
            {tableData?.map((item: any) => {
              return (
                <div className="mt-5 flex gap-10">
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
      {/* for mobile */}
      {/* <BoxWrapper className="block lg:hidden w-full p-3">
        <Typography className="text-xl md:text-3xl font-medium primary-color">Mino Marina - September 2022</Typography>
        {tableData.map((item: any) => {
          return (
            <div className="mt-5 flex flex-col xs:gap-2 sm:gap-5">
              <span className="xs:text-lg sm:text-xl font-medium text-center">{item.learningCategories}</span>
              <span className="text-base font-medium ">Learning Categories</span>
              <span className="text-xs font-normal ">{item.learningObjectives}</span>
              <span className="text-base font-medium ">Evidence of Progress </span>
              <span className="text-xs font-normal ">{item.evidenceOfProgress}</span>
              <span className="text-base font-medium ">Manager Remarks </span>
              <div className="flex flex-row justify-between ">
                <div className="w-full"> {item.managerRemarks}</div>
              </div>
            </div>
          );
        })}
        <Form layout="vertical" form={form}>
          <Typography className="text-xl font-semibold my-3">Feedback</Typography>
          <Typography className="font-normal text-base my-1">
            Something I really appreciate about you is your aptitude for problem-solving{" "}
          </Typography>

          <div className="xs:flex-col sm:flex gap-10">
            <div className="w-full">
              <Typography className="text-xl font-semibold mt-5">Maria Sanoid</Typography>
              <div className="sign-box w-full rounded-lg flex justify-center">
                <img alt="error" src={signature} />
              </div>
            </div>
            <div className="w-full">
              <Typography className="text-xl font-semibold mt-5">Amelia Clark</Typography>
              <div className="sign-box w-full rounded-lg flex justify-center">
                <img alt="error" src={signature} />
              </div>
            </div>
          </div>
        </Form>
        <div className="flex justify-end gap-5 my-5 assessment-footer">
          <Button type="primary" className="white-bg-color teriary-color save-btn">
            <NavLink to={`/${ROUTES_CONSTANTS.REPORT_VIEW_DETAILS}`}>Back</NavLink>
          </Button>
        </div>
      </BoxWrapper> */}
      {/* <SignatureAndUploadModal
        title=""
        width={500}
        state={openModal}
        okBtntxt="Upload"
        okBtnFunc={() => {}}
        footer={
          <>
            <Button className="white-bg-color teriary-color">Cancel</Button>,
            <Button type="primary" className="white-color teriary-bg-color  ">
              Submit
            </Button>
          </>
        }
      /> */}
    </div>
  );
};

export default index;
