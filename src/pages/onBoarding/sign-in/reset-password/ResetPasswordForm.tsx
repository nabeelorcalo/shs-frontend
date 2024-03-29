import React from "react";
import { Button, Form, Input, Typography } from "antd";
import useCustomHook from "../actionHandler";
import { ROUTES_CONSTANTS } from "../../../../config/constants";
import { useNavigate } from "react-router-dom";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../config/validationMessages";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const action = useCustomHook();
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    const { email } = values;
    action
      .forgotpassword({
        email: email,
      })
    navigate(`/${ROUTES_CONSTANTS.RESET_LINK_SENT}`);
  };
  return (
    <div>
      {/* forgot password */}
      <div className="form-wrapper">
        <Form
          layout="vertical"
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true }, { type: "email" }]}
          >
            <Input placeholder="Email" className="input-style" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Reset
            </Button>
          </Form.Item>
          <div>
            <Typography className="text-center">
              Back to &nbsp;
              <a href={`${ROUTES_CONSTANTS.LOGIN}`} className="a-tag-signup ">
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
