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
import logo from "../../../../assets/login/shslogo.svg";
import "./Verification.scss";
import back from "../../../../assets/login/BackLoginButton.svg";

const onFinish = (values: any) => {
  console.log("Received values of form: ", values);
};
const { Option } = Select;

const IdentityVerification = () => {
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
              <Typography className="steps">Step 1 of 7</Typography>
              <div className="flex align-center justify-around">
                <img src={back} alt="" />
                <Typography.Title level={3}>
                  Identity Verification
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
                Verifying your identity makes it easier for employers to
                shortlist candidates
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
                      style={{ width: "100%" }}
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
                      style={{ width: "100%" }}
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
                  style={{ width: "100%" }}
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
                  style={{ width: "100%" }}
                >
                  <Input placeholder="Document Type" className="input-style" />
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

                <div>
                  <Typography className="text-center">
                    Why I need to verify myself?
                  </Typography>
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default IdentityVerification;
