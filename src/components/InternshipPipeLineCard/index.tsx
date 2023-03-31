import React from 'react'
import { Avatar, Divider, Rate } from 'antd';
import './style.scss'

export const InternshipPipeLineCard = () => {
  return (
    <div className='rounded-lg p-2 pipeline-card-wrapper'>
      <div className='flex flex-row items-center gap-3'>
        <Avatar src={<img src={`https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`} alt="avatar" />} />
        <div className='flex flex-col gap-2 justify-center'>
          <p>Jane Cooper</p>
          <p className='p-1 text-primary-disabled-bg-color rounded-lg'>Pending</p>
        </div>
      </div>
      <Divider />
      <div className='flex flex-row items-center justify-between'>
        <Rate style={{ fontSize: 18 }} disabled defaultValue={3} />
        <p>2 days ago</p>
      </div>
    </div>

  )
}