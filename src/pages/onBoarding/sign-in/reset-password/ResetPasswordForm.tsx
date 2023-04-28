import React from "react";
import { Button, Form, Input, Typography } from "antd";
import useCustomHook from "../actionHandler";
import { ROUTES_CONSTANTS } from "../../../../config/constants";
import { useNavigate } from "react-router-dom";

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
      .then((data: any) => {
        console.log("data", data);
        navigate(`/${ROUTES_CONSTANTS.RESET_LINK_SENT}`);
      })
      .catch((err) => console.log(err));
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
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
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
