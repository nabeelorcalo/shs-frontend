import React, { useState } from "react";
import { Button, Col, Form, Row, Select, Typography } from "antd";
import { BackButton, SHSLogo } from "../../../../../assets/images";
import "../../../styles.scss";
import DragAndDropUpload from "../../../../../components/DragAndDropUpload";
import useCustomHook from "../../../actionHandler";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
const { Option } = Select;

const DbsVerification = (props: any) => {
  const { currentStep, setCurrentStep } = props;
  const [uploadFile, setUploadFile] = useState([])
  const action = useCustomHook();
  const onFinish = (values: any) => {
    console.log('dbsVerification  : ', values)
    //  action.verifcationStudent({values,currentStep})
    setCurrentStep(3);
  }

  return (
    <div className="identity">
      <Row className="identity-style">
        <Col xxl={9} xl={9} lg={14} md={14} sm={24} xs={24}>
          <div className="logo-wrapper">
            <SHSLogo />
          </div>
          <div className="form-inner-wrapper">
            <div className="main-title-wrapper">
              <Typography className="steps">Step 2 of 7</Typography>
              <div className="flex items-center mt-3 mb-3">
                <div>
                  <BackButton
                    onClick={() => {
                      setCurrentStep(1);
                    }}
                  />
                </div>
                <div className="mx-auto">
                  <Typography.Title level={3}>
                    DBS Verification
                  </Typography.Title>
                </div>
              </div>
              <Typography className="steps-description">
                Provide your background details
              </Typography>
            </div>
            <div className="sign-up-form-wrapper">
              <Form
                layout='vertical'
                name='normal_login'
                className='login-form'
                initialValues={{ remember: true }}
                validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
                onFinish={onFinish}
              >
                <Form.Item
                  label="Upload"
                  name="dbsUploadDocument"
                  rules={[{ type: "string" }, { required: true }]}
                  style={{ width: "100%", marginBottom: "20px" }}
                >
                  <div className="dragger">
                    <DragAndDropUpload
                      files={uploadFile}
                      setFiles={setUploadFile}
                    />
                  </div>
                </Form.Item>
                <Typography style={{ marginBottom: "20px" }}>
                  or <a href="">Apply Now</a>
                </Typography>
                <Typography style={{ marginBottom: "20px" }}>
                  You must be 16 or over to apply. It usually takes up to 14 days
                  to receive your certificate.
                </Typography>
                <Row gutter={[10, 10]}>
                  <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
                    <Button
                      onClick={() => {
                        setCurrentStep(3);
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

export default DbsVerification;
