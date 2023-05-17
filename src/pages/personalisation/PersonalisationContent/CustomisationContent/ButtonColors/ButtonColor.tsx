import React, { useState } from "react";
import { Col, Divider, Row, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import "./styles.scss"

function ButtonColor({
  buttonPrimaryColor,
  setButtonPrimaryColor,
  buttonSecondaryColor,
  setButtonSecondaryColor,
}: any) {
  const handleColorChangePrimary = (event: any) => {
    setButtonPrimaryColor(event.target.value);
  };

  const handleRefreshPrimary = () => {
    setButtonPrimaryColor();
  };

  const handleColorChangeSecondary = (event: any) => {
    setButtonSecondaryColor(event.target.value);
  };

  const handleRefreshSecondary = () => {
    setButtonSecondaryColor();
  };
  return (
    <div>
      <h4 className="font-medium text-xl mb-4 m-4">Button Colors</h4>
      <div className="m-4 ">
        <div className="flex gap-2 flex-col mb-4">
          <h5 className="">Primary</h5>
          <div className="grid grid-cols-6 w-full">
            <div className="col-span-1">
              <input
                type="color"
                value={buttonPrimaryColor}
                onChange={handleColorChangePrimary}
                id="primary_color"
                className="field-radio"
              />
            </div>
            <div className="col-start-2 col-span-4">
              <input
                type="text"
                value={buttonPrimaryColor}
                onChange={handleColorChangePrimary}
                className="h-10 border-none  rounded-md p-4 w-11/12 input-color-primary"
              />
            </div>
            <div className="col-span-1">
              <Button
                className="w-10 min-w-10 min-h-10 h-10 sky-blue-color-bg  p-0 shadow-none"
                icon={<ReloadOutlined />}
                onClick={handleRefreshPrimary}
                type="primary"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-col mb-4">
          <h5 className="text-slate-400 ">Secondary</h5>
          <div className="grid grid-cols-6 w-full">
            <div className="col-span-1">
              <input
                type="color"
                value={buttonSecondaryColor}
                onChange={handleColorChangeSecondary}
                id="primary_color"
                className="field-radio"
              />
            </div>
            <div className="col-start-2 col-span-4">
              <input
                type="text"
                value={buttonSecondaryColor}
                onChange={handleColorChangeSecondary}
                className="h-10 border-none sky-blue-color-bg  rounded-md p-4 w-11/12"
              />
            </div>
            <div className="col-span-1">
              <Button
                className="w-10 min-w-10 min-h-10 h-10 sky-blue-color-bg  p-0 shadow-none"
                icon={<ReloadOutlined />}
                onClick={handleRefreshSecondary}
                type="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ButtonColor;
