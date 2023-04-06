import React, { useState } from 'react'
import { Emoji1st, Emoji3rd, Emoji4th, EmojiGray1st, EmojiGray3rd, EmojiGray4th } from '../../../assets/images';
const ManagerRemarks = () => {
  const [hover1, setHover1] = useState(false)
  const [hover2, setHover2] = useState(false)
  const [hover3, setHover3] = useState(false)

  const SadIconHandler = () => {
    setHover1(!hover1); console.log(hover1)
  }
  const SmileyIconHandler = () => {
    setHover2(!hover2); console.log(hover2)
  }
  const ExceedIconHandler = () => {
    setHover3(!hover3); console.log(hover3)
  }

  const managerRemarks = [{
    icon: <div className='assessment-form-image-container'>
      <span onClick={SadIconHandler} > {hover1 ? <Emoji1st /> : <EmojiGray1st />} </span>
    </div>,
    content: "Does not meet expectations"
  },
  {
    icon: <div className='assessment-form-image-container'>
      <span onClick={SmileyIconHandler} > {hover2 ? <Emoji3rd /> : <EmojiGray3rd />} </span>
    </div>,
    content: "Meets expectations"
  },
  {
    icon: <div className='assessment-form-image-container'>
      <span onClick={ExceedIconHandler} > {hover3 ? <Emoji4th /> : <EmojiGray4th />} </span>
    </div>,
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