import { Col, Divider, Form, Input, Row, Space, Tooltip } from "antd";
import { useState } from "react";
import { InTooltipIcon } from "../../../assets/images";
import { BoxWrapper, Button, GlobalTable, Notifications, PageHeader } from "../../../components";
import SignatureAndUploadModal from "../../../components/SignatureAndUploadModal";
import "./style.scss";
import useCustomHook from "../actionHandler";

import { useRecoilValue } from "recoil";
import { editOrView, assessmentDataState, currentUserState } from "../../../store";
import { useNavigate } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import { checkForImage, urlToFile } from "../../../helpers";
const mockData = [
  {
    no: "Technical Skills",
    objective: "technical_objective",
    evidence: "technical_evidence",
    objectiveValue: "",
    evidenceValue: "",
  },
  {
    no: "Working With Others",
    objective: "wwo_objective",
    evidence: "wwo_evidence",
    objectiveValue: "",
    evidenceValue: "",
  },
  {
    no: "Self-Management",
    objective: "sm_objective",
    evidence: "sm_evidence",
    objectiveValue: "",
    evidenceValue: "",
  },
  {
    no: "Commercial Awarenesss",
    objective: "ca_objective",
    evidence: "ca_evidence",
    objectiveValue: "",
    evidenceValue: "",
  },
  {
    no: "Personal and Professional Development",
    objective: "ppd_objective",
    evidence: "ppd_evidence",
    objectiveValue: "",
    evidenceValue: "",
  },
];
//signature object
let signPad: any;
let uploadFile: any;
let signature: any;
const AssesmentForm = () => {
  const action = useCustomHook();
  const navigate = useNavigate();
  const [openSignatureModal, setOpenSignatureModal] = useState(false);
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(false);
  const [status, setStatus] = useState("");
  const editOrViewData: string = useRecoilValue(editOrView);
  const assessmentData: any = useRecoilValue(assessmentDataState);
  const userLogin = useRecoilValue(currentUserState);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: "", internSig: "", internStatus: "", assessmentForm: [] });
  const [files, setFile] = useState<any>(null);
  console.log(assessmentData, "assessmentData");

  // get upload file form data
  const handleUploadFile = (value: any) => {
    uploadFile = value;
  };
  console.log(userLogin);
  console.log("editOrViewData", editOrViewData);

  // update signpad object
  const getSignPadValue = (value: any) => {
    signPad = value;
  };

  // text signature funtion to update signature value
  const handleTextSignature = (text: string) => {
    signature = text;
  };

  // clear signpad canvas
  const HandleCleare = () => {
    signPad && signPad?.clear();
    uploadFile = undefined;
    signature = undefined;
    setFormData({ ...formData, internSig: "" });
  };
  //handle intern signature
  const handleSignature = () => {
    let dataURL: any = signPad?.getTrimmedCanvas()?.toDataURL("image/png");
    // for text-signature
    if (signature) {
      setFormData({ ...formData, internSig: signature });
      setOpenSignatureModal(false);
    } else {
      // signature canvas and upload
      if (!signPad?.isEmpty() || files) {
        !files && setFormData({ ...formData, internSig: dataURL });
        setOpenSignatureModal(false);
      } else {
        Notifications({ title: "Validation Error", description: "Signature required", type: "error" });
      }
    }
  };
  const setFiles = (value: any) => {
    setFile(value);
    const reader = new FileReader();
    reader.onload = async () => {
      const dataURL = reader.result;
      setFormData((pre: any) => ({
        ...pre,
        internSig: dataURL,
      }));
    };
    if (value) reader.readAsDataURL(value);
    else
      setFormData((pre: any) => ({
        ...pre,
        internSig: "",
      }));
  };

  const draftFunction = async () => {
    setStatus("Draft");
    form.submit();
  };

  const backButton = async () => {
    navigate(`/${ROUTES_CONSTANTS.SELF_ASSESSMENT}`);
  };

  const addAssessmentHandle = async (values?: any) => {
    const formValues = { ...formData, title: values.title, internStatus: status === "Draft" ? "Draft" : "Submitted" };
    const categories = ["technical", "wwo", "sm", "ca", "ppd"];
    let updatedForm: any = [];

    categories.forEach((category) => {
      const objectiveKey = `${category}_objective`;
      const evidenceKey = `${category}_evidence`;
      const idKey = `${category}_id`;
      const assessmentItem: any = {
        learningCategorie: `${category.toUpperCase()}`,
        learningObjective: values[objectiveKey],
        evidenceOfProgress: values[evidenceKey],
      };
      if (editOrViewData === "edit") assessmentItem["id"] = assessmentData[idKey];
      updatedForm.push(assessmentItem);
    });
    formValues.assessmentForm = updatedForm;
    setLoading(true);
    if (editOrViewData === "edit") await action.editSelfAssessment(formValues, assessmentData.assessmentId);
    else {
      let file = (await signPad?.isEmpty()) && !files ? null : urlToFile(formData?.internSig);
      if (file) {
        const sig = await action.handleSignatureUpload(file ? file : uploadFile);
        formValues.internSig = sig;
      }
      await action.saveSelfAssessment(formValues);
    }
    setDisabled(true);
    setLoading(false);
  };

  const colum = [
    {
      render: (_: any, data: any) => <p>{data.no}</p>,
      key: "no",
      title: <h4>Learning Categories</h4>,
      width: 370,
    },
    {
      render: (_: any, data: any) => (
        <div className="text_area_wrapper">
          <Form.Item name={data.objective}>
            <Input.TextArea
              disabled={editOrViewData && editOrViewData === "view" ? true : false}
              placeholder="Type here..."
              className="w-full h-[163px] focus:outline-none px-[16px] py-[10px] rounded-lg"
              autoSize={{ minRows: 6, maxRows: 6 }}
            />
          </Form.Item>
        </div>
      ),
      title: (
        <h4>
          Learning Objectives
          <Tooltip
            placement="right"
            title={"Identify your learning objectives when you started the internship"}
            color={"#363565"}
          >
            <InTooltipIcon className="ml-5" />
          </Tooltip>
        </h4>
      ),
      width: 500,
    },
    {
      render: (_: any, data: any) => (
        <div className="text_area_wrapper">
          <Form.Item name={data.evidence}>
            <Input.TextArea
              disabled={editOrViewData && editOrViewData === "view" ? true : false}
              placeholder="Type here..."
              className="w-full h-[163px] focus:outline-none px-[16px] py-[10px] rounded-lg"
              autoSize={{ minRows: 6, maxRows: 6 }}
            />
          </Form.Item>
        </div>
      ),
      title: (
        <h4>
          Evidence of Progress
          <Tooltip placement="right" color={"#363565"} title={"Give evidence to how your learning objectives are met"}>
            <InTooltipIcon className="ml-5" />
          </Tooltip>
        </h4>
      ),
      width: 500,
    },
  ];
  return (
    <div className="Assesment_page_main_wrapper">
      <PageHeader
        actions
        bordered
        title={
          <div>
            Assessment Form | <span className="text-base text-[#363565]">Self Assessment</span>
          </div>
        }
      />

      <Form form={form} initialValues={editOrViewData ? assessmentData : {}} onFinish={addAssessmentHandle}>
        <BoxWrapper className="selefAssesment_detail_form_wrapper" boxShadow=" 0px 0px 8px 1px rgba(9, 161, 218, 0.1)">
          <Space direction="vertical" size="large">
            <Row>
              <p className="Assesment_form_text">
                You need to fill out this form for university review. Once you submit the form, your manager will give
                their remarks before you submit it to the university.
              </p>
            </Row>
            <Row>
              <Col md={8} lg={10}>
                {/* <h5 className="report_title ">Report Title</h5> */}
              </Col>
              <Col>
                <Form.Item label="Report Title" name="title" rules={[{ required: true, message: "Title is required" }]}>
                  <Input
                    id="01"
                    placeholder="Enter Title"
                    type="text"
                    name="title"
                    disabled={editOrViewData && editOrViewData === "view" ? true : false}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Space>
          <Divider />
          <GlobalTable bgWhiteTable pagination={false} columns={colum} tableData={mockData} />

          <Row gutter={[20, 20]} justify="space-between">
            <Col xs={24} lg={11}>
              {formData?.internSig || editOrViewData === "view" ? (
                <div className="signature_wraper">
                  <h4 className="mb-4">
                    {userLogin.firstName} {userLogin.lastName}
                  </h4>
                  <div className="Signatur_modal_opener w-full rounded-lg flex justify-center items-center">
                    <div className="w-[90%] relative flex items-center justify-center min-h-[120px]">
                      {action.checkForImage(formData?.internSig) || formData?.internSig?.includes("base64") ? (
                        <img
                          className="absolute w-full h-full overflow-hidden object-scale-down"
                          src={formData?.internSig}
                        />
                      ) : (
                        <p>{formData?.internSig || "N/A"}</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="signature_wraper">
                  <h4 className="mb-4">
                    {userLogin.firstName} {userLogin.lastName}
                  </h4>
                  <div
                    className="Signatur_modal_opener flex items-center justify-center rounded-lg cursor-pointer"
                    onClick={() => {
                      setOpenSignatureModal(true);
                    }}
                  >
                    Click Here To Sign
                  </div>
                </div>
              )}
            </Col>
            <Col xs={24} lg={11}>
              <div className="signature_wraper">
                <h4 className="mb-4 capitalize">
                  {`
                  ${assessmentData?.supervisor?.firstName} 
                  ${assessmentData?.supervisor?.lastName}
                  `}
                </h4>
                <div className="Signatur_modal_opener flex items-center justify-center rounded-lg relative ">
                  {checkForImage(assessmentData?.supervisor?.sig) ||
                  assessmentData?.supervisor?.sig?.includes("base64") ? (
                    <img
                      className="absolute w-full h-full overflow-hidden object-scale-down opacity-25 p-5"
                      src={assessmentData?.supervisor?.sig}
                    />
                  ) : (
                    <p>{assessmentData?.supervisor?.sig || "N/A"}</p>
                  )}
                </div>
              </div>
            </Col>
          </Row>
          <div className="flex items-center justify-end form_button_wrapper mt-5">
            {editOrViewData === "view" ? (
              <Button
                label="Back"
                htmlType="button"
                onClick={() => backButton()}
                className="Reset_btn flex items-center justify-center mr-5"
              />
            ) : (
              <>
                <Button
                  label={editOrViewData === "edit" ? "Back" : "Cancel"}
                  htmlType="button"
                  onClick={() => backButton()}
                  className="Reset_btn flex items-center justify-center mr-5"
                />
                <Button
                  label="Save Draft"
                  htmlType="button"
                  disabled={disabled}
                  loading={loading}
                  onClick={() => draftFunction()}
                  className="Reset_btn flex items-center justify-center mr-5"
                />
                <Button
                  label="Continue"
                  disabled={disabled}
                  loading={loading}
                  htmlType="submit"
                  onClick={addAssessmentHandle}
                  className="Apply_btn flex items-center justify-center "
                />
              </>
            )}
          </div>
        </BoxWrapper>
        <SignatureAndUploadModal
          title="Signature"
          state={openSignatureModal}
          cancelBtntxt={() => {
            setOpenSignatureModal(false);
            HandleCleare();
          }}
          closeFunc={() => {
            setOpenSignatureModal(false);
            HandleCleare();
          }}
          files={files}
          setFiles={setFiles}
          handleUploadFile={handleUploadFile}
          okBtnFunc={() => {}}
          getSignPadValue={getSignPadValue}
          handleTextSignature={handleTextSignature}
          HandleCleare={HandleCleare}
          signature={signature}
          okBtntxt={"Sign"}
          width={650}
          footer={
            <>
              <Button
                label="Cancel"
                htmlType="button"
                onClick={() => {
                  HandleCleare();
                }}
                className="white-bg-color teriary-color font-semibold assessment-form-signature-modal-cancel-btn"
              />
              <Button
                label="Sign"
                htmlType="button"
                onClick={() => {
                  handleSignature();
                }}
                className="white-color teriary-bg-color font-semibold assessment-form-signature-modal-sign-btn"
              />
            </>
          }
        />
      </Form>
    </div>
  );
};

export default AssesmentForm;
