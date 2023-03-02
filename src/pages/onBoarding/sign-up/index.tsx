import { Col, Row, Typography } from "antd";
import React from "react";
import SignupForm from "./signup-form/SignupForm";
import "../styles.scss";
import {  SHSLogo } from "../../../assets/images";

const SignUp = () => {
  return (
    <div className="signup-form">
      <Row className="form-style">
        <Col xxl={12} xl={12} lg={14} md={18} sm={24} xs={24}>
          <div className="logo-wrapper">
      <SHSLogo/>
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
