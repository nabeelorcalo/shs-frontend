import { Col, Row, Typography } from "antd";
import React from "react";
import { SHSLogo } from "../../../../assets/images";
import "../../sign-in/signin.scss";
import ResetPasswordForm from "./ResetPasswordForm";

const ResetPassword = () => {
  return (
    <div className="reset-form">
      <Row className="reset-form-style">
        <Col xxl={8} xl={8} lg={12} md={15} sm={24} xs={24}>
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
              <Typography.Title level={2}>Reset Password</Typography.Title>
              <Typography.Title level={3}>
                Confirm your email to receive link
              </Typography.Title>
            </div>
            <ResetPasswordForm />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ResetPassword;
