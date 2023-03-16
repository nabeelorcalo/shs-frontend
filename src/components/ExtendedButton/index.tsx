import React from "react";
import { Button as AntButton } from 'antd'
import type { ButtonProps } from 'antd';
import './style.scss'

interface IButtonProps {
  customType?: 'secondary' | 'tertiary'
  children?: React.ReactNode
}

export const ExtendedButton = ({
  customType,
  children,
  ...rest
}: IButtonProps & ButtonProps): JSX.Element => {
  return (
    <AntButton className={customType ? `button-${customType}` : ""} {...rest}>
      {children}
    </AntButton>
  )
}