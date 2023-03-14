import React from "react";
import { Col, Row, Typography } from "antd";
import SigninForm from "./signinform/signinForm";
import { SHSLogo } from "../../../assets/images";
import "./signin.scss";

const role: string = "Student";
const SignIn = () => {
  return (
    <div className="login-form">
      <Row className="form-style">
        <Col xxl={8} xl={8} lg={12} md={15} sm={24} xs={24}>
          <div className="logo-wrapper">
            <SHSLogo />
          </div>
          <div className="form-inner-wrapper">
            <div className="main-title-wrapper">
              <Typography.Title level={2}>Welcome back!</Typography.Title>
              <Typography.Title level={3}>
                Login to {role} Help Squad
              </Typography.Title>
            </div>
            <SigninForm />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignIn;
