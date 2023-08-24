import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { IconPColorState, IconSColorState, currentUserState } from '../../../../../store'
import { ColorReset } from '../../../../../assets/images'

function SideMenuIconsColor() {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [iconsPColor, setIconsPColor] = useRecoilState(IconPColorState);
  const [iconsSColor, setIconsSColor] = useRecoilState(IconSColorState);
  const currentUser = useRecoilValue(currentUserState)


  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleChangeIconColorPrimary = (event: any) => {
    const value = event.target.value
    setIconsPColor(value)
  }

  const handleRefreshIconColorPrimary = () => {
    setIconsPColor(currentUser?.company?.sideMenuIconPrimaryColor)
  }

  const handleChangeIconColorSecondary = (event: any) => {
    const value = event.target.value
    setIconsSColor(value)
  }

  const handleRefreshIconColorSecondary = () => {
    setIconsSColor(currentUser?.company?.sideMenuIconSecondaryColor);
  }


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div>
      <div className="color-picker-group">
        <div className="color-picker-label">Primary</div>
        <div className="color-picker-row">
          <div className="color-picker-input-bg">
            <input
              type="color"
              value={iconsPColor}
              onChange={handleChangeIconColorPrimary}
            />
          </div>
          <div className="color-picker-input-value">
            <input
              type="text"
              value={iconsPColor}
              onChange={handleChangeIconColorPrimary}
            />
          </div>
          <div className="color-picker-reset" onClick={handleRefreshIconColorPrimary}>
            <ColorReset />
          </div>
        </div>
      </div>

      <div className="color-picker-group">
        <div className="color-picker-label">Secondary</div>
        <div className="color-picker-row">
          <div className="color-picker-input-bg">
            <input
              type="color"
              value={iconsSColor}
              onChange={handleChangeIconColorSecondary}
            />
          </div>
          <div className="color-picker-input-value">
            <input
              type="text"
              value={iconsSColor}
              onChange={handleChangeIconColorSecondary}
            />
          </div>
          <div className="color-picker-reset" onClick={handleRefreshIconColorSecondary}>
            <ColorReset />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideMenuIconsColor