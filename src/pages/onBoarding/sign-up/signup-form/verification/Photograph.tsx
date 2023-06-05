import React, { useState } from "react";
import { Button, Upload, Col, Form, Row, Typography } from "antd";
import { SHSLogo, BackButton, UploadUserProfile, } from "../../../../../assets/images";
import "../../../styles.scss";
import useCustomHook from "../../../actionHandler";

const Photograph = (props: any) => {
  const { currentStep, setCurrentStep } = props;
  const [photoFile, setPhotoFile] = useState([])
  const handlePhotoUpload = (event: any) => {
    const file = event.target.files[0];
    setPhotoFile(file);
  };
  const action = useCustomHook();
  const onFinish = (values: any) => {
    console.log('photo  : ', values)
    //  action.verifcationStudent({values,currentStep})
    setCurrentStep(7);
  }

  return (
    <div className="university-detail">
      <Row className="university-detail-style">
        <Col xxl={8} xl={9} lg={14} md={14} sm={24} xs={24}>
          <div className="logo-wrapper">
            <SHSLogo />
          </div>
          <div className="form-inner-wrapper">
            <div className="main-title-wrapper">
              <Typography className="steps">Step 6 of 7</Typography>
              <div className="flex items-center mt-3 mb-3">
                <div>
                  <BackButton
                    onClick={() => {
                      setCurrentStep(5);
                    }} />
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
              <Form
                layout='vertical'
                name='normal_login'
                className='login-form'
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="photo"
                  // valuePropName="fileList"
                  // getValueFromEvent={normFile}
                  className="flex justify-center mt-10"
                >
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} />
                  {/* <button onClick={handleSubmit}>Upload</button> */}
                  {/* <Upload name="logo" listType="picture">
                  <UploadUserProfile />
                </Upload> */}
                </Form.Item>
                <Row gutter={[10, 10]}>
                  <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
                    <Button
                      onClick={() => {
                        setCurrentStep(7);
                      }}
                      className="btn-cancel btn-cancel-verification"
                      htmlType="submit"
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
                      // onClick={() => {
                      //   setCurrentStep(7);
                      // }}
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

export default Photograph;
