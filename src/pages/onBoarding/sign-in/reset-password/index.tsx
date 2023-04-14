import { Col, Row, Typography } from "antd";
import { SHSLogo } from "../../../../assets/images";
import ResetPasswordForm from "./ResetPasswordForm";
import "../../sign-in/signin.scss";

const ResetPassword = () => {
  return (
    <div className="reset-form">
      <Row className="reset-form-style">
        <Col xxl={8} xl={8} lg={12} md={15} sm={24} xs={24}>
          <div className="logo-wrapper">
            <SHSLogo />
          </div>
          <div
            className="border-1 border-solid border-[#D9DBE9] card-style p-4">
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
