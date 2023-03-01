import React from 'react';
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

interface CheckboxProps {
  label: string
  disabled?: boolean,
  style?: any,
  onChange?: () => void,
}

export const CheckBox: any =(props: CheckboxProps) => {
  return (
    <Checkbox {...props} >{props.label}</Checkbox>
  )
}