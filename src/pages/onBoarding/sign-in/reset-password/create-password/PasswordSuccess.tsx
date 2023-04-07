import { Col, Row, Typography } from "antd";
import { SHSLogo } from "../../../../../assets/images";
import React from "react";
import "../../../sign-in/signin.scss";
import fly from "../../../../../assets/images/login/fly.png";

const PasswordSuccess = () => {
  return (
    <div className="password-success">
      <Row className="password-success-style">
        <Col xxl={8} xl={8} lg={12} md={15} sm={24} xs={24}>
          <div className="logo-wrapper">
            <SHSLogo />
          </div>
          <div className="form-inner-wrapper">
            <div className="fly-wrapper">
              <img src={fly} alt="error" />
            </div>
            <div className="main-wrapper">
              <Typography
                className="text-[#363565] text-3xl font-medium text-center font-[outfit]">
                Password Reset Successful
              </Typography>
              <Typography
                className="text-[#4E4B66] text-base font-medium text-center font-[outfit]">
                Your password has been reset successfully.
              </Typography>
            </div>

            <div>
              <Typography className="text-center mt-2 mb-2">
                Back to &nbsp;
                <a href="/login" className="text-[#E95060]">
                  Login
                </a>
              </Typography>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PasswordSuccess;
