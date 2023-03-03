import { Button, Col, Row, Typography } from "antd";
import React from "react";
import { SHSLogo } from "../../../../assets/images";
import fly from "../../../../assets/images/login/fly.png";
import "../../sign-in/signin.scss";

const ResetLink = () => {
  return (
    <div className="reset-link">
      <Row className="reset-link-style">
        <Col xxl={8} xl={8} lg={12} md={15} sm={24} xs={24}>
          <div className="logo-wrapper">
            <img src={SHSLogo} alt="error" />
          </div>
          <div className="form-inner-wrapper">
            <div className="fly-wrapper">
              <img src={fly} alt="error" />
            </div>
            <div className="main-wrapper">
              <Typography className="main-title">Check your email</Typography>
              <Typography className="secondary-title">
                We’ve sent you password reset link!
              </Typography>
            </div>
            <div>
              <Typography className="text-center mt-2 mb-2">
                <a href="" className="a-tag-signup">
                  Resend
                </a>
              </Typography>
            </div>
            <div>
              <Typography className="text-center mt-2 mb-2">
                Back to &nbsp;
                <a href="" className="a-tag-signup">
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

export default ResetLink;
