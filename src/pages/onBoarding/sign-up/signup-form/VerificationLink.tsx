import React, { useState } from "react";
import { Button, Col, Row, Typography } from "antd";
import { SHSLogo } from "../../../../assets/images";
import fly from "../../../../assets/images/login/fly.png";
import "../../styles.scss";
import useCustomHook from "../../sign-in/actionHandler";
import { Notifications } from "../../../../components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../../../config/constants";

const VerificationLink = () => {
  const { initVerifcation } = useCustomHook();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

  const [btnLoading, setBtnLoading] = useState(false);

  const retryVerification = async () => {
    setBtnLoading(true);
    if(!email) {
      return Notifications({
        title: "Errir",
        description: "Something went wrong",
        type: "error",
      });
    }
    const res = await initVerifcation({ email });
    if (res.statusCode === 201) {
      Notifications({
        title: "Success",
        description: "Verification Started Successfully",
        type: "success",
      });
      setBtnLoading(false);
    }
    setBtnLoading(false);
  };
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
                <Button loading={btnLoading} type="link" className="a-tag-signup" onClick={() => retryVerification()}>
                  Resend
                </Button>
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
