import React from 'react';
import { Typography } from 'antd';
import { BoxWrapper } from '../BoxWrapper/BoxWrapper';
import { AvgHoursIcon, ClockInIcon, ClockOutIcon } from '../../assets/images';
import './style.scss';

interface AttendanceProps {
  label: string
  time: string,
  colorClass: string
}

export const AttendanceDetail: any = (props: AttendanceProps) => {
  const {label, time, colorClass} = props;

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Avg Clock In':
        return <ClockInIcon className='ml-auto' />;
      case 'Avg Clock Out':
        return <ClockOutIcon className='ml-auto' />;
      case 'Avg Hours':
        return <AvgHoursIcon className='ml-auto' />;
      default:
        return <></>;
    }
  }

  return (
    <BoxWrapper className='flex flex-col attendance-card min-w-[232px] min-h-[182px]'>
      {renderIcon(label)}

      <p className='mt-10 light-grey-color'>
        {label}
      </p>

      <Typography.Title level={3} className={colorClass}>
        {time}
      </Typography.Title>
    </BoxWrapper>
  )
}