import React from 'react';
import { Button } from 'antd';

interface ButtonProps {
  icon: any,
  className: any,
  onClick?: () => void,
}

export const IconButton: any = (props: ButtonProps) => {
  return (
    <Button {...props} />
  )
}