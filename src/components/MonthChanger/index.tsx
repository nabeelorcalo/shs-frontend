import React from 'react';
import { IconButton } from '../IconButton';
import { ArrowToLeft, ArrowToRight1 } from '../../assets/images';
import { DatePicker } from 'antd';

interface MonthChangerProps {
  month: any,
  hasDatePicker?: boolean,
  datePickerClassName?: string,
  onClick?: () => void,
}

export const MonthChanger: any = (props: MonthChangerProps) => {
  const {
    month,
    onClick,
    hasDatePicker = false,
    datePickerClassName
  } = props;

  return (
    <div className='flex items-center ml-auto mb-4 month-changer'>
      {
        hasDatePicker &&
        <DatePicker
          placeholder=""
          bordered={false}
          className={datePickerClassName}
          placement="bottomRight"
        />
      }

      <p className='min-w-fit mx-2'>{month}</p>

      <div className='flex flex-row'>
        <IconButton
          name="prev"
          className="icon-btn left-radius"
          icon={<ArrowToLeft />}
          onClick={onClick}
        />

        <IconButton
          name="next"
          className="icon-btn right-radius"
          icon={<ArrowToRight1 />}
          onClick={onClick}
        />
      </div>
    </div>
  )
}