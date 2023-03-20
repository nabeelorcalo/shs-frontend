import { Button } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import useThemeHook from '../../theme';
import "./style.scss";

const Attendance = () => {
  const action = useThemeHook();
  const primaryColor = {colorPrimary: "green", colorPrimaryHover: "green"};
  const secondaryColor = {colorPrimary: "green", colorPrimaryHover: "green"};

  return (
    <>
      <Button type="primary" className="" onClick={() => action.updateTheme(primaryColor)}>
        Primary Button
      </Button>

      <Button className="" type="default" onClick={() => action.updateTheme(primaryColor)}>
        Default Button
      </Button>

      <Button className="secondary-color-btn" type="default" onClick={() => action.updateTheme(primaryColor)}>
        Secondary Button
      </Button>
    </>
  )
}

export default Attendance