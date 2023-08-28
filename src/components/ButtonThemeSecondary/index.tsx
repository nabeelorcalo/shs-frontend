import React, { MutableRefObject } from "react";
import { Button as AntButton } from 'antd'
import type { ButtonProps } from 'antd';
import './style.scss'
import {ButtonSecondaryColorState} from '../../store';
import { useRecoilValue } from 'recoil';

interface IButtonProps {
  children?: React.ReactNode
  ref?: MutableRefObject<null>;
}

export const ButtonThemeSecondary = ({
  ref,
  className = '',
  children,
  ...rest
}: IButtonProps & ButtonProps): JSX.Element => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const combinedClasses = `button-theme-secondary ${className}`;
  const buttonSecondaryColor = useRecoilValue(ButtonSecondaryColorState);
  document.documentElement.style.setProperty('--theme-button-secondary', buttonSecondaryColor);
  

  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <AntButton ghost className={combinedClasses} {...rest}>
      {children}
    </AntButton>
  )
}