import React from "react";
import { Button, Checkbox, Form, Input, Typography, Space } from "antd";
import PasswordCritera from "./PasswordCritera";
import { useState } from "react";
import { BoxWrapper, Notifications } from "../../../../../../../components";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../../../config/validationMessages";
import { CloseCircleFilled, WarningFilled } from '@ant-design/icons';
import useCustomHook from "../../../../../actionHandler";

const onFinish = (values: any) => {
  console.log("Received values of form: ", values);
};
const CreatePasswordForm = ({setShowSideViewType}:any) => {
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
    } else {
      Notifications({
        warning: <WarningFilled className="text-warning-color" />,
        title: "Warning",
        description: "Password do not match",
        type: "warning",
      })
    }
  };

  return (
    <BoxWrapper className="h-[97vh]">
      <div className="form-wrapper">
        <Form
          layout="vertical"
          name="normal_login"
          className="login-form"
          validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
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
              <div className="mt-[22px]">
                <PasswordCritera value={password} />
              </div>
            )}
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                {
                  required: true,
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
                    : setMatchedPassMessage("Password do not match");
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
                    setShowSideViewType('manager-form')
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
    </BoxWrapper>
  );
};

export default CreatePasswordForm;
