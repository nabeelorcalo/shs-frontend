import React from 'react'
import { Avatar, Divider, Rate } from 'antd';
import './style.scss'

const InternshipPipeLineCard = () => {
  return (
    <div className='flex flex-col gap-1 rounded-lg p-3  pipeline-card-wrapper'>
      <div className='flex flex-row justify-start items-center gap-3'>
        <Avatar src={<img src={`https://faces-img.xcdn.link/image-lorem-face-3519.jpg`} alt="avatar" />} />
        <div className='flex flex-col gap-2 justify-end'>
          <p className='text-sm'>Jane Cooper</p>
          <p><span className='px-2 text-sm text-primary-disabled-bg-color rounded-lg'>Pendindg</span></p>
        </div>
      </div>
      <Divider className='divider-color my-3'/>
      <div className='flex flex-row justify-between items-center'>
        <Rate style={{ fontSize: 16 }} disabled defaultValue={3} />
        <p className='text-sm'>2 days ago</p>
      </div>
    </div>

  )
}
export default InternshipPipeLineCard