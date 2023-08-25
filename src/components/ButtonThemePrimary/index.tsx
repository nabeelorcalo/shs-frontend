import React, {MutableRefObject, useEffect, useState} from "react";
import { Button as AntButton } from 'antd'
import type { ButtonProps } from 'antd';
import './style.scss'
import {ButtonPrimaryColorState} from '../../store';
import { useRecoilValue } from 'recoil';

interface IButtonProps {
  children?: React.ReactNode
  ref?: MutableRefObject<null>;
}

export const ButtonThemePrimary = ({
  ref,
  className = '',
  children,
  ...rest
}: IButtonProps & ButtonProps): JSX.Element => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const combinedClasses = `button-theme-primary ${className}`;
  const buttonPrimaryColor = useRecoilValue(ButtonPrimaryColorState)
  document.documentElement.style.setProperty('--theme-button-primary-bg', buttonPrimaryColor);
  

  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <AntButton className={combinedClasses} {...rest}>
      {children}
    </AntButton>
  )
}