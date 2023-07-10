import React from 'react'
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import './common-range-picker.scss';

const CommonRangePicker = (props: any) => {
  const { option, className, open, setOpen, onChange, popupClassName, placement } = props;
  return (
    <div className='relative'>
      <span className='capitalize' onClick={() => setOpen(!open)}>{option}</span>
      <RangePicker
        className={'common-range-picker-wrapper'}
        open={open}
        onOpenChange={() => setOpen(!open)}
        onChange={onChange}
        popupClassName={`${popupClassName} custom-range-picker-popup`}
        placement={placement}
      />
    </div>
  )
}

export default CommonRangePicker