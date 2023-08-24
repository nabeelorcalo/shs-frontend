import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { sbColorState, sbPreviewColorState, currentUserState } from '../../../../../store';
import { ColorReset } from '../../../../../assets/images';


function SideMenuColor() {
   /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const currentUser = useRecoilValue(currentUserState);
  const defaultColor = currentUser?.company?.sideMenuColor;
  const [sbColor, setSBColor] = useRecoilState(sbColorState);
  const [sbPreviewColor, setSbPreviewColor] = useRecoilState(sbPreviewColorState);
  

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleColorChangePrimary = (event: any) => {
    const value = event.target.value;
    setSbPreviewColor(value);
    setSBColor(value);
  }
  const handleRefreshPrimary = () => {
    setSBColor(defaultColor)
    setSbPreviewColor(defaultColor)
  }


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className='side-menu-theme-color'>
      <div className="color-picker-group">
        <div className="color-picker-label">Primary</div>

        <div className="color-picker-row">
          
          <div className="color-picker-input-bg">
            <input
              type="color"
              value={sbPreviewColor}
              onChange={handleColorChangePrimary}
            />
          </div>

          <div className="color-picker-input-value">
            <input
              type="text"
              value={sbPreviewColor}
              onChange={handleColorChangePrimary}
            />
          </div>

          <div className="color-picker-reset" onClick={handleRefreshPrimary}>
            <ColorReset />
          </div>

        </div>
      </div>
    </div>
  )
}

export default SideMenuColor