import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";

const onFinish = (values: any) => {
  console.log("Received values of form: ", values);
};

const SigninForm = () => {
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
            style={{ width: "100%" }}
          >
            <Input placeholder="Email" className="input-style" />
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
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot " href="../ResetPassword">
              <Typography style={{ color: "#363565" }}>
                Forgot password
              </Typography>
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Sign In
            </Button>
          </Form.Item>
          <div>
            <Typography className="text-center">
              Don’t have an account?
              <a href="" style={{ color: "#E95060" }}>
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
