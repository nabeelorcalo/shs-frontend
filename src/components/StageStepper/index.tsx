import React from 'react'
import { InternshipProgressStepper } from '../InternshipProgressStepper'
import { StageProgressStepper } from '../StageProgressStepper'
import { Avatar, Divider } from 'antd'
import { IconEmail, IconPhone, IconLocation } from '../../assets/images'

const statusArray = [
  {
    title:'Applied Date',
    data: "10/11/2022",
  },
  {
    title:'Position',
    data: "UI/UX Designer",
  },
  {
    title:'Type of Work',
    data: "Part Time",
  },
  {
    title:'Internship Type',
    data:"Paid",
  },
  {
    title:'Nature of Word',
    data: "On-site",
  },
]

export const StageStepper = () => {
  return (
    <div className='flex flex-col gap-3'>
      <div className="flex flex-row gap-3">
        <Avatar
          src={`https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`}
        />
        <div className='flex flex-col gap-3'>
          <p className='text-lg'>Intuit Inc. Software Agency</p>
          <div className='flex flex-row flex-wrap gap-3'>
            <IconEmail />
            <p>intuit.inc@gmail.com</p>
          </div>
          <div className='flex flex-row flex-wrap gap-3'>
            <IconPhone />
            <p>+44 7700 900077</p>
          </div>
          <div className='flex flex-row flex-wrap gap-3'>
            <IconLocation />
            <p>263 Eversholt St. London NW11NB, UK</p>
          </div>
        </div>
      </div>
      <Divider />
      <StageProgressStepper />
      <div className='flex flex-row flex-wrap justify-between'>
        {
          statusArray.map((item:any, idx:any)=>{
            return(
              <div className='flex flex-col gap-1'>
                <p className='font-semibold'>{item.title}</p>
                <p className='text-md'>{item.data}</p>
                </div>
            )
          })
        }

      </div>
    </div>
  )
}
