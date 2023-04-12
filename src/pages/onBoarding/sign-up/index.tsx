import React from "react";
import { Col, Row, Typography } from "antd";
import SignupForm from "./signup-form/SignupForm";
import { SHSLogo } from "../../../assets/images";
import "../styles.scss";
import { useSearchParams } from "react-router-dom";

interface SignupRoleInterface {
  [key: string]: string;
}

const SignUp = () => {
  const [searchParams] = useSearchParams();
  const signupRole = searchParams.get("signupRole");
  console.log(signupRole, "signupRole");

  const TagLine: SignupRoleInterface = {
    MANAGER: "Manage your interns.",
    STUDENT: "Find the right career path.",
    COMPANY_ADMIN: "Empower the Leaders of tomorrow.",
    UNIVERSITY: "See Your Students Grow",
    DELEGATE_AGENT : 'Become a delegate',
    PROPERTY_AGENT : 'Become a Property Agent'


  };

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
                {TagLine[signupRole ? signupRole : "STUDENT"]}
              </Typography.Title>
            </div>
            <SignupForm signupRole={signupRole} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
