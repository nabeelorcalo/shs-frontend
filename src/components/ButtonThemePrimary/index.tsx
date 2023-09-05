import React, { MutableRefObject } from "react";
import { Button as AntButton } from 'antd'
import type { ButtonProps } from 'antd';
import constants from "../../config/constants";
import './style.scss'
import {ButtonPrimaryColorState, currentUserRoleState} from '../../store';
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
  const role = useRecoilValue(currentUserRoleState);
  const combinedClasses = `button-theme-primary ${className}`;
  const buttonPrimaryColor = useRecoilValue(ButtonPrimaryColorState);
  function lightenColor(color:any, percent:any) {
    const r = parseInt(color?.slice(1, 3), 16);
    const g = parseInt(color?.slice(3, 5), 16);
    const b = parseInt(color?.slice(5, 7), 16);
  
    const adjustedR = Math.min(255, r + (255 - r) * (percent / 100));
    const adjustedG = Math.min(255, g + (255 - g) * (percent / 100));
    const adjustedB = Math.min(255, b + (255 - b) * (percent / 100));
  
    return `#${Math.round(adjustedR).toString(16).padStart(2, '0')}${Math.round(adjustedG).toString(16).padStart(2, '0')}${Math.round(adjustedB).toString(16).padStart(2, '0')}`;
  }

  if (role === constants.INTERN || role === constants.COMPANY_ADMIN || role === constants.MANAGER) {
    document.documentElement.style.setProperty('--theme-button-primary-bg', buttonPrimaryColor);
    const lightenedColor = lightenColor(buttonPrimaryColor, 75);
    document.documentElement.style.setProperty('--theme-button-primary-hover', lightenedColor);
  }
  

  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <AntButton className={combinedClasses} {...rest}>
      {children}
    </AntButton>
  )
}