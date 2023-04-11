import React from 'react'
import { Avatar, Divider, Rate } from 'antd';
import './style.scss'

export const InternshipPipeLineCard = (props:any) => {
  const {name, rating, time, status, img} = props
  return (
    <div className='flex flex-col gap-1 rounded-lg p-3  pipeline-card-wrapper'>
      <div className='flex flex-row justify-start items-center gap-3'>
        <Avatar src={<img src={img} alt="avatar" />} />
        <div className='flex flex-col gap-2 justify-end'>
          <p className='text-sm'>{name}</p>
          {status === "OfferLetter" ? <p><span className='px-2 text-sm text-warning-bg-color text-white rounded-lg'>Pending</span></p> : null}
          {status === "Contract" ? <p><span className='px-2 text-sm active-bg text-white rounded-lg'>Signed</span></p> : null}
        </div>
      </div>
      <Divider className='divider-color my-3'/>
      <div className='flex flex-row justify-between items-center'>
        <Rate style={{ fontSize: 16 }} disabled value={rating} defaultValue={0} />
        <p className='text-sm'>{time}</p>
      </div>
    </div>

  )
}