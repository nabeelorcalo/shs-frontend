import React from 'react';
import { Avatar, Typography } from 'antd';
import './style.scss';

interface TopPerformanceProps {
  avatar: string
  name: string,
  profession?: string,
  percentage?: string
}

export const TopPerformanceCard: any = (props: TopPerformanceProps) => {
  const { avatar, name, profession, percentage } = props;

  return (
    <div className='flex flex-row items-center gap-4 performance-card'>
      <Avatar
        size={32}
        alt="avatar"
        src={<img src={avatar} />}
      />

      <div className='flex flex-col'>
        <p className='text-sm text-primary-color'>
          {name}
        </p>

        <p className='text-sm'>
          {profession}
        </p>
      </div>

      <Typography.Title
        level={3}
        className='ml-auto performance-percentage-txt'
      >
        {percentage}
      </Typography.Title>
    </div>
  )
}