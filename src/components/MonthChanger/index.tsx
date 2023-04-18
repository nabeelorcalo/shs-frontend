import React, { useState } from 'react';
import { IconButton } from '../IconButton';
import { ArrowToLeft, ArrowToRight1, CalendarPickerIcon } from '../../assets/images';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

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
  const [date, setDate] = useState('')

  function onChange(dateString: any) {
    setDate(dayjs(dateString).format('ddd, DD MMM YYYY'))
  }
  const current = new Date();
  const currentDate = dayjs(current).format('ddd, DD MMM YYYY')
  
  return (
    <div className='flex items-center ml-auto mb-4 month-changer'>
      {
        hasDatePicker &&
        <DatePicker
          bordered={false}
          className={datePickerClassName}
          placement="bottomRight"
          suffixIcon={<CalendarPickerIcon className='text-sm' />}
          onChange={onChange}
        />
      }

      <p className='min-w-fit mx-2 text-primary-color'>{date ? date : currentDate}</p>

      <div className='flex flex-row ml-1'>
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