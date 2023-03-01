import React from 'react'
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import "./style.scss"

interface Props {
  label: string;
  size: "small" | "middle" | "large";
}
dayjs.extend(customParseFormat);

const dateFormat = 'YYYY/MM/DD';
const weekFormat = 'MM/DD';

/** Manually entering any of the following formats will perform date parsing */
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

const customFormat: DatePickerProps['format'] = (value) =>
`custom format: ${value.format(dateFormat)}`;

const customWeekStartEndFormat: DatePickerProps['format'] = (value) =>
`${dayjs(value).startOf('week').format(weekFormat)} ~ ${dayjs(value)
  .endOf('week')
  .format(weekFormat)}`
  
  const DateAndTimePicker = (props:Props) => {
    const { label,size } = props 
    return (
      <div className='date-wrapper'>
    <label className='label'>{label}</label>
    <DatePicker defaultValue={dayjs('01/01/2015', dateFormatList[0])} format={dateFormatList} size={size} className='datePicker-wrapper'/>  
      
    </div>
    )
}

export default DateAndTimePicker
