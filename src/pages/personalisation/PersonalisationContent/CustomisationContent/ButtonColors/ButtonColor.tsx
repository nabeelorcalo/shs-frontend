import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Col, Row, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import "./styles.scss"
import { personalizeColorTheme } from "../../../../../config/constants";
import { 
  ButtonPrimaryColorState,
  ButtonSecondaryColorState,
  currentUserState 
} from "../../../../../store";


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
    <div>
      <Row gutter={[15, 15]}>
        <Col xxl={24} xl={24} lg={24} md={24} xs={24}>
          <h5 className="text-success-placeholder-color">Primary</h5>
        </Col>
        <Col xxl={4} xl={6} lg={2} md={12} xs={24} >
          <input
            type="color"
            value={buttonPrimaryColor}
            onChange={handleColorChangePrimary}
            id="primary_color"
            className="field-radio"
          />
        </Col>
        <Col xxl={15} xl={14} lg={8} md={12} xs={24}>
          <input
            type="text"
            value={buttonPrimaryColor}
            onChange={handleColorChangePrimary}
            className="h-10 border-none sky-blue-color-bg rounded-md md:pl-2"
          />
        </Col>
        <Col xxl={4} xl={12} lg={4} md={12} xs={24} >
          <Button
            className="w-10 min-w-10 min-h-10 h-10 sky-blue-color-bg  p-0 shadow-none"
            style={{ minWidth: "0px" }}
            icon={<ReloadOutlined />}
            onClick={handleRefreshPrimary}
            type="primary"
          />
        </Col>
      </Row>
      <Row gutter={[15, 15]}>
        <Col xxl={24} xl={24} lg={24} md={24} xs={24}>
          <h5 className="text-success-placeholder-color">Secondary</h5>
        </Col>
        <Col xxl={4} xl={4} lg={2} md={12} xs={24} >
          <input
            type="color"
            value={buttonSecondaryColor}
            onChange={handleColorChangeSecondary}
            id="primary_color"
            className="field-radio"
          />
        </Col>
        <Col xxl={15} xl={12} lg={8} md={12} xs={24}>
          <input
            type="text"
            value={buttonSecondaryColor}
            onChange={handleColorChangeSecondary}
            className="h-10 border-none sky-blue-color-bg rounded-md md:pl-2"
          />
        </Col>
        <Col xxl={4} xl={12} lg={4} md={12} xs={24} >
          <Button
            className="w-10 min-w-10 min-h-10 h-10 sky-blue-color-bg  p-0 shadow-none"
            style={{ minWidth: "0px" }}
            icon={<ReloadOutlined />}
            onClick={handleRefreshSecondary}
            type="primary"
          />
        </Col>
      </Row>
    </div>
  );
}

export default ButtonColor;
