import React, { useState } from "react";
import { Button, Form, Input, Space, Typography } from "antd";
import PasswordCritera from "./PasswordCritera";
import useCustomHook from "../../../actionHandler";
import { Notifications } from "../../../../../components";
import { CloseCircleFilled } from '@ant-design/icons';

const CreatePasswordForm = ({ setShowSideViewType }: any) => {
  const action = useCustomHook();
  const [showPassCriteria, setShowPassCriteria] = React.useState(false);
  const [passwordMatchedMessage, setMatchedPassMessage] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
    const { currentPassword, newPassword } = values;
    if (password === confirmPassword) {
      action
        .profilechangepassword({
          currentPassword: currentPassword,
          newPassword: newPassword,
        })
      form.resetFields();
      setShowSideViewType('company-tabs')
    } else {
      Notifications({
        error: <CloseCircleFilled className="text-error-color" />,
        title: "Error",
        description: "Password not matched",
        type: "error",
      })
    }
  };

  return (
    <div>
      <div className="form-wrapper">
        <div className="pt-5 form-inner-wrapper">
          <Typography className="pb-2 text-xl font-semibold text-primary-color">Change Password</Typography>
          <Form
            layout="vertical"
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            form={form}
          >
            <div className="w-[100%] lg:w-1/2">
              <Form.Item
                label="Old Password"
                name="currentPassword"
                rules={[
                  { required: true, message: "Please enter your old password!" },
                ]}
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
                name="newPassword"
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
            </div>
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
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreatePasswordForm;
