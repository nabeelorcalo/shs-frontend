import { Col, Row, Typography } from "antd";

import "./signin.scss";
import React from "react";
import SigninForm from "./signin-form/SigninForm";
import logo from "../../assets/login/shslogo.svg";

const role: string = "Student";
const SignIn = () => {
  return (
    <div className="login-form">
      <Row className="form-style">
        <Col xxl={8} xl={8} lg={12} md={15} sm={24} xs={24}>
          <div className="logo-wrapper">
            <img src={logo} alt="error" />
          </div>
          <div
            style={{
              border: "1px solid #D9DBE9",
              boxShadow: "0px 0px 8px 1px rgba(9, 161, 218, 0.1)",
              borderRadius: "16px",
              padding: "2rem",
            }}
          >
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
