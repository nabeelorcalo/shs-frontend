import React from "react";
import { Button, Checkbox, Form, Input, Typography, Space } from "antd";
import PasswordCritera from "./PasswordCritera";
import { useState } from "react";
import { BoxWrapper } from "../../../../../components";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import useCustomHook from "../../../actionHandler";

const onFinish = (values: any) => {
  console.log("Received values of form: ", values);
};
const CreatePasswordForm = () => {
  const action = useCustomHook();
  const [showPassCriteria, setShowPassCriteria] = React.useState(false);
  const [passwordMatchedMessage, setMatchedPassMessage] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
    const { currentPassword, newPassword } = values;
    action
      .profilechangepassword({
        currentPassword: currentPassword,
        newPassword: newPassword,
      })
  };

  return (
    <BoxWrapper className="h-[92vh]">
      <div className="form-wrapper">
        <Form
          layout="vertical"
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <div className="w-[100%] lg:w-1/2">
            <Form.Item
              label="Old Password"
<<<<<<< HEAD
              name="oldPassword"
              // rules={[
              //   { required: true, message: "Please enter your old password!" },
              // ]}
              rules={[{ required: true }, { type: "string" }]}
=======
              name="currentPassword"
              rules={[
                { required: true, message: "Please enter your old password!" },
              ]}
>>>>>>> dev
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
<<<<<<< HEAD
              name="password"
              // rules={[
              //   { required: true, message: "Please enter new your password!" },
              // ]}
              rules={[{ required: true }, { type: "string" }]}
=======
              name="newPassword"
              rules={[
                { required: true, message: "Please enter new your password!" },
              ]}
>>>>>>> dev
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
              label="Confirm Password"
              name="confirmPassword"
<<<<<<< HEAD
              // rules={[
              //   {
              //     required: true,
              //     message: "Password is required",
              //   },
              // ]}
              rules={[{ required: true }, { type: "string" }]}
=======
              rules={[
                {
                  required: true,
                  message: "Password is required",
                },
              ]}
>>>>>>> dev
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
<<<<<<< HEAD

          <div className="flex justify-end items-end w-full h-[35vh]">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
              >
                Update
              </Button>
            </Form.Item>
=======
          <div className="flex justify-center lg:justify-end items-end lg:absolute lg:bottom-0 lg:right-5 w-full">
            <Space>
              <Form.Item>
                <Button
                  className="border-1 border-solid border-[#4A9D77] white-bg-color teriary-color text-base font-semibold"
                  onClick={() => {
                  }}
                >
                  Cancel
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  className="teriary-bg-color text-base font-semibold white-color"
                >
                  Save
                </Button>
              </Form.Item>
            </Space>
>>>>>>> dev
          </div>
        </Form>
      </div>
    </BoxWrapper>
  );
};

export default CreatePasswordForm;
