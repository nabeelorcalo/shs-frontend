import React from 'react';
import { Typography } from 'antd';
import './style.scss';

interface TimeProps {
  Icon: any
  heading: string
  time: string
  isLast?: boolean
  colorClass?: string
}

export const AttendanceTimeCard: any = (props: TimeProps) => {
  const { Icon, heading, time, colorClass = '', isLast = false } = props;

  return (
    <div
      className={`flex flex-row items-center gap-4 time-card ${isLast ? '' : 'border-right'}`}
    >
      {Icon}
      <div className="flex flex-col justify-around">
        <p className="heading">
          {heading}
        </p>

        <div className='flex'>
          <Typography.Title
            level={3}
            style={{ color: `${colorClass}` }}
          >
            {`${time} `}
            {
              heading === "Working Days" &&
              <span className='text-secondary-color '>
                / 25
              </span>
            }
          </Typography.Title>
        </div>
      </div>
    </div>
  )
}