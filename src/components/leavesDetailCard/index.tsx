import React from 'react';
import { Typography } from 'antd';
import { BoxWrapper } from '../BoxWrapper/BoxWrapper';
import {
  PinkRectangle,
  PurpleRectangle,
  YellowRectangle,
  BlueRectangle,
} from '../../assets/images';
import './style.scss';

interface LeaveDetailProps {
  sickLeaves: string
  casualLeaves: string,
  medicalLeaves: string,
  workFromHome: string,
}

export const LeaveDetails: any =(props: LeaveDetailProps) => {
  const {sickLeaves, casualLeaves, medicalLeaves, workFromHome} = props;

  return (
    <BoxWrapper className='leaves-detail my-4'>
      <Typography.Title level={4}>
        Leaves
      </Typography.Title>

      <div className='flex flex-col'>
        <div className='flex flex-row items-center pt-6'>
          <BlueRectangle className='mr-4' />
          <p>Sick Leaves</p>
          <p className='ml-auto'>{sickLeaves}</p>
        </div>

        <div className='flex flex-row items-center pt-10'>
          <YellowRectangle className='mr-4' />
          <p>Casual Leaves</p>
          <p className='ml-auto'>{casualLeaves}</p>
        </div>

        <div className='flex flex-row items-center pt-10'>
          <PinkRectangle className='mr-4' />
          <p>Medical Leaves</p>
          <p className='ml-auto'>{medicalLeaves}</p>
        </div>

        <div className='flex flex-row items-center pt-10 pb-3'>
          <PurpleRectangle className='mr-4' />
          <p>Work From Home</p>
          <p className='ml-auto'>{workFromHome}</p>
        </div>
      </div>
    </BoxWrapper>
  )
}