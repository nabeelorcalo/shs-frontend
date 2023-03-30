import React, { useState } from 'react'
import { Emoji1st, Emoji3rd, Emoji4th, EmojiGray1st, EmojiGray3rd, EmojiGray4th } from '../../../assets/images';
const ManagerRemarks = () => {
  const [hover1, setHover1] = useState(false)
  const [hover2, setHover2] = useState(false)
  const [hover3, setHover3] = useState(false)
  const  managerRemarks= [{
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
  return (
    <div className='flex flex-row justify-between'>
       {managerRemarks.map((data) => {
      return (
        <div className='flex flex-col'>
          <span className='text-center font-normal'>{data.icon}</span>
          <span className=' text-sm text-center font-normal '>{data.content}</span>
        </div>
      )
    })}</div>
  )
}

export default ManagerRemarks