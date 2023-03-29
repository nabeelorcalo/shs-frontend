import React, { useState } from 'react'
import { BoxWrapper,PageHeader } from '../../../../components'
import { Divider, Button, Typography, Form, Input } from 'antd'
import { NavLink } from 'react-router-dom'
import { SettingHorizontalLine } from '../../../../assets/images'
import { Emoji1st, Emoji3rd, Emoji4th, EmojiGray1st, EmojiGray3rd, EmojiGray4th } from '../../../../../src/assets/images';
const { TextArea } = Input;
import './style.scss'
import SignatureAndUploadModal from '../../../../components/SignatureAndUploadModal'

const index = () => {
  const [form] = Form.useForm();
  const [isHovering, setIsHovering] = useState(false);
  const [hover1, setHover1] = useState(false)
  const [hover2, setHover2] = useState(false)
  const [hover3, setHover3] = useState(false)
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };


  const mockData = [
    {
      learningCategories: "Technical Skills",
      learningObjectives: "For accuracy and completeness, developed and rewrote technical documentation known as Market Research Description and Product Requirement Document, which included instructions, broachers, product catalogues, and website resources.",
      evidenceOfProgress: "Collected and documented information on integration issues and vulnerabilities, as well as suggestions for improvement. Using Visual Studio, created accurate and efficient test scripts for automated testing of certain products and features.",
      managerRemarks: [{
        icon: <div className='assessment-form-image-container'><a onClick={() => { setHover1(!hover1); console.log(hover1) }} > {hover1 ? <Emoji1st /> : <EmojiGray1st />} </a></div>,
        content: "Does not meet expectations"
      },
      {
        icon: <div className='assessment-form-image-container'>
          <a onClick={() => { setHover2(!hover2); console.log(hover2) }} > {hover2 ? <Emoji3rd /> : <EmojiGray3rd />} </a></div>,
        content: "Meets expectations"
      },
      {
        icon: <div className='assessment-form-image-container'>
          <a onClick={() => { setHover3(!hover3); console.log(hover3) }} > {hover3 ? <Emoji4th /> : <EmojiGray4th />} </a></div>,
        content: "Exceeds expectations"
      },
      ]
    },
    {
      learningCategories: "Working with Others",
      learningObjectives: `Working as part of a team can assist build abilities such as leadership and task skills, which can be improved or increased through it on learning. Process skills include things like "effectiveness skills," "team functioning skills," and "systems thinking abilities."`,
      evidenceOfProgress: "Since we started working in the office. This has exposed me to a working atmosphere, which is the first stage in my personal development. And I'm transitioning from a teaching setting to an office setting.",
      managerRemarks: [{
        icon: <div className='assessment-form-image-container'>
          <a onClick={() => { setHover1(!hover1); console.log(hover1) }} > {hover1 ? <Emoji1st /> : <EmojiGray1st />} </a>
        </div>,
        content: "Does not meet expectations"
      },
      {
        icon: <div className='assessment-form-image-container'>
          <a onClick={() => { setHover2(!hover2); console.log(hover2) }} > {hover2 ? <Emoji3rd /> : <EmojiGray3rd />} </a></div>,
        content: "Meets expectations"
      },
      {
        icon: <div className='assessment-form-image-container'>
          <a onClick={() => { setHover3(!hover3); console.log(hover3) }} > {hover3 ? <Emoji4th /> : <EmojiGray4th />} </a></div>,
        content: "Exceeds expectations"
      },
      ]
    },
    {
      learningCategories: "Working with Others",
      learningObjectives: `Being presentable includes more than just conveying ideas; it also necessitates appearing balanced, and body language plays a vital role in being regarded as worthy.`,
      evidenceOfProgress: "Being proactive about the duties and accomplishing them on time was difficult at first, but with practice and superior performance, it is possible.",
      managerRemarks: [{
        icon: <div className='assessment-form-image-container'><a onClick={() => { setHover1(!hover1); console.log(hover1) }} > {hover1 ? <Emoji1st /> : <EmojiGray1st />} </a></div>,
        content: "Does not meet expectations"
      },
      {
        icon: <div className='assessment-form-image-container'>
          <a onClick={() => { setHover2(!hover2); console.log(hover2) }} > {hover2 ? <Emoji3rd /> : <EmojiGray3rd />} </a></div>,
        content: "Meets expectations"
      },
      {
        icon: <div className='assessment-form-image-container'>
          <a onClick={() => { setHover3(!hover3); console.log(hover3) }} > {hover3 ? <Emoji4th /> : <EmojiGray4th />} </a></div>,
        content: "Exceeds expectations"
      },
      ]
    },
    {
      learningCategories: "Commercial Awareness",
      learningObjectives: `To be well-versed in all project and database databases linked to organizational activities.`,
      evidenceOfProgress: "Developed and wrote Market Research Description and Product Requirement Document, for our Confluence page for different bases for our projects which comprised instructions, broachers, product catalogues, and website resources, was developed and rewritten for correctness and completeness.",
      managerRemarks: [{
        icon: <div className='assessment-form-image-container'><a onClick={() => { setHover1(!hover1); console.log(hover1) }} > {hover1 ? <Emoji1st /> : <EmojiGray1st />} </a></div>,
        content: "Does not meet expectations"
      },
      {
        icon: <div className='assessment-form-image-container'>
          <a onClick={() => { setHover2(!hover2); console.log(hover2) }} > {hover2 ? <Emoji3rd /> : <EmojiGray3rd />} </a></div>,
        content: "Meets expectations"
      },
      {
        icon: <div className='assessment-form-image-container'>
          <a onClick={() => { setHover3(!hover3); console.log(hover3) }} > {hover3 ? <Emoji4th /> : <EmojiGray4th />} </a></div>,
        content: "Exceeds expectations"
      },
      ]
    },
    {
      learningCategories: "Personal and Professional Development",
      learningObjectives: `To be well-versed in all project and database databases linked to organizational activities.`,
      evidenceOfProgress: "Developed and wrote Market Research Description and Product Requirement Document, for our Confluence page for different bases for our projects which comprised instructions, broachers, product catalogues, and website resources, was developed and rewritten for correctness and completeness.",
      managerRemarks: [{
        icon: <div className='assessment-form-image-container'><a onClick={() => { setHover1(!hover1); console.log(hover1) }} > {hover1 ? <Emoji1st /> : <EmojiGray1st />} </a></div>,
        content: "Does not meet expectations"
      },
      {
        icon: <div className='assessment-form-image-container'>
          <a onClick={() => { setHover2(!hover2); console.log(hover2) }} > {hover2 ? <Emoji3rd /> : <EmojiGray3rd />} </a></div>,
        content: "Meets expectations"
      },
      {
        icon: <div className='assessment-form-image-container'>
          <a onClick={() => { setHover3(!hover3); console.log(hover3) }} > {hover3 ? <Emoji4th /> : <EmojiGray4th />} </a></div>,
        content: "Exceeds expectations"
      },
      ]
    },

  ]
  return (
    <div className='manager-assessment-form'>
      <PageHeader title={<> Assessment Form {<span className='inline-block align-middle mx-2'><SettingHorizontalLine className="" /></span>}
        <NavLink to="/case-studies">
          <span className='text-base font-medium dashboard-primary-color' >Case Studies</span>
        </NavLink>  </>} />
      <Divider className="my-0" />

      {/* for destop */}
      <BoxWrapper className='my-5'>
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
              {item.managerRemarks.map((data) => {
                return (
                  <div className='flex flex-col'>
                    <span className='text-center font-normal'>{data.icon}</span>
                    <span className=' text-sm text-center font-normal'>{data.content}</span>
                  </div>
                )
              })}
            </div>
          )
        })}
        <Form layout="vertical" form={form}>
          <Typography className='text-xl font-semibold my-1'>Feedback <span className='text-[#a0a3bd] font-medium'>(Optional)</span></Typography>
          <TextArea rows={6} placeholder="Type here..." maxLength={6} />
          <div className='flex gap-10'>
            <div className='w-full'><Typography className='text-xl font-semibold mt-5'>Maria Sanoid</Typography>
              <div className='sign-box w-full rounded-lg'></div>
            </div>
            <div className='w-full'><Typography className='text-xl font-semibold mt-5'>Amelia Clark</Typography>
              <div className='sign-box w-full rounded-lg flex items-center justify-around'> <span className='text-[#b8bacd]'>Click here to sign</span></div>

            </div>
          </div>
        </Form>
        <SignatureAndUploadModal 
         title= ""
         width ={500}
         state= "true"
         setState= {()=>{}}
         cancelBtntxt= "Cancel"
         okBtntxt= "Upload"
         okBtnFunc= {()=>{}}
         footer={<>
           <Button
             className='bg-[#fff] text-[#4A9D77] border-[#4A9D77]'
           >
             Cancel
           </Button>,
           <Button
             type='primary'
             className='bg-[#4A9D77] text-[#fff] border-[#4A9D77]'
           >Submit</Button></> }/>
      </BoxWrapper>
    </div>
  )
}

export default index