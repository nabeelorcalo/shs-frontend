import React, { useState } from "react";
import { Button, Upload, Col, Form, Row, Typography, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { SHSLogo, BackButton, Round } from "../../../../../assets/images";
import "../../../styles.scss";
import useCustomHook from "../../../actionHandler";
import { Notifications } from "../../../../../components";
import { ROUTES_CONSTANTS } from "../../../../../config/constants";

const Video = (props: any) => {
  const { currentStep, setCurrentStep } = props;
  const [dynSkip, setDynSkip] = useState<boolean>(false);
  const navigate = useNavigate();
  const [profileVideo, setProfileVideo] = useState<any>([]);
  const { verifcationStudent } = useCustomHook();

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    setProfileVideo(e?.fileList)
    return e?.fileList;
  };
  const onFinish = async (values: any) => {
    console.log("Video", profileVideo);
    if(profileVideo.length === 0) {
      Notifications({
        title: "Error",
        description: `Please select an image`,
        type: "error",
      });
      return 
    }
    const payloadForm = new FormData()
    payloadForm.append('introVideo', profileVideo[0].originFileObj)
    const response = await verifcationStudent(payloadForm, { step: 7, skip: false })
    if(response.statusCode != 201) {
      Notifications({
        title: "Error",
        description: `Failed to add data`,
        type: "error",
      });
      return 
    }
    navigate(`/${ROUTES_CONSTANTS.DASHBOARD}`);
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
                      setCurrentStep(currentStep - 1);
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
                initialValues={{ remember: !dynSkip }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="introVideo"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  className="flex justify-center mt-10"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Upload name="introVideo" listType="picture" beforeUpload={() => false}>
                    <div className="main-box-video">
                      <div className="secondary-box-div">
                        <div className="inner-box-video">
                          <Round className="absolute left-[13px] top-[14px]" />
                        </div>
                      </div>
                    </div>
                  </Upload>
                </Form.Item>
                <Row gutter={[10, 10]}>
                  <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
                    <Button
                      className="btn-cancel btn-cancel-verification"
                      onClick={() => {
                        setDynSkip(true);
                        verifcationStudent({}, { step: 7, skip: true }).then((data: any) => {
                          setCurrentStep(currentStep + 1);
                          navigate('/')
                        })
                      }}
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
