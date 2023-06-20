import React from 'react';
import { Button } from 'antd';

interface ButtonProps {
  icon: any,
  className: any,
  name?: string,
  type?: "primary" | "text" | "link",
  onClick?: () => void,
  isDisabled?: boolean,
}

export const IconButton: any = (props: ButtonProps) => {
  return (
    <Button {...props} />
  )
}