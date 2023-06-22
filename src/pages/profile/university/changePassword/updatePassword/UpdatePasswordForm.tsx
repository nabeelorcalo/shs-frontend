import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import PasswordCritera from "./PasswordCritera";
import { useState } from "react";
import { BoxWrapper } from "../../../../../components";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";

const onFinish = (values: any) => {
  console.log("Received values of form: ", values);
};
const CreatePasswordForm = () => {
  const [showPassCriteria, setShowPassCriteria] = React.useState(false);
  const [passwordMatchedMessage, setMatchedPassMessage] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <BoxWrapper className="h-[92vh]">
      <div className="form-wrapper">
        <Form
          layout="vertical"
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
        >
          <div className="w-1/2">
            <Form.Item
              label="Old Password"
              name="oldPassword"
              // rules={[
              //   { required: true, message: "Please enter your old password!" },
              // ]}
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input.Password
                value={oldPassword}
                type="password"
                placeholder="Enter Password"
                className="input-style"
                onFocus={() => setShowPassCriteria(true)}
                onChange={(e) => {
                  console.log(e.target.value);
                  setOldPassword(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="password"
              // rules={[
              //   { required: true, message: "Please enter new your password!" },
              // ]}
              rules={[{ required: true }, { type: "string" }]}
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
              // rules={[
              //   {
              //     required: true,
              //     message: "Password is required",
              //   },
              // ]}
              rules={[{ required: true }, { type: "string" }]}
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

          </div>

          <div className="flex justify-end items-end w-full h-[35vh]">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
              >
                Update
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </BoxWrapper>
  );
};

export default CreatePasswordForm;
