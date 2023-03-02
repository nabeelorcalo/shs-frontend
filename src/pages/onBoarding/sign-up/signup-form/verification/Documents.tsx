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
      <SHSLogo/>
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
              <Typography className="steps">Step 4 of 7</Typography>
              <div className="flex align-center justify-around">
                <img src={BackButton} alt="" />
                <Typography.Title level={3}>
                  Identity Documents
                </Typography.Title>
              </div>

              <Typography
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#4E4B66",
                  textAlign: "center",
                }}
              >
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
                  <div style={{ border: "2px dashed black", height: "60px" }}>
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
                  <div style={{ border: "2px dashed black", height: "60px" }}>
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
                  <div style={{ border: "2px dashed black", height: "60px" }}>
                    <Input type="file" style={{ display: "none" }} />
                  </div>
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

export default Documents;
