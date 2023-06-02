import React, { useState } from "react";
import { Button, Upload, Col, Form, Row, Typography, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { SHSLogo, BackButton, Round } from "../../../../../assets/images";
import "../../../styles.scss";
import useCustomHook from "../../../actionHandler";

const Video = (props: any) => {
  const { currentStep, setCurrentStep } = props;
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState({});
  const handleVideoUpload = (event: any) => {
    const file = event.target.files[0];
    setSelectedVideo(file);
  };
  const action = useCustomHook();
  const onFinish = (values: any) => {
    console.log("Video", selectedVideo);
    // action.verifcationStudent({selectedVideo, currentStep});
    setCurrentStep(7);
  };

  return (
    <div className="university-detail">
      <Row className="university-detail-style">
        <Col xxl={8} xl={9} lg={14} md={14} sm={24} xs={24}>
          <div className="logo-wrapper">
            <SHSLogo />
          </div>
          <div className="form-inner-wrapper">
            <div className="main-title-wrapper">
              <Typography className="steps">Step 7 of 7</Typography>
              <div className="flex items-center mt-3 mb-3">
                <div>
                  <BackButton
                    onClick={() => {
                      setCurrentStep(6);
                    }}
                  />
                </div>
                <div className="mx-auto">
                  <Typography.Title level={3}>Video</Typography.Title>
                </div>
              </div>
              <Typography className="steps-description">
                Create your video interview to get hired
              </Typography>
            </div>
            <div>
              <Typography className="video-description">
                Create an introductory video by answering the following
                questions in 30 to 60 seconds
              </Typography>
              <ul className="pl-5 pt-2">
                <li className="list-style">Tell us about yourself</li>
                <li className="list-style">
                  Why have you applied for this internship?
                </li>
                <li className="list-style">
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
                  name="introVideo"
                  className="flex justify-center mt-10"
                >
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                  />
                  <Button>Select Video</Button>
                  {/* </Upload> */}
                </Form.Item>
                <Row gutter={[10, 10]}>
                  <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
                    <Button
                      onClick={() => {
                        navigate("/");
                      }}
                      className="btn-cancel btn-cancel-verification"
                    //htmlType="submit"
                    >
                      Skip
                    </Button>
                  </Col>
                  <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                      >
                        Next
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Video;
