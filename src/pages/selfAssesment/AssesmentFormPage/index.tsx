import { Col, Divider, Form, Input, Row, Space, Tooltip } from "antd"
import { useState } from "react"
import { InTooltipIcon } from "../../../assets/images"
import { BoxWrapper, Button, GlobalTable, PageHeader } from "../../../components"
import SignatureAndUploadModal from "../../../components/SignatureAndUploadModal"
import "./style.scss"
import useCustomHook from "../actionHandler"
const mockData = [
  {
    no: 'Technical Skills',
  },
  {
    no: 'Working With Others',
  },
  {
    no: 'Self-Management',
  },
  {
    no: 'Commercial Awarenesss',
  },
  {
    no: 'Personal and Professional Development',
  },
]
const AssesmentForm = () => {
  const action = useCustomHook();
  const [openSignatureModal, setOpenSignatureModal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', internStatus: '', assessmentForm: [{learningCategorie: '', learningObjective: '', evidenceOfProgress: ''}]});

  const handleChangeForm = (value: string, type: string, data: string) => {
    console.log('formData', formData);
    let updatedForm = formData.assessmentForm;
    let existingObject = false;
    updatedForm = updatedForm.map((item) => {
      if (item.learningCategorie === data) {
        existingObject = true;
        if (type === 'learningObjective') {
          return { ...item, learningObjective: value };
        } else if (type === 'evidenceOfProgress') {
          return { ...item, evidenceOfProgress: value };
        }
      }
      return item;
    });
    if (!existingObject) {
      const newObject = {
        learningCategorie: data,
        learningObjective: type === 'learningObjective' ? value : '',
        evidenceOfProgress: type === 'evidenceOfProgress' ? value : '',
      };
      updatedForm.push(newObject);
    }
    setFormData({...formData, assessmentForm: updatedForm});
    console.log('formData', formData);
  }

  const addAssessmentHandle = async (draft: boolean) => {
    let values ={...formData, internStatus: draft ? 'Draft' : 'Submitted'}
    setLoading(true);
    await action.saveSelfAssessment(values);
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
          <textarea onChange={ (_, type='learningObjective')=> handleChangeForm(_.target.value, type, data.no)} className="w-full h-[163px] focus:outline-none px-[16px] py-[10px] rounded-lg" placeholder="Type here..."></textarea>
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
          <textarea onChange={(_, type='evidenceOfProgress')=> handleChangeForm(_.target.value, type, data.no)} className="w-full h-[163px] focus:outline-none px-[16px] py-[10px] rounded-lg " placeholder="Type here..."></textarea>
        </div>),
      title: <h4>Evidence of Progress  <Tooltip placement="right" color={'#363565'} title={"Give evidence to how your learning objectives are met"}>
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
              <Form name="basic">
                <Form.Item
                  label="Report Title"
                  name="title"
                >
                  <Input 
                    id="01" 
                    placeholder="Enter Title"
                    type="text"  
                    name="title" 
                    onChange={(e)=>{
                      // console.log(e.target.value);
                      setFormData({ ...formData, title: e.target.value});
                    }} />
                </Form.Item>
              </Form>
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
            <div className="signature_wraper">
              <h4 className="mb-4">Maria Sanoid</h4>
              <div className="Signatur_modal_opener flex items-center justify-center rounded-lg cursor-pointer" onClick={() => {setOpenSignatureModal(true)}}>Click Here To Sign</div>
            </div>
          </Col>
          <Col xs={24} lg={11}>
            <div className="signature_wraper">
              <h4 className="mb-4">Maria Sanoid</h4>
              <div className="Signatur_modal_opener flex items-center justify-center rounded-lg cursor-pointer">Click Here To Sign</div>
            </div>
          </Col>
        </Row>
        <div className='flex items-center justify-end form_button_wrapper mt-5'>
          <Button
            label="Save Draft"
            htmlType="button"
            onClick={() => {addAssessmentHandle(true)}}
            className="Reset_btn flex items-center justify-center   mr-5"
          />
          <Button
            label="Continue"
            disabled= {disabled}
            loading={loading}
            htmlType="submit"
            onClick={() => {{addAssessmentHandle(true)}}}
            className="Apply_btn flex items-center justify-center "
          />
        </div>
      </BoxWrapper>
      <SignatureAndUploadModal
        state={openSignatureModal}
        okBtnFunc={() => {alert("Sign Functionality goes here")}}
        closeFunc={() => { setOpenSignatureModal(false) }}
        okBtntxt={"Sign"}
        cancelBtntxt={"Cancle"}
        width={650}
      />
    </div>
  )
}

export default AssesmentForm