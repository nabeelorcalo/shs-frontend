import React, { useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import PasswordCritera from "./PasswordCritera";
import useCustomHook from "../../actionHandler";

const CreatePasswordForm = () => {
  const action = useCustomHook();
  const [showPassCriteria, setShowPassCriteria] = React.useState(false);
  const [passwordMatchedMessage, setMatchedPassMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onFinish = (values: any) => {
    console.log("Received reset values of form: ", values);
    const { currentPassword, newPassword } = values;
    action
      .changepassword({
        currentpassword: newPassword,
      })
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
            label="New Password"
            name="currentpassword"
            rules={[
              { required: true, message: "Please enter new your password!" },
            ]}
          >
            <Input.Password
              value={password}
              type="password"
              placeholder="Enter Password"
              className="input-style"
              onFocus={() => setShowPassCriteria(true)}
              onChange={(e) => {
                console.log(e.target.value);
                setPassword(e.target.value);
              }}
            />
          </Form.Item>

          {showPassCriteria && (
            <div style={{ marginTop: "22px" }}>
              <PasswordCritera value={password} />
            </div>
          )}
          <Form.Item
            label="Confirm  Password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Password is required",
              },
            ]}
          >
            <Input.Password
              value={confirmPassword}
              type="password"
              placeholder="Enter Password"
              className="input-style"
              onChange={(e) => {
                console.log(e.target.value);
                setConfirmPassword(e.target.value);
                password === e.target.value
                  ? setMatchedPassMessage("Password Matched")
                  : setMatchedPassMessage("Password not matched");
              }}
            />
          </Form.Item>
          <Typography>{passwordMatchedMessage}</Typography>
          <Form.Item>
            <Button
              type="primary"
              //htmlType="submit"
              className="login-form-button"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreatePasswordForm;
