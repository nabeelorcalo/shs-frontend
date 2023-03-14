import React from "react";
import { Col, Row, Typography } from "antd";
import SignupForm from "./signup-form/SignupForm";
import { SHSLogo } from "../../../assets/images";
import "../styles.scss";

const SignUp = () => {
  return (
    <div className="signup-form">
      <Row className="form-style">
        <Col xxl={9} xl={9} lg={14} md={14} sm={24} xs={24}>
          <div className="logo-wrapper">
            <SHSLogo />
          </div>
          <div className="form-inner-wrapper">
            <div className="main-title-wrapper">
              <Typography.Title level={2}>Sign up</Typography.Title>
              <Typography.Title level={3}>
                Find the right career path
              </Typography.Title>
            </div>
            <SignupForm />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
