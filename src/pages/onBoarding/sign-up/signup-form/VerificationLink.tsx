import React from "react";
import { Col, Row, Typography } from "antd";
import { SHSLogo } from "../../../../assets/images";
import fly from "../../../../assets/images/login/fly.png";
import "../../styles.scss";

const VerificationLink = () => {
  return (
    <div className="verfiction-link">
      <Row className="verfiction-link-style">
        <Col xxl={8} xl={8} lg={12} md={15} sm={24} xs={24}>
          <div className="logo-wrapper">
           <SHSLogo/>
          </div>
          <div className="form-inner-wrapper ">
            <div className="fly-wrapper">
              <img src={fly} alt="error" />
            </div>
            <div className="main-wrapper">
              <Typography className="main-title">Check your email</Typography>
              <Typography className="secondary-title mt-2">
                We’ve sent you verification link!
              </Typography>
            </div>
            <div>
              <Typography className="text-center mt-2 font-bold mb-2">
                <a href="" className="a-tag-signup">
                  Resend
                </a>
              </Typography>
            </div>
            <div>
              <Typography className="text-center mt-12 font-bold mb-2">
                Back to &nbsp;
                <a href="/login" className="a-tag-signup">
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

export default VerificationLink;
