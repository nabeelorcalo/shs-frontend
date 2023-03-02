import { Col, Row, Typography } from "antd";
import React from "react";
import "../../../sign-in/signin.scss";
import { SHSLogo } from "../../../../../assets/images";
import CreatePasswordForm from "./CreatePasswordForm";

const role: string = "Student";

const CreatePassword = () => {
  return (
    <div>
      <div className="create-password">
        <Row className="form-style">
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
                <Typography.Title level={2}>Create Password</Typography.Title>
                <Typography.Title level={3}>
                  Login to {role} Help Squad
                </Typography.Title>
              </div>
              <CreatePasswordForm/>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CreatePassword;
