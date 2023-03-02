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
import logo from "../../../../assets/login/shslogo.svg";
import "./Verification.scss";
import back from "../../../../assets/login/BackLoginButton.svg";
import round from "../../../../assets/login/round.svg";

const onFinish = (values: any) => {
  console.log("Received values of form: ", values);
};

const Video = () => {
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
            <img src={logo} alt="error" />
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
              <Typography className="steps">Step 7 of 7</Typography>
              <div className="flex align-center justify-center">
                <img src={back} alt="" />
                <Typography.Title level={3}>Video</Typography.Title>
              </div>

              <Typography
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#4E4B66",
                  textAlign: "center",
                }}
              >
                Create your video interview to get hired
              </Typography>
            </div>
            <div>
              <Typography
                style={{
                  fontSize: "20px",
                  fontWeight: 500,
                  color: "#363565",
                  fontFamily: "Outfit",
                }}
              >
                Create an introductory video by answering the following
                questions in 30 to 60 seconds
              </Typography>
              <ul>
                <li
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#4E4B66",
                    fontFamily: "Outfit",
                  }}
                >
                  Tell us about yourself
                </li>
                <li
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#4E4B66",
                    fontFamily: "Outfit",
                  }}
                >
                  Why have you applied for this internship?
                </li>
                <li
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#4E4B66",
                    fontFamily: "Outfit",
                  }}
                >
                  Why do you want to work in this industry?
                </li>
              </ul>
            </div>

            <div className="sign-up-form-wrapper">
              <Form
                layout="vertical"
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="upload"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  className="flex justify-center mt-10"
                >
                  <Upload name="logo" action="/upload.do" listType="picture">
                    <div
                      style={{
                        border: " 1px solid #E6F4F9",
                        background: "#FFFFFF",
                        boxShadow: "0px 0px 8px 2px rgba(9, 161, 218, 0.1)",
                        borderRadius: "10px",
                        padding: "10px",
                        width: "500px",
                        height: "350px",
                      }}
                    >
                      <div
                        style={{
                          background: "#E6F4F9",

                          borderRadius: "16px",
                          width: "500px",
                          height: "350px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: "45%",
                            left: "45%",
                            border: "10px solid white",
                            borderRadius: "100%",
                            height: "25px",
                            width: "25px",
                          }}
                        >
                          <img
                            src={round}
                            alt=""
                            style={{ marginTop: "2px", marginLeft: "2px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </Upload>
                </Form.Item>
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

export default Video;
