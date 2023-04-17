import React from "react";
import { Button, Upload, Col, Form, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { SHSLogo, BackButton, Round } from "../../../../../assets/images";
import "../../../styles.scss";


const Video = (props: any) => {
  const navigate = useNavigate();
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
        <Col xxl={8} xl={9} lg={14} md={14} sm={24} xs={24}>
          <div className="logo-wrapper">
            <SHSLogo />
          </div>
          <div className="form-inner-wrapper">
            <div className="main-title-wrapper">
              <Typography className="steps">Step 7 of 7</Typography>
              <div className="flex items-center mt-3 mb-3">
                <div>
                  <BackButton />
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
              <Form.Item
                name="upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                className="flex justify-center mt-10"
              >
 
                <Upload name="logo" action="/upload.do" listType="picture">
                  <div className="main-box-video">
                    <div className="secondary-box-div">
                      <div className="inner-box-video">
                       <Round/>
                      </div>
                    </div>
                  </div>
                </Upload>
              </Form.Item>
              <Row gutter={[10,10]}>
                <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
                  <Button
                    className="btn-cancel btn-cancel-verification"
                    //htmlType="submit"
                  >
                    Skip
                  </Button>
                </Col>
                <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
                  <Form.Item>
                    <Button
                      onClick={() => {
                        navigate('/')
                      }}
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
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

export default Video;
