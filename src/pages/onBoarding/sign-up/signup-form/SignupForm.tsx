import React from "react";
import { Button, Col, Form, Input, Row, Select, Typography } from "antd";
import { CommonDatePicker } from "../../../../components";
import "../../styles.scss";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../config/validationMessages";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate(); 
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    navigate('/login');
  };

  const { Option } = Select;

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  return (
    <div className="sign-up-form-wrapper">
      <Form
        layout="vertical"
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
        onFinish={onFinish}
      >
        <Row gutter={20}>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input placeholder="First Name" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input placeholder="Last Name" className="input-style" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Email"
          name="Email"
          rules={[{ required: true }, { type: "email" }]}
        >
          <Input placeholder="Email" className="input-style" />
        </Form.Item>
        <Row gutter={20}>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              label="Reference Number (optional)"
              name="refrenceNumber"
              rules={[{ required: true }, { type: "string" }]}
              style={{ width: "100%" }}
            >
              <Input
                placeholder="Reference Number (optional)"
                className="input-style"
              />
            </Form.Item>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              label="Date of Birth"
              name="dob"
              rules={[{ required: true }, { type: "date" }]}
            >
              <CommonDatePicker />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: true }, { type: "number" }]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>
        <Row gutter={20}>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true }, { min: 8 }]}
            >
              <Input.Password
                type="password"
                placeholder="Password"
                className="input-style"
              />
            </Form.Item>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              label="Conifirm Password"
              name="confirmpassword"
              rules={[{ required: true }, { min: 8 }]}
            >
              <Input.Password
                type="confirmpassword"
                placeholder="confirmpassword"
                className="input-style"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign Up
          </Button>
        </Form.Item>
        <div>
          <Typography className="text-center">
            Already have an account?
            <a href="/login" className="a-tag-signup">
              Sign In
            </a>
          </Typography>
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <Typography>
            By continuing to create account your are agree to Student Help
            Squad? <span style={{ fontWeight: 600 }}>Term and Condition </span>
            and <span style={{ fontWeight: 600 }}>Privacy</span>
          </Typography>
        </div>
      </Form>
    </div>
  );
};

export default SignupForm;
