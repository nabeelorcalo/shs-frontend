import { Col, Divider, Form, Input, Row, Space, Tooltip } from "antd"
import { useState } from "react"
import { InTooltipIcon } from "../../../assets/images"
import { BoxWrapper, Button, GlobalTable, PageHeader } from "../../../components"
import SignatureAndUploadModal from "../../../components/SignatureAndUploadModal"
import "./style.scss"
import customCaseStoryHook from "../../../pages/caseStudies/actionHandler";
import useCustomHook from "../actionHandler"
import { useRecoilValue } from "recoil"
import { editOrView, assessmentDataState } from "../../../store"
import { useNavigate } from "react-router-dom"
import { ROUTES_CONSTANTS } from "../../../config/constants"
const mockData = [
  {
    no: 'Technical Skills',
    objective: 'technical_objective',
    evidence: 'technical_evidence',
    objectiveValue: '',
    evidenceValue: ''
  },
  {
    no: 'Working With Others',
    objective: 'wwo_objective',
    evidence: 'wwo_evidence',
    objectiveValue: '',
    evidenceValue: ''
  },
  {
    no: 'Self-Management',
    objective: 'sm_objective',
    evidence: 'sm_evidence',
    objectiveValue: '',
    evidenceValue: ''
  },
  {
    no: 'Commercial Awarenesss',
    objective: 'ca_objective',
    evidence: 'ca_evidence',
    objectiveValue: '',
    evidenceValue: ''
  },
  {
    no: 'Personal and Professional Development',
    objective: 'ppd_objective',
    evidence: 'ppd_evidence',
    objectiveValue: '',
    evidenceValue: ''
  },
]
const AssesmentForm = () => {
  const action = useCustomHook();
  const navigate = useNavigate();
  let {
    uploadFile,
    signPad,
    signature,
    setSignatureText
  } = customCaseStoryHook();
  const [openSignatureModal, setOpenSignatureModal] = useState(false);
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(false);
  const [status, setStatus] = useState('');
  const editOrViewData: string = useRecoilValue(editOrView);
  const assessmentData: any = useRecoilValue(assessmentDataState);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', internSig: '', internStatus: '', assessmentForm: []});

  // covert base 64 url to file
  const urlToFile = (url: any) => {    
    let arr = url?.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let data = arr[1];
    let dataStr = atob(data);
    let n = dataStr.length;
    let dataArr = new Uint8Array(n);
    while (n--) {
      dataArr[n] = dataStr.charCodeAt(n);
    }
    let file = new File([dataArr], `File(${new Date().toLocaleDateString("en-US")}).png`, { type: mime, });
    return file;
  };

  // clear signpad canvas
  const HandleCleare = () => {
    signPad && signPad?.clear();
    uploadFile = undefined;
    signature = undefined;
    setSignatureText("");
    setOpenSignatureModal(false);
  };

  const HandleSignature = async () => {
    let dataURL: any = signPad?.getTrimmedCanvas()?.toDataURL("image/png");
    let file = signPad?.isEmpty() ? null : urlToFile(dataURL);
    // for text-signature 
    if (signature) {
      setFormData({ ...formData, internSig: signature })
      setOpenSignatureModal(false)
    } else {
      // signature canvas and upload
      const fileData = await action.handleFileUpload(file ? file : uploadFile);
      setFormData({ ...formData, internSig: fileData?.url });
      setOpenSignatureModal(false);
    }
  };

  const draftFunction = async () => {
    setStatus('Draft');
    form.submit();
  }

  const backButton = async () => {
    navigate(`/${ROUTES_CONSTANTS.SELF_ASSESSMENT}`);
  }

  const addAssessmentHandle = async (values?: any) => {
    const formValues ={...formData, title: values.title, internStatus: status === 'Draft' ? 'Draft' : 'Submitted'};
    const categories = ["technical", "wwo", "sm", "ca", "ppd"];
    let updatedForm: any = [];
    
    categories.forEach(category => {
      const objectiveKey = `${category}_objective`;
      const evidenceKey = `${category}_evidence`;
      const idKey = `${category}_id`;
      const assessmentItem: any = {
        "learningCategorie": `${category.toUpperCase()}`,
        "learningObjective": values[objectiveKey],
        "evidenceOfProgress": values[evidenceKey]
      };
      if(editOrViewData === 'edit') assessmentItem['id'] = assessmentData[idKey];
      updatedForm.push(assessmentItem);
    });
    formValues.assessmentForm = updatedForm;
    setLoading(true);
    editOrViewData === 'edit' ? await action.editSelfAssessment(formValues, assessmentData.assessmentId): await action.saveSelfAssessment(formValues);
    setDisabled(true);
    setLoading(false);
  };

  const colum = [
    {
      render: (_: any, data: any) => (<p>{data.no}</p>),
      key: 'no',
      title: <h4>Learning Categories</h4>,
      width: 370,
    },
    {
      render: (_: any, data: any) => (
        <div className="text_area_wrapper">
          <Form.Item name={data.objective} >
            <Input.TextArea 
              disabled={(editOrViewData && editOrViewData === 'view') ? true : false}
              placeholder="Type here..."
              className="w-full h-[163px] focus:outline-none px-[16px] py-[10px] rounded-lg"
              autoSize={{ minRows: 6, maxRows: 6 }}
              // onChange={ (_, type='learningObjective')=> handleChangeForm(_.target.value, type, data.no)}
            />
          </Form.Item>
        </div>),
      title: <h4>Learning Objectives
        <Tooltip placement="right" title={"Identify your learning objectives when you started the internship"} color={'#363565'}>
          <InTooltipIcon className="ml-5" />
        </Tooltip>
      </h4>,
      width: 500
    },
    {
      render: (_: any, data: any) => (
        <div className="text_area_wrapper">
          <Form.Item name={data.evidence} >
            <Input.TextArea 
              disabled={(editOrViewData && editOrViewData === 'view') ? true : false}
              placeholder="Type here..."
              className="w-full h-[163px] focus:outline-none px-[16px] py-[10px] rounded-lg"
              autoSize={{ minRows: 6, maxRows: 6 }}
              // onChange={(_, type='evidenceOfProgress')=> handleChangeForm(_.target.value, type, data.no)}
            />
          </Form.Item>
        </div>),
      title: <h4>Evidence of Progress<Tooltip placement="right" color={'#363565'} title={"Give evidence to how your learning objectives are met"}>
        <InTooltipIcon className="ml-5" />
      </Tooltip></h4>,
      width: 500
    }
  ]
  return (
    <div className="Assesment_page_main_wrapper">
      <PageHeader
        actions
        bordered
        title={<div>Assessment Form | <span className="text-base text-[#363565]">Self Assessment</span></div>}
      />

    <Form form={form} initialValues={editOrViewData ? assessmentData : {}} onFinish={addAssessmentHandle}>
      <BoxWrapper className="selefAssesment_detail_form_wrapper"
        boxShadow=' 0px 0px 8px 1px rgba(9, 161, 218, 0.1)'>
          <Space direction="vertical" size="large">
            <Row>
              <p className="Assesment_form_text">You need to fill out this form for university review. Once you submit the form, your manager will give their remarks before you submit it to the university.</p>
            </Row>
            <Row>
              <Col md={8} lg={10} >
                {/* <h5 className="report_title ">Report Title</h5> */}
              </Col>
              <Col>
                <Form.Item
                  label="Report Title"
                  name="title"
                  rules={[{ required: true, message: "Title is required" }]}
                >
                  <Input 
                    id="01" 
                    placeholder="Enter Title"
                    type="text"  
                    name="title" 
                    disabled={(editOrViewData && editOrViewData === 'view') ? true : false}
                    />
                </Form.Item>
              </Col>
            </Row>
          </Space>
        <Divider />
        <GlobalTable
          bgWhiteTable
          pagination={false}
          columns={colum}
          tableData={mockData}
        />

        <Row gutter={[20, 20]} justify="space-between">
          <Col xs={24} lg={11}>
          {editOrViewData !== '' && editOrViewData === 'view' ?
            <div className="">
              <h4 className="mb-4">{assessmentData.name}</h4>
              <div className="sign-box w-full rounded-lg flex justify-center items-center">
                <div className="w-[90%] relative flex items-center justify-center min-h-[120px]">
                  {action.checkForImage(assessmentData?.internSign) ? (
                    <img className="absolute w-full h-full overflow-hidden" src={assessmentData?.internSign} />
                  ) : (
                    <p>{assessmentData?.internSign}</p>
                  )}
                </div>
              </div>
            </div>
          :
            <div className="signature_wraper">
              <h4 className="mb-4">Maria Sanoid</h4>
              <div className="Signatur_modal_opener flex items-center justify-center rounded-lg cursor-pointer" onClick={() => {setOpenSignatureModal(true)}}>Click Here To Sign</div>
            </div>
          }
          </Col>
          <Col xs={24} lg={11}>
            <div className="signature_wraper">
              <h4 className="mb-4">Maria Sanoid</h4>
              <div className="Signatur_modal_opener flex items-center justify-center rounded-lg cursor-pointer">Click Here To Sign</div>
            </div>
          </Col>
        </Row>
        <div className='flex items-center justify-end form_button_wrapper mt-5'>
          {editOrViewData === 'view' ?
            <Button
              label="Back"
              htmlType="button"
              onClick={() => backButton()}
              className="Reset_btn flex items-center justify-center mr-5"
            />
            : 
            <>
              <Button
                label= {editOrViewData==="edit"? "Back" : "Cancel"}
                htmlType="button"
                onClick={() => backButton()}
                className="Reset_btn flex items-center justify-center mr-5"
              />
              <Button
                label="Save Draft"
                htmlType="button"
                disabled= {disabled}
                loading={loading}
                onClick={() => draftFunction()}
                className="Reset_btn flex items-center justify-center mr-5"
              /> 
              <Button
                label="Continue"
                disabled= {disabled}
                loading={loading}
                htmlType="submit"
                className="Apply_btn flex items-center justify-center "
              /> 
            </>
          }
        </div>
      </BoxWrapper>
      <SignatureAndUploadModal
        state={openSignatureModal}
        okBtntxt={"Sign"}
        cancelBtntxt={"Cancle"}
        width={650}
        footer={
          <>
            <Button
              label="Cancel"
              htmlType="button"
              onClick={() => {HandleCleare()}}
              className="white-bg-color teriary-color font-semibold assessment-form-signature-modal-cancel-btn"
            />
            <Button
              label="Sign"
              htmlType="button"
              onClick={() => {HandleSignature()}}
              className="white-color teriary-bg-color font-semibold assessment-form-signature-modal-sign-btn"
            />
          </>
        }
      />
    </Form>
    </div>
  )
}

export default AssesmentForm
