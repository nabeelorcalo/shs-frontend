import React from 'react'
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import './common-range-picker.scss';

const CommonRangePicker = (props: any) => {
  const { option, className, open, setOpen, onChange, popupClassName } = props;
  return (
    <div className='relative'>
      <span className='capitalize' onClick={() => setOpen(!open)}>{option}</span>
      <RangePicker
        className={className}
        open={open}
        onOpenChange={() => setOpen(!open)}
        onChange={onChange}
        popupClassName={`${popupClassName} custom-range-picker-popup`}
      />
    </div>
  )
}

export default CommonRangePicker