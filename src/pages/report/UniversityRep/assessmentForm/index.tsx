import React, { useState } from 'react'
import { BoxWrapper, Breadcrumb } from '../../../../components'
import { Divider, Button, Typography, Form,} from 'antd'
import SignatureAndUploadModal from '../../../../components/SignatureAndUploadModal'
import { Emoji1st, Emoji3rd, Emoji4th, } from '../../../../assets/images';
import ManagerRemarks from './manageRemarks'
import './style.scss'
import { useNavigate } from 'react-router-dom';

const index = () => {
  const navigate = useNavigate();
  const breadcrumbArray = [
    { name: "Assessment Form" },
    { name: "report", onClickNavigateTo: "/report" },
   
  ];
  const [openModal, setOpenModal] = useState(false)
  const [form] = Form.useForm();

  const mockData = [
    {
      learningCategories: "Technical Skills",
      learningObjectives: "For accuracy and completeness, developed and rewrote technical documentation known as Market Research Description and Product Requirement Document, which included instructions, broachers, product catalogues, and website resources.",
      evidenceOfProgress: "Collected and documented information on integration issues and vulnerabilities, as well as suggestions for improvement. Using Visual Studio, created accurate and efficient test scripts for automated testing of certain products and features.",
      managerRemarks: <ManagerRemarks image={<Emoji3rd/>}  content="Meets expectations" />
    },
    {
      learningCategories: "Working with Others",
      learningObjectives: `Working as part of a team can assist build abilities such as leadership and task skills, which can be improved or increased through it on learning. Process skills include things like "effectiveness skills," "team functioning skills," and "systems thinking abilities."`,
      evidenceOfProgress: "Since we started working in the office. This has exposed me to a working atmosphere, which is the first stage in my personal development. And I'm transitioning from a teaching setting to an office setting.",
     managerRemarks: <ManagerRemarks image={<Emoji1st/>}  content="Does not meet expectations" />
    },
    {
      learningCategories: "Working with Others",
      learningObjectives: `Being presentable includes more than just conveying ideas; it also necessitates appearing balanced, and body language plays a vital role in being regarded as worthy.`,
      evidenceOfProgress: "Being proactive about the duties and accomplishing them on time was difficult at first, but with practice and superior performance, it is possible.",
     managerRemarks: <ManagerRemarks image={<Emoji4th/>}  content="Exceeds expectations" />
    },
    {
      learningCategories: "Commercial Awareness",
      learningObjectives: `To be well-versed in all project and database databases linked to organizational activities.`,
      evidenceOfProgress: "Developed and wrote Market Research Description and Product Requirement Document, for our Confluence page for different bases for our projects which comprised instructions, broachers, product catalogues, and website resources, was developed and rewritten for correctness and completeness.",
     managerRemarks: <ManagerRemarks image={<Emoji4th/>}  content="Exceeds expectations" />
    },
    {
      learningCategories: "Personal and Professional Development",
      learningObjectives: `To be well-versed in all project and database databases linked to organizational activities.`,
      evidenceOfProgress: "Developed and wrote Market Research Description and Product Requirement Document, for our Confluence page for different bases for our projects which comprised instructions, broachers, product catalogues, and website resources, was developed and rewritten for correctness and completeness.",
     managerRemarks: <ManagerRemarks image={<Emoji4th/>}  content="Exceeds expectations" />
    },

  ]
  return (
    <div className='company-admin-assessment-form'>
  <Breadcrumb  breadCrumbData={breadcrumbArray} />
      <Divider />
      {/* for destop */}
      <div className='scroll '>
        <BoxWrapper className='my-5 hidden destop-view lg:block'>
          <Typography className='md:text-3xl font-medium primary-color'>Mino Marina - September 2022</Typography>
          <div className='mt-5 flex gap-10'>
            <span className='font-semibold text-xl lg:w-[200px]'>Learning Categories</span>
            <span className='font-semibold text-xl lg:w-[400px]'>Learning Objectives</span>
            <span className='font-semibold text-xl lg:w-[400px]'>Evidence of Progress</span>
            <span className='font-semibold text-xl lg:w-[400px]'>Manager’s Remarks</span>
          </div>
          <Divider />
          {mockData.map((item) => {
            return (
              <div className='mt-5 flex gap-10'>
                <span className='text-base font-normal lg:w-[200px]'>{item.learningCategories}</span>
                <span className='text-base font-normal lg:w-[400px]'>{item.learningObjectives}</span>
                <span className='text-base font-normal lg:w-[400px]'>{item.evidenceOfProgress}</span>
                <div className='lg:w-[400px]'> {item.managerRemarks}
                </div>
              </div>
            )
          })}
          <Form layout="vertical" form={form}>
            <Typography className='text-xl font-semibold my-1'>Feedback </Typography>
            <Typography className='font-normal text-base my-1'>Something I really appreciate about you is your aptitude for problem-solving </Typography>
            <div className='flex gap-10'>
              <div className='w-full'><Typography className='text-xl font-semibold mt-5'>Maria Sanoid</Typography>
                <div className='sign-box w-full rounded-lg'></div>
              </div>
              <div className='w-full'><Typography className='text-xl font-semibold mt-5'>Amelia Clark</Typography>
              <div className='sign-box w-full rounded-lg'></div>
              </div>
            </div>
          </Form>
          <div className='flex justify-end gap-5 my-5 assessment-footer'>
         
            <Button type='primary'
              className='white-bg-color teriary-color save-btn'    onClick={()=>navigate("/report/view-details/01")}>Back</Button>
         
          </div>
        </BoxWrapper>
      </div>
      {/* for mobile */}
      <BoxWrapper className='my-5 block lg:hidden w-full'>
        <Typography className='text-xl md:text-3xl font-medium primary-color'>Mino Marina - September 2022</Typography>
        {mockData.map((item) => {
          return (
            <div className='mt-5 flex flex-col gap-5'>
              <span className='text-xl font-medium text-center'>{item.learningCategories}</span>
              <span className='text-base font-medium '>Learning Categories</span>
              <span className='text-xs font-normal '>{item.learningObjectives}</span>
              <span className='text-base font-medium '>Evidence of Progress </span>
              <span className='text-xs font-normal '>{item.evidenceOfProgress}</span>
              <span className='text-base font-medium '>Manager Remarks </span>
              <div className='flex flex-row justify-between '>
                <div className='w-full'> {item.managerRemarks}
                </div>
                </div>
            </div>
          )
        })}
        <Form layout="vertical" form={form}>
          <Typography className='text-xl font-semibold my-3'>Feedback</Typography>
          <Typography className='font-normal text-base my-1'>Something I really appreciate about you is your aptitude for problem-solving </Typography>

          <div className='flex gap-10'>
            <div className='w-full'><Typography className='text-xl font-semibold mt-5'>Maria Sanoid</Typography>
              <div className='sign-box w-full rounded-lg'></div>
            </div>
            <div className='w-full'><Typography className='text-xl font-semibold mt-5'>Amelia Clark</Typography>
            <div className='sign-box w-full rounded-lg'></div>

            </div>
          </div>
        </Form>
        <div className='flex justify-end gap-5 my-5 assessment-footer'>
        
          <Button type='primary'
             onClick={()=>navigate("/report/view-details/01")}
            className='white-bg-color teriary-color save-btn'>Back</Button>
          
        </div>
      </BoxWrapper>
      <SignatureAndUploadModal
        title=""
        width={500}
        state={openModal}
        cancelBtntxt={() => { setOpenModal(!openModal) }}
        okBtntxt="Upload"
        okBtnFunc={() => { }}
        footer={<>
          <Button
            className='white-bg-color teriary-color'
          >
            Cancel
          </Button>,
          <Button
            type='primary'
            className='white-color teriary-bg-color  '
          >Submit</Button></>} />
    </div>
  )
}

export default index