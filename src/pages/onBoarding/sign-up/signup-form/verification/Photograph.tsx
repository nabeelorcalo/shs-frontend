import {
  Button,
  Upload,
  Col,
  Form,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import React, { useState } from "react";
import { SHSLogo, BackButton } from "../../../../../assets/images";
import "./Verification.scss";
import uploadImage from "../../../../../assets/images/login/uploadimage.png";

const { Option } = Select;

const Photograph = (props: any) => {
  const { currentStep, setCurrentStep } = props;
  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <div className="university-detail">
      <Row className="university-detail-style">
        <Col xxl={9} xl={9} lg={14} md={14} sm={24} xs={24}>
          <div className="logo-wrapper">
            <img src={SHSLogo} alt="error" />
          </div>
          <div className="form-inner-wrapper">
            <div className="main-title-wrapper">
              <Typography className="steps">Step 6 of 7</Typography>
              <div className="flex items-center">
                <div>
                  <img src={BackButton} alt="error" />
                </div>
                <div className="mx-auto">
                  <Typography.Title level={3}>Photograph</Typography.Title>
                </div>
              </div>

              <Typography
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#4E4B66",
                  textAlign: "center",
                }}
              >
                Upload your profile picture
              </Typography>
            </div>

            <div className="text-center">
              <Typography
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  fontFamily: "Outfit",
                  color: "#14142A",
                }}
              >
                A photo of you
              </Typography>
              <Typography className="steps-description">
                Take a minute to upload a profile photo.
              </Typography>
            </div>
            <div className="sign-up-form-wrapper">
              <Form.Item
                name="upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                className="flex justify-center mt-10"
              >
                <Upload name="logo" action="/upload.do" listType="picture">
                  <img src={uploadImage} alt="" />
                </Upload>
              </Form.Item>
              <Row gutter={10}>
                <Col xxl={4} xl={4} lg={4} md={24} sm={24} xs={24}>
                  <Button
                    className="btn-cancel btn-cancel-verification"
                    htmlType="submit"
                  >
                    Skip
                  </Button>
                </Col>
                <Col xxl={20} xl={20} lg={20} md={24} sm={24} xs={24}>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      onClick={() => {
                        setCurrentStep(7);
                      }}
                    >
                      Next
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Photograph;
