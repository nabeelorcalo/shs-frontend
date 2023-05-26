import { useEffect, useState } from "react";
import { BoxWrapper, Breadcrumb, SignatureAndUploadModal } from "../../../components";
import { Divider, Button, Typography, Form, Input } from "antd";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import signature from "../../../assets/images/Report/signature.svg";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import ManagerRemarks from "./managerRemarks";
import useCustomHook from "../actionHandler";
import useCommonCustomHook from "./actionHandler";
import "./style.scss";
import dayjs from "dayjs";
const { TextArea } = Input;

const AssessmentFormCaseStudies = () => {
  const { getSelectedCasStudyData, getParamId, selectedCasStudyData } = useCustomHook();
  const { cancelDrawaSign, handleSignatue, signature } = useCommonCustomHook();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [formData, setFormData] = useState<any>({
    assessmentForm: [],
    supervisorSig: "",
    supervisorStatus: "",
    feedback: "",
  });
  console.log(formData);

  useEffect(() => {
    getSelectedCasStudyData(getParamId(pathname));
  }, []);

  const breadcrumbArray = [
    { name: "Assessment Form" },
    { name: "Case Studies", onClickNavigateTo: `/${ROUTES_CONSTANTS.CASE_STUDIES}` },
  ];

  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();
  const tableData =
    selectedCasStudyData?.assessmentForm?.map((obj: any) => ({
      learningCategories: obj?.learningCategorie,
      learningObjectives: obj?.learningObjective,
      evidenceOfProgress: obj?.evidenceOfProgress,
      managerRemarks: obj?.supervisorRemarks,
      id: obj?.id,
    })) ?? [];
  // console.log("selectedCasStudyData", selectedCasStudyData);
  const remarked = selectedCasStudyData?.remarked;
  const userDetail = selectedCasStudyData?.intern?.userDetail;
  const onFinish = (values: any) => {
    // Notifications({ title: "Success", description: "Cade Study finalise ", type: "success" }),
    //   navigate(`/${ROUTES_CONSTANTS.CASE_STUDIES}`);
    console.log(values, "values");
  };

  const handleManagerRemarks = (id: number | string, supervisorRemarks: string) => {
    console.log(id, supervisorRemarks);
    setFormData({
      ...formData,
      assessmentForm:
        formData?.assessmentForm?.length > 0
          ? formData?.assessmentForm?.map((item: any) => (item?.id === id ? { id, supervisorRemarks } : item))
          : [...formData?.assessmentForm, { id, supervisorRemarks }],
    });
  };

  return (
    <div className="company-admin-assessment-form">
      <Breadcrumb breadCrumbData={breadcrumbArray} />
      <Divider />
      {/* for destop */}
      <div className="scroll ">
        <BoxWrapper className="my-5 destop-view">
          <Typography className="md:text-3xl font-medium primary-color capitalize">{`${userDetail?.firstName} ${
            userDetail?.lastName
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
                <span className="text-base font-normal lg:w-[200px] font-[outfit]">{item?.learningCategories}</span>
                <span className="text-base font-normal lg:w-[400px] font-[outfit]">{item?.learningObjectives}</span>
                <span className="text-base font-normal lg:w-[400px] font-[outfit]">{item?.evidenceOfProgress}</span>
                <div className="lg:w-[400px]">
                  <ManagerRemarks
                    managerRemarks={item?.managerRemarks}
                    id={item?.id}
                    handleManagerRemarks={handleManagerRemarks}
                  />
                </div>
              </div>
            );
          })}
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Typography className="text-xl font-semibold my-1">
              Feedback
              <span className="form-title font-medium">(Optional)</span>
            </Typography>
            <Form.Item name="feedback">
              <TextArea
                value={formData?.feedback}
                onChange={(e) => setFormData({ ...formData, feedback: e?.target?.innerHTML })}
                rows={6}
                placeholder="Type here..."
                maxLength={6}
              />
            </Form.Item>
            <div className="flex gap-10">
              <div className="w-full">
                <Typography className="text-xl font-semibold mt-5 capitalize">
                  {`${userDetail?.firstName} ${userDetail?.lastName}`}
                </Typography>
                <div className="sign-box w-full rounded-lg flex justify-center items-center">
                  <p>{selectedCasStudyData?.internSig}</p>
                  {/* <img src={signature} /> */}
                </div>
              </div>
              <div className="w-full">
                <Typography className="text-xl font-semibold mt-5 capitalize">{`${remarked?.firstName} ${remarked?.lastName}`}</Typography>
                <div className="sign-box w-full rounded-lg flex items-center justify-around">
                  <span onClick={() => setOpenModal(true)} className="sign-btn cursor-pointer">
                    Click here to sign
                  </span>
                </div>
              </div>
            </div>
          </Form>
          <div className="flex justify-end gap-5 my-5 assessment-footer">
            <Button type="primary" className="text-error-bg-color white-color reject-btn font-semibold">
              <NavLink to={`/${ROUTES_CONSTANTS.CASE_STUDIES}`}>Reject</NavLink>
            </Button>
            <Button type="primary" className="white-bg-color teriary-color save-btn font-semibold ">
              Save Draft
            </Button>
            <Button
              type="primary"
              className="teriary-bg-color  white-color  finalise-btn font-semibold  "
              onClick={onFinish}
            >
              Finalise
            </Button>
          </div>
        </BoxWrapper>
      </div>
      {/* for mobile */}
      {/* <BoxWrapper className="block lg:hidden w-full p-3">
        <Typography className="text-xl md:text-3xl font-medium primary-color">Mino Marina - September 2022</Typography>
        {tableData?.map((item: any, index: number) => {
          return (
            <div key={index} className="mt-5 flex flex-col xs:gap-2 sm:gap-5">
              <span className="xs:text-lg sm:text-xl font-medium text-center">{item?.learningCategories}</span>
              <span className="text-base font-medium text-primary-color">Learning Categories</span>
              <span className="text-xs font-normal ">{item?.learningObjectives}</span>
              <span className="text-base font-medium text-primary-color">Evidence of Progress</span>
              <span className="text-xs font-normal ">{item?.evidenceOfProgress}</span>
              <span className="text-base font-medium  text-primary-color">Manager Remarks</span>
              <div className="flex flex-row justify-between ">
                <div className="w-full">{item?.managerRemarks}</div>
              </div>
            </div>
          );
        })}
        <Form layout="vertical" form={form}>
          <Typography className="text-xl font-semibold my-3 gap-2">Feedback</Typography>
          <span className="form-title font-medium ml-2">(Optional)</span>

          <TextArea rows={6} placeholder="Type here..." maxLength={6} />
          <div className="flex xs:flex-col sm:flex-row gap-10">
            <div className="w-full">
              <Typography className="text-xl font-semibold mt-5 capitalize">{`${userDetail?.firstName} ${userDetail?.lastName}`}</Typography>
              <div className="sign-box w-full rounded-lg flex justify-center">
                <img src={signature} alt="signature" />
              </div>
            </div>
            <div className="w-full">
              <Typography className="text-xl font-semibold mt-5">{`${remarked?.firstName} ${remarked?.lastName}`}</Typography>
              <div className="sign-box w-full rounded-lg flex items-center justify-around">
                <span onClick={() => setOpenModal(true)} className="text-[#b8bacd] cursor-pointer">
                  Click here to sign
                </span>
              </div>
            </div>
          </div>
        </Form>
        <div className="flex justify-end xs:gap-1 sm :gap-5 my-5 assessment-footer">
          <Button type="primary" className="text-error-bg-color white-color reject-btn  text-xs">
            <NavLink to={`/${ROUTES_CONSTANTS.CASE_STUDIES}`}>Reject</NavLink>
          </Button>
          <Button type="primary" className="white-bg-color teriary-color save-btn  text-xs">
            Save Draft
          </Button>
          <Button
            type="primary"
            className="teriary-bg-color  white-color finalise-btn text-xs "
            onClick={() => {
              Notifications({ title: "Success", description: "Cade Study finalise ", type: "success" }),
                navigate(`/${ROUTES_CONSTANTS.CASE_STUDIES}`);
            }}
          >
            Finalise
          </Button>
        </div>
      </BoxWrapper> */}
      <SignatureAndUploadModal
        title=""
        width={650}
        state={openModal}
        cancelBtntxt={() => {
          setOpenModal(false);
        }}
        okBtntxt="Upload"
        closeFunc={() => {
          setOpenModal(false);
        }}
        okBtnFunc={() => {}}
        footer={
          <>
            <Button
              onClick={cancelDrawaSign}
              className="white-bg-color teriary-color font-semibold assessment-form-signature-modal-cancel-btn"
            >
              Cancel
            </Button>
            ,
            <Button
              onClick={handleSignatue}
              type="primary"
              className="white-color teriary-bg-color font-semibold assessment-form-signature-modal-sign-btn"
            >
              Sign
            </Button>
          </>
        }
      />
    </div>
  );
};

export default AssessmentFormCaseStudies;
