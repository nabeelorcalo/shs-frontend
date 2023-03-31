import React, { useState } from 'react'
const ManagerRemarks = (props:any) => {

  return (
    <div className='flex flex-row justify-between manage-remark-image-container'>
          <div className='flex'>
            <span className='text-center font-normal image'> {props.image}</span>
            <span className=' font-semibold text-center text-base px-3 '>{props.content}</span>
          </div>
        
      </div>
  )
}

export default ManagerRemarks