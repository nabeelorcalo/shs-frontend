import { Col, Row, Typography } from "antd";
import { SHSLogo } from "../../../../../assets/images";
import React from "react";
import "../../../sign-in/signin.scss";
import fly from "../../../../assets/login/fly.png";

const PasswordSuccess = () => {
  return (
    <div className="password-success">
      <Row className="password-success-style">
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
            <div className="fly-wrapper">
              <img src={fly} alt="error" />
            </div>
            <div className="main-wrapper">
              <Typography
                style={{
                  color: "#363565",
                  fontSize: "30px",
                  fontWeight: 500,
                  lineHeight: "40px",
                  fontFamily: "Outfit",
                  textAlign: "center",
                }}
              >
                Password Reset Successful
              </Typography>
              <Typography
                style={{
                  color: "#4E4B66",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "40px",
                  fontFamily: "Outfit",
                  textAlign: "center",
                }}
              >
                Your password has been reset successfully.
              </Typography>
            </div>

            <div>
              <Typography className="text-center mt-2 mb-2">
                Back to &nbsp;
                <a href="" style={{ color: "#E95060" }}>
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
