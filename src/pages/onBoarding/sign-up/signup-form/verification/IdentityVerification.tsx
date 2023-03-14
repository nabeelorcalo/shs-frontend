import React from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import { BackButton,SHSLogo  } from "../../../../../assets/images";
import "../../../styles.scss";

const IdentityVerification = (props: any) => {

  const { Option } = Select;
  const { currentStep, setCurrentStep } = props;
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  return (
    <div className="identity">
      <Row className="identity-style">
        <Col xxl={8} xl={8} lg={14} md={18} sm={24} xs={24}>
          <div className="logo-wrapper">
            <SHSLogo />
          </div>
          <div className="form-inner-wrapper">
            <div className="main-title-wrapper">
              <Typography className="steps">Step 1 of 7</Typography>
              <div className="flex items-center">
                <div>
                  <BackButton />
                </div>
                <div className="mx-auto">
                  <Typography.Title level={3}>
                    Identity Verification
                  </Typography.Title>
                </div>
              </div>

              <Typography className="steps-description">
                Verifying your identity makes it easier for employers to
                shortlist candidates
              </Typography>
            </div>
            <div className="sign-up-form-wrapper">
            
                <Row gutter={20}>
                  <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Form.Item
                      label="First Name"
                      name="firstName"
                      rules={[
                        {
                          required: true,
                          message: "Please input your First Name!",
                        },
                      ]}
                    >
                      <Input placeholder="First Name" className="input-style" />
                    </Form.Item>
                  </Col>
                  <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Form.Item
                      label="Last Name"
                      name="lastName"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Last Name!",
                        },
                      ]}
                    >
                      <Input placeholder="Last Name" className="input-style" />
                    </Form.Item>
                  </Col>
                </Row>

              <Form.Item
                label="Country"
                name="Country"
                rules={[
                  { required: true, message: "Please input your Country!" },
                ]}
              >
                <Input placeholder="Country" className="input-style" />
              </Form.Item>
              <Form.Item
                label="Document Type"
                name="Document Type"
                rules={[
                  {
                    required: true,
                    message: "Please input your Document Type!",
                  },
                ]}
              >
                <Input placeholder="Document Type" className="input-style" />
              </Form.Item>

                <Row gutter={[130,10]}>
                  <Col xxl={4} xl={4} lg={4} md={24} sm={24} xs={24}>
                    <Button
                      className="btn-cancel btn-cancel-verification"
                      //htmlType="submit"
                    >
                      Skip
                    </Button>
                  </Col>
                  <Col xxl={18} xl={20} lg={20} md={24} sm={24} xs={24}>
                    <Form.Item>
                      <Button
                        onClick={() => {
                          console.log('hello')
                          setCurrentStep(2);
                        }}
                        type="primary"
                         //htmlType="submit"
                        className="login-form-button"
                      >
                        Next
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>

              <div>
                <Typography className="text-center">
                  Why I need to verify myself?
                </Typography>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default IdentityVerification;
