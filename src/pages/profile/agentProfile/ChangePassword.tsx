import React from 'react';
import { Button, Form, Input, Typography } from "antd";
import { useState } from "react";
import { BoxWrapper, Notifications } from '../../../components';
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../config/validationMessages";
import useCustomHook from './actionHandler';
import { CloseCircleFilled } from "@ant-design/icons";

const ChangePassword = (props: any) => {
  const [form] = Form.useForm();
  const { showSideViewType, setShowSideViewType } = props
  const [showPassCriteria, setShowPassCriteria] = React.useState(false);
  const [passwordMatchedMessage, setMatchedPassMessage] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { patchagentChangePassword } = useCustomHook();

  // const onFinish = (values: any) => {
  //   patchagentChangePassword(values?.oldPassword, values?.newPassword)
  // };

  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
    const { currentPassword, newPassword } = values;
    if (password === confirmPassword) {
      console.log(values);
      patchagentChangePassword(values)
      form.resetFields();
      // setShowSideViewType('company-tabs')
    } else {
      Notifications({
        error: <CloseCircleFilled className="text-error-color" />,
        title: "Error",
        description: "Password does not matched",
        type: "error",
      })
    }
  }

  return (
    <BoxWrapper>
      <div className=" h-[70vh] form-wrapper">
        <p className='text-primary-color font-semibold text-xl mt-3 pb-7'>Change Password</p>
        <Form
          layout="vertical"
          form={form}
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
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input.Password
                value={oldPassword}
                type="password"
                placeholder="Enter Password"
                className="input-style"
                onFocus={() => setShowPassCriteria(true)}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input.Password
                value={password}
                type="password"
                placeholder="Enter Password"
                className="input-style"
                onFocus={() => setShowPassCriteria(true)}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Item>

            {showPassCriteria && (
              <div className="mt-[22px]">
              </div>
            )}
            <Form.Item
              label="Confirm  Password"
              name="confirmPassword"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input.Password
                value={confirmPassword}
                type="password"
                placeholder="Enter Password"
                className="input-style"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  password === e.target.value
                    ? setMatchedPassMessage("Password Matched")
                    : setMatchedPassMessage("Password does not match");
                }}
              />
            </Form.Item>
            {passwordMatchedMessage !== 'Password Matched' &&
              <Typography className='text-error-color'>
                {passwordMatchedMessage}</Typography>}
          </div>
          <div className="flex justify-end items-end w-full h-[25vh]">
            <Form.Item>
              <Button
                className='cancel-Button teriary-color'
                onClick={() => setShowSideViewType(false)}
              >
                Cancel
              </Button>
              <Button
                className='ml-5 teriary-bg-color white-color apply-btn'
                // type="primary"
                htmlType="submit"
              >
                Save
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </BoxWrapper>
  )
}

export default ChangePassword