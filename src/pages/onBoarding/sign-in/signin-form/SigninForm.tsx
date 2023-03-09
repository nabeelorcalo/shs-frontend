import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";
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
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot " href="/forgot-password">
              <Typography>Forgot password</Typography>
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              //htmlType="submit"
              className="login-form-button"
            >
              Sign In
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
