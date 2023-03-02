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

const onFinish = (values: any) => {
  console.log("Received values of form: ", values);
};
const { Option } = Select;

const Photograph = () => {
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
        <Col xxl={10} xl={10} lg={14} md={18} sm={24} xs={24}>
          <div className="logo-wrapper">
            <img src={SHSLogo} alt="error" />
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
              <Typography className="steps">Step 6 of 7</Typography>
              <div className="flex align-center justify-center">
                <img src={BackButton} alt="" />
                <Typography.Title level={3}>Photograph</Typography.Title>
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
              <Typography
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  fontFamily: "Outfit",
                  color: "#4E4B66",
                }}
              >
                Take a minute to upload a profile photo.
              </Typography>
            </div>
            <div className="sign-up-form-wrapper">
              <Form
                layout="vertical"
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Space>
                  <Button className="btn-cancel" htmlType="submit">
                    Skip
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="btn-primary"
                  >
                    Next
                  </Button>
                </Space>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Photograph;
