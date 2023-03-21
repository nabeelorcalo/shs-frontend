import React, { FC } from "react";
import type { DatePickerProps } from 'antd';
import { DatePicker as AntDatePicker } from 'antd'
import { IconDatePicker } from '../../assets/images'
import './style.scss'


interface PickerProps {
  onChange: DatePickerProps['onChange']
}

export const DatePicker: FC<PickerProps> = ({ onChange }) => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/



  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <AntDatePicker
      format='YYYY/MM/DD'
      onChange={onChange}
      suffixIcon={<IconDatePicker />}
      allowClear={false}
    />
  )
}
