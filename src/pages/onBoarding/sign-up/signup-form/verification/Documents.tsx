import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import React from "react";
import { SHSLogo } from "../../../../../assets/images";
import "./Verification.scss";

import { BackButton } from "../../../../../assets/images";

const Documents = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  const { Option } = Select;
  return (
    <div className="identity">
      <Row className="identity-style">
        <Col xxl={10} xl={10} lg={14} md={18} sm={24} xs={24}>
          <div className="logo-wrapper">
            <SHSLogo />
          </div>
          <div className="form-inner-wrapper">
            <div className="main-title-wrapper">
              <Typography className="steps">Step 4 of 7</Typography>
              <div className="flex items-center">
                <div>
                  <BackButton />
                </div>
                <div className="mx-auto">
                  <Typography.Title level={3}>
                    Identity Documents
                  </Typography.Title>
                </div>
              </div>

              <Typography className="steps-description">
                Provide your identity documents for verification
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
                <Form.Item
                  name="Visa Status"
                  label="Visa Status"
                  rules={[
                    { required: true, message: "Please select Visa Status!" },
                  ]}
                >
                  <Select placeholder="select your Visa Status" size="large">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="CV"
                  name="CVDocument"
                  rules={[
                    {
                      required: true,
                      message: "Please  Valid Document!",
                    },
                  ]}
                  style={{ width: "100%", marginBottom: "20px" }}
                >
                  <div
                    style={{
                      border: "2px dashed black",
                      height: "60px",
                      width: "100%",
                    }}
                  >
                    <Input type="file" style={{ display: "none" }} />
                  </div>
                </Form.Item>
                <Form.Item
                  label="Passport"
                  name="PassportDocument"
                  rules={[
                    {
                      required: true,
                      message: "Please  Valid Document!",
                    },
                  ]}
                  style={{ width: "100%", marginBottom: "20px" }}
                >
                  <div
                    style={{
                      border: "2px dashed black",
                      height: "60px",
                      width: "100%",
                    }}
                  >
                    <Input type="file" style={{ display: "none" }} />
                  </div>
                </Form.Item>
                <Form.Item
                  label="BRP"
                  name="BRPDocument"
                  rules={[
                    {
                      required: true,
                      message: "Please Upload Valid Document!",
                    },
                  ]}
                  style={{ width: "100%", marginBottom: "20px" }}
                >
                  <div
                    style={{
                      border: "2px dashed black",
                      height: "60px",
                      width: "100%",
                    }}
                  >
                    <Input type="file" style={{ display: "none" }} />
                  </div>
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

export default Documents;
