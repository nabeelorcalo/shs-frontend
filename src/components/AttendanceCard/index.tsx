import { Typography } from 'antd';
import React from 'react';
import { Absent } from '../../assets/images';
import { BoxWrapper } from '../BoxWrapper/BoxWrapper';

interface AttendanceProps {
  title: string
  count: number,
  avatar: any,
  className?: string,
}

export const AttendanceCard: any = (props: AttendanceProps) => {
  const { title, count, avatar, className } = props

  return (
    <BoxWrapper className='flex items-center gap-2 attendance-card'>
      {avatar}

      <Typography.Text >
        {title}
      </Typography.Text>

      <Typography.Title
        level={1}
        className="ml-auto"
      >
        {count}
      </Typography.Title>
    </BoxWrapper>
  )
}