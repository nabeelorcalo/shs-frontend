import React from "react";
import { Button as AntButton } from 'antd'
import type { ButtonProps } from 'antd';
import './style.scss'
import {ButtonSecondaryColorState} from '../../store';
import { useRecoilValue } from 'recoil';

interface IButtonProps {
  customType?: 'secondary' | 'tertiary' | 'sky-blue'
  children?: React.ReactNode
}

export const ButtonThemeSecondary = ({
  customType,
  children,
  ...rest
}: IButtonProps & ButtonProps): JSX.Element => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const buttonSecondaryColor = useRecoilValue(ButtonSecondaryColorState)
  document.documentElement.style.setProperty('--theme-button-secondary', buttonSecondaryColor);
  

  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <AntButton ghost className="button-theme-secondary" {...rest}>
      {children}
    </AntButton>
  )
}