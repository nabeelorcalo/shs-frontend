import React from 'react';
import './style.scss';

interface ToggleProps {
  isToggle: boolean
  onTogglerClick?: any
  FirstIcon: any
  LastIcon: any
  className?: string
}

export const ToggleButton: any = (props: ToggleProps) => {
  const {isToggle, onTogglerClick, FirstIcon, LastIcon, className=''} = props;

  return (
    <div className={`toggler-container ${className}`}>
      <div className={`animate ${isToggle ? "right" : ""}`} />

      <div
        className='toggle-btn'
        onClick={onTogglerClick}
      >
        <FirstIcon
          className={`${!isToggle ? 'selected-btn' : 'blur-btn'}`}
        />
      </div>
      <div
        className='toggle-btn'
        onClick={onTogglerClick}
      >
        <LastIcon
          className={`${isToggle ? 'selected-btn' : 'blur-btn'}`}
        />
      </div>
    </div>
  )
}