import React from 'react';
import { Input } from 'antd';

interface TextAreaProps {
  rows: number,
  defaultValue?: string,
  placeholder?: string,
  className?: string,
  disable?: boolean,
}

export const TextArea: any =(props: TextAreaProps) => {
  return (
    <Input.TextArea {...props} />
  )
}