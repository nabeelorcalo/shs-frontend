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

  function lightenColor(color:any, percent:any) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
  
    const adjustedR = Math.min(255, r + (255 - r) * (percent / 100));
    const adjustedG = Math.min(255, g + (255 - g) * (percent / 100));
    const adjustedB = Math.min(255, b + (255 - b) * (percent / 100));
  
    return `#${Math.round(adjustedR).toString(16).padStart(2, '0')}${Math.round(adjustedG).toString(16).padStart(2, '0')}${Math.round(adjustedB).toString(16).padStart(2, '0')}`;
  }

  const lightenedColor = lightenColor(buttonSecondaryColor, 75);
  document.documentElement.style.setProperty('--theme-button-secondary-hover', lightenedColor);
  

  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <AntButton ghost className={combinedClasses} {...rest}>
      {children}
    </AntButton>
  )
}