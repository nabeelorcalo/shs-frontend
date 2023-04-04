import React, { useState } from 'react'
import { BoxWrapper, Breadcrumb, SignatureAndUploadModal } from '../../../../components'
import { Divider, Button, Typography, Form, Input } from 'antd'
import ManagerRemarks from '../../Common/managerRemarks'
import { NavLink } from 'react-router-dom'
import './style.scss'
import { ROUTES_CONSTANTS } from '../../../../config/constants'

const { TextArea } = Input;

const index = () => {
  const breadcrumbArray = [
    { name: "Assessment Form" },
    { name: "Case Studies", onClickNavigateTo: `/${ROUTES_CONSTANTS.CASE_STUDIES}` },
  ];
  const [openModal, setOpenModal] = useState(false)
  const [form] = Form.useForm();

  const mockData = [
    {
      learningCategories: "Technical Skills",
      learningObjectives: "For accuracy and completeness, developed and rewrote technical documentation known as Market Research Description and Product Requirement Document, which included instructions, broachers, product catalogues, and website resources.",
      evidenceOfProgress: "Collected and documented information on integration issues and vulnerabilities, as well as suggestions for improvement. Using Visual Studio, created accurate and efficient test scripts for automated testing of certain products and features.",
      managerRemarks: <ManagerRemarks />
    },
    {
      learningCategories: "Working with Others",
      learningObjectives: `Working as part of a team can assist build abilities such as leadership and task skills, which can be improved or increased through it on learning. Process skills include things like "effectiveness skills," "team functioning skills," and "systems thinking abilities."`,
      evidenceOfProgress: "Since we started working in the office. This has exposed me to a working atmosphere, which is the first stage in my personal development. And I'm transitioning from a teaching setting to an office setting.",
      managerRemarks: <ManagerRemarks />
    },
    {
      learningCategories: "Working with Others",
      learningObjectives: `Being presentable includes more than just conveying ideas; it also necessitates appearing balanced, and body language plays a vital role in being regarded as worthy.`,
      evidenceOfProgress: "Being proactive about the duties and accomplishing them on time was difficult at first, but with practice and superior performance, it is possible.",
      managerRemarks: <ManagerRemarks />
    },
    {
      learningCategories: "Commercial Awareness",
      learningObjectives: `To be well-versed in all project and database databases linked to organizational activities.`,
      evidenceOfProgress: "Developed and wrote Market Research Description and Product Requirement Document, for our Confluence page for different bases for our projects which comprised instructions, broachers, product catalogues, and website resources, was developed and rewritten for correctness and completeness.",
      managerRemarks: <ManagerRemarks />
    },
    {
      learningCategories: "Personal and Professional Development",
      learningObjectives: `To be well-versed in all project and database databases linked to organizational activities.`,
      evidenceOfProgress: "Developed and wrote Market Research Description and Product Requirement Document, for our Confluence page for different bases for our projects which comprised instructions, broachers, product catalogues, and website resources, was developed and rewritten for correctness and completeness.",
      managerRemarks: <ManagerRemarks />
    },
  ]
  return (
    <div className='company-admin-assessment-form'>
      <Breadcrumb breadCrumbData={breadcrumbArray} />
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
            <Typography className='text-xl font-semibold my-1'>Feedback
              <span className='form-title font-medium'>(Optional)</span>
            </Typography>
            <TextArea rows={6} placeholder="Type here..." maxLength={6} />
            <div className='flex gap-10'>
              <div className='w-full'><Typography className='text-xl font-semibold mt-5'>Maria Sanoid</Typography>
                <div className='sign-box w-full rounded-lg'></div>
              </div>
              <div className='w-full'><Typography className='text-xl font-semibold mt-5'>Amelia Clark</Typography>
                <div className='sign-box w-full rounded-lg flex items-center justify-around'>
                  <span onClick={() => setOpenModal(true)} className='sign-btn cursor-pointer'>Click here to sign</span>
                </div>
              </div>
            </div>
          </Form>
          <div className='flex justify-end gap-5 my-5 assessment-footer'>
            <Button type='primary'
              className='text-error-bg-color white-color reject-btn'>
              <NavLink to={`/${ROUTES_CONSTANTS.CASE_STUDIES}`}>
                Reject
              </NavLink>
            </Button>
            <Button type='primary'
              className='white-bg-color teriary-color save-btn'>Save Draft</Button>
            <Button type='primary'
              className='teriary-bg-color  white-color  finalise-btn '>Finalise</Button>
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
                </div></div>
            </div>
          )
        })}
        <Form layout="vertical" form={form}>
          <Typography className='text-xl font-semibold my-3'>Feedback <span className='form-title font-medium'>(Optional)</span></Typography>
          <TextArea rows={6} placeholder="Type here..." maxLength={6} />
          <div className='flex gap-10'>
            <div className='w-full'><Typography className='text-xl font-semibold mt-5'>Maria Sanoid</Typography>
              <div className='sign-box w-full rounded-lg'></div>
            </div>
            <div className='w-full'><Typography className='text-xl font-semibold mt-5'>Amelia Clark</Typography>
              <div className='sign-box w-full rounded-lg flex items-center justify-around'>
                <span onClick={() => setOpenModal(true)} className='text-[#b8bacd] cursor-pointer'>Click here to sign</span>
              </div>

            </div>
          </div>
        </Form>
        <div className='flex justify-end gap-5 my-5 assessment-footer'>
          <Button type='primary'
            className='text-error-bg-color white-color reject-btn' >
            <NavLink to={`/${ROUTES_CONSTANTS.CASE_STUDIES}`}>
              Reject
            </NavLink>
          </Button>
          <Button type='primary'
            className='white-bg-color teriary-color save-btn'>Save Draft</Button>
          <Button type='primary'
            className='teriary-bg-color  white-color  finalise-btn '>Finalise</Button>
        </div>
      </BoxWrapper>
      <SignatureAndUploadModal
        title=""
        width={500}
        state={openModal}
        cancelBtntxt={() => { setOpenModal(!openModal) }}
        okBtntxt="Upload"
        closeFunc={() => { setOpenModal(false) }}
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