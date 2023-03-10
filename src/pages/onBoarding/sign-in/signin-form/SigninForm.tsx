import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Row, Typography } from "antd";
import { useState } from "react";

const onFinish = (values: any) => {
  console.log("Received values of form: ", values);
};

const SigninForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  return (
    <div>
      <div className="form-wrapper">
        <Form
          layout="vertical"
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="Email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              placeholder="Email"
              className="input-style"
              onChange={handleChange}
              name="Email"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              type="password"
              placeholder="Password"
              className="input-style"
              onChange={handleChange}
              name="password"
            />
          </Form.Item>
          <Row className="flex">
            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24} className='text-center sm:text-start'>
            <Form.Item name="remember" valuePropName="checked" noStyle className="text-center">
              <Checkbox >Remember me</Checkbox>
            </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item >
            <a className="login-form-forgot text-center md:text-end" href="/forgot-password">
              <Typography>Forgot password</Typography>
            </a>
          </Form.Item>
            </Col>
          </Row>
         
           
          

          <Form.Item>
            <Button
              type="primary"
            // htmlType="submit"
              className="login-form-button"
            >
              <a href="/" >Sign In</a>
           
            </Button>
          </Form.Item>
          <div>
            <Typography className="text-center">
              Don’t have an account?
              <a href="/signup" className="a-tag-signup">
                Sign up
              </a>
            </Typography>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SigninForm;
