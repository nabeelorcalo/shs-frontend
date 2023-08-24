import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import "./styles.scss"
import { 
  ButtonPrimaryColorState,
  ButtonSecondaryColorState,
  currentUserState 
} from "../../../../../store";
import {
  ColorReset
} from "../../../../../assets/images";


function ButtonColor() {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const currentUser = useRecoilValue(currentUserState)
  const [buttonPrimaryColor, setButtonPrimaryColor] = useRecoilState(ButtonPrimaryColorState);
  const [buttonSecondaryColor, setButtonSecondaryColor] = useRecoilState(ButtonSecondaryColorState);


  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleColorChangePrimary = (event: any) => {
    const value = event.target.value;
    setButtonPrimaryColor(value);
  };

  const handleRefreshPrimary = () => {
    setButtonPrimaryColor(currentUser?.company?.buttonPrimaryColor);
  };

  const handleColorChangeSecondary = (event: any) => {
    const value = event.target.value;
    setButtonSecondaryColor(value);
  };

  const handleRefreshSecondary = () => {
    setButtonPrimaryColor(currentUser?.company?.buttonSecondaryColor);
  };


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="button-theme-colors">
      <div className="color-picker-group">
        <div className="color-picker-label">Primary</div>
        <div className="color-picker-row">
          <div className="color-picker-input-bg">
            <input
              type="color"
              value={buttonPrimaryColor}
              onChange={handleColorChangePrimary}
              className="field-radio"
            />
          </div>
          <div className="color-picker-input-value">
            <input
              type="text"
              value={buttonPrimaryColor}
              onChange={handleColorChangePrimary}
            />
          </div>
          <div className="color-picker-reset" onClick={handleRefreshPrimary}>
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
              value={buttonSecondaryColor}
              onChange={handleColorChangeSecondary}
            />
          </div>
          <div className="color-picker-input-value">
            <input
              type="text"
              value={buttonSecondaryColor}
              onChange={handleColorChangeSecondary}
            />
          </div>
          <div className="color-picker-reset" onClick={handleRefreshSecondary}>
            <ColorReset />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ButtonColor;
