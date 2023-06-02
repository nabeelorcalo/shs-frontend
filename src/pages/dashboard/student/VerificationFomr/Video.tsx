import { Button, Upload, Col, Form, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { BackButton, Round } from "../../../../assets/images";
import { useState } from "react";
import useCustomHook from "../../actionHandler";

const Video = (props: any) => {
  const navigate = useNavigate();
  const { currentStep, setCurrentStep } = props;
  const [profileVideo, setProfileVideo] = useState<any>([]);
  
  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    setProfileVideo(e?.fileList)
    return e?.fileList;
  };

  const action = useCustomHook();
  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append("video", profileVideo[0].originFileObj);
    action.verifcationStudentData(formData, { skip: false, step: 7 })
    navigate('/')
  }

  return (
    <div className="university-detail">
      <Row className="university-detail-style">
        <Col xxl={12} xl={12} lg={14} md={14} sm={24} xs={24}>
          <div className="form-wrapper">
            <div className="main-title-wrapper">
              <div className="flex items-center mt-3 mb-3">
                <div>
                  <BackButton onClick={() => { setCurrentStep(6) }} />
                </div>
                <div className="mx-auto">
                  <Typography className="main-heading-verify">Video</Typography>
                </div>
              </div>
              <Typography className="steps-description">
                Create your video interview to get hired
              </Typography>
            </div>
            <div>
              <Typography className="video-description text-center my-5">
                Create an introductory video by answering the following
                questions in 30 to 60 seconds
              </Typography>
              <ul>
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
                layout='vertical'
                name='normal_login'
                className='login-form'
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="introVideo"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  className="flex justify-center mt-10"
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
                <Row gutter={[5, 5]}>
                  <Col xs={24} md={24} lg={12} xl={6} xxl={6}>
                    <Button className="btn-cancel btn-cancel-verification"
                      onClick={() => {
                        navigate('/')
                      }} >
                      Skip
                    </Button>
                  </Col>
                  <Col xs={24} md={24} lg={12} xl={18} xxl={18}>
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
