import React, {useEffect, useState} from "react";
import { Button as AntButton } from 'antd'
import type { ButtonProps } from 'antd';
import './style.scss'
import {ButtonPrimaryColorState} from '../../store';
import { useRecoilValue } from 'recoil';

interface IButtonProps {
  customType?: 'secondary' | 'tertiary' | 'sky-blue'
  children?: React.ReactNode
}

export const ButtonThemePrimary = ({
  customType,
  children,
  ...rest
}: IButtonProps & ButtonProps): JSX.Element => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const buttonPrimaryColor = useRecoilValue(ButtonPrimaryColorState)
  document.documentElement.style.setProperty('--theme-button-primary-bg', buttonPrimaryColor);
  

  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <AntButton className="button-theme-primary" {...rest}>
      {children}
    </AntButton>
  )
}