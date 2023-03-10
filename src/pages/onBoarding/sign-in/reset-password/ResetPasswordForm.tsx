import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";

const ResetPasswordForm = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
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
            <Input placeholder="Email" className="input-style" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              //htmlType="submit"
              className="login-form-button"
            >
              <a href="/reset-link-sent">Reset</a>
              
            </Button>
          </Form.Item>
          <div>
            <Typography className="text-center">
              Back to &nbsp;
              <a href="/login" className="a-tag-signup ">
                Login
              </a>
            </Typography>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
