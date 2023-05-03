import React, { useState } from 'react'
import { Emoji1st, Emoji3rd, Emoji4th, EmojiGray1st, EmojiGray3rd, EmojiGray4th } from '../../../assets/images';
const ManagerRemarks = () => {
  const [hover, setHover] = useState(
    {
      sadEmoji: false,
      smilyEmoji: false,
      exceedEmoji: false,
    }
  )
  const SadIconHandler = () => {
    setHover({
      sadEmoji: true,
      smilyEmoji: false,
      exceedEmoji: false,
    });
  }
  const SmileyIconHandler = () => {
    setHover({
      sadEmoji: false,
      smilyEmoji: true,
      exceedEmoji: false,
    });
  }
  const ExceedIconHandler = () => {
    setHover({
      sadEmoji: false,
      smilyEmoji: false,
      exceedEmoji: true,
    });
  }

  const managerRemarks = [{
    icon: <div className='assessment-form-image-container'>
      <span onClick={SadIconHandler} > {hover.sadEmoji ? <Emoji1st /> : <EmojiGray1st />} </span>
    </div>,
    content: "Does not meet expectations"
  },
  {
    icon: <div className='assessment-form-image-container'>
      <span onClick={SmileyIconHandler} > {hover.smilyEmoji ? <Emoji3rd /> : <EmojiGray3rd />} </span>
    </div>,
    content: "Meets expectations"
  },
  {
    icon: <div className='assessment-form-image-container'>
      <span onClick={ExceedIconHandler} > {hover.exceedEmoji ? <Emoji4th /> : <EmojiGray4th />} </span>
    </div>,
    content: "Exceeds expectations"
  },
  ]
  return (
    <div className='flex xs:flex-col sm:flex-row justify-between'>
      {managerRemarks.map((data) => {
        return (
          <div className='flex xs:flex-row sm:flex-col xs:gap-1 sm-gap-0 xs:my-1 sm:my-0'>
            <span className='text-center font-normal'>{data.icon}</span>
            <span className=' text-sm text-center font-normal '>{data.content}</span>
          </div>
        )
      })}
    </div>
  )
}

export default ManagerRemarks