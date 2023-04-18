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
        <Col xxl={8} xl={10} lg={14} md={18} sm={24} xs={22}>
          <div className="logo-wrapper">
            <SHSLogo />
          </div>
          <div className="form-inner-wrapper">
            <div className="main-title-wrapper">
              <Typography className="primary-color text-[38px] font-medium">Welcome back!</Typography>
              <Typography className="primary-color text-[30px] font-medium pb-2">
                Login to {role} Help Squad
              </Typography>
            </div>
            <SigninForm />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignIn;
