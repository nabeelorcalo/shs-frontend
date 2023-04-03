import { Col, Divider, Row, Tooltip } from "antd"
import { InTooltipIcon } from "../../../assets/images"
import { BoxWrapper, Button, GlobalTable, PageHeader } from "../../../components"
import SignatureAndUploadModal from "../../../components/SignatureAndUploadModal"
import "./style.scss"
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
          <textarea className="w-full h-[163px] focus:outline-none px-[16px] py-[10px] rounded-lg" placeholder="Type here..."></textarea>
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
          <textarea className="w-full h-[163px] focus:outline-none px-[16px] py-[10px] rounded-lg " placeholder="Type here..."></textarea>
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
        <p className="Assesment_form_text">You need to fill out this form for university review. Once you submit the form, your manager will give their remarks before you submit it to the university.</p>
        <Row>
          <Col lg={5}>
            <h5 className="report_title ">Report Title</h5>
          </Col>
          <Col lg={5}>

          </Col>
        </Row>
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
              <div className="Signatur_modal_opener flex items-center justify-center rounded-lg" onClick={()=>{alert("heloo")}}>Click Here To Sign</div>
            </div>
          </Col>
          <Col xs={24} lg={11}>
            <div className="signature_wraper">
              <h4 className="mb-4">Maria Sanoid</h4>
              <div className="Signatur_modal_opener flex items-center justify-center rounded-lg">Click Here To Sign</div>
            </div>
          </Col>
        </Row>
        <div className='flex items-center justify-end form_button_wrapper mt-5'>
          <Button
            label="Save Draft"
            htmlType="button"
            onClick={() => { alert("hello Reset") }}
            className="Reset_btn flex items-center justify-center   mr-5"
          />
          <Button
            label="Continue"
            htmlType="submit"
            onClick={() => { alert("hello Applay") }}
            className="Apply_btn flex items-center justify-center "
          />
        </div>

      </BoxWrapper>
      {/* <SignatureAndUploadModal/> */}
    </div>
  )
}

export default AssesmentForm