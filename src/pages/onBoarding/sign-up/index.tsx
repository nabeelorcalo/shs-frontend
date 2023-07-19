import React from "react";
import { Col, Row, Typography } from "antd";
import SignupForm from "./signup-form/SignupForm";
import { SHSLogo } from "../../../assets/images";
import "../styles.scss";
import { useSearchParams } from "react-router-dom";
import { ROUTES_CONSTANTS } from '../../../config/constants';

interface SignupRoleInterface {
  [key: string]: string;
}

const SignUp = () => {
  const [searchParams] = useSearchParams();
  const signupRole= searchParams.get('signupRole');
 
  const TagLine: SignupRoleInterface = {
    MANAGER: "Manage your interns.",
    STUDENT: "Find the right career path.",
    COMPANY_ADMIN: "Empower the Leaders of tomorrow.",
    UNIVERSITY: "See Your Students Grow",
    DELEGATE_AGENT : 'Become a Delegate',
    PROPERTY_AGENT : 'Become a Property Agent'
  };

  return (
    <div className="signup-form">
      <Row className="form-style">
        <Col xxl={8} xl={10} lg={14} md={18} sm={24} xs={22}>
          <div className="logo-wrapper">
            <SHSLogo />
          </div>
          <div className="form-inner-wrapper">
            <div className="main-title-wrapper">
              <Typography className="primary-color text-[38px] font-medium">Sign up</Typography>
              <Typography  className="primary-color text-[30px] font-medium pb-10">
                {TagLine[`/${ROUTES_CONSTANTS.SIGNUP}`] || (signupRole && TagLine[signupRole]) || TagLine["STUDENT"]}
              </Typography>
            </div>
            <SignupForm signupRole={signupRole} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
