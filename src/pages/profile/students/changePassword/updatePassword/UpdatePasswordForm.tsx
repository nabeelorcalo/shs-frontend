import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import PasswordCritera from "./PasswordCritera";
import { useState } from "react";

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
    <div>
      <div className="form-wrapper">
        <Form
          layout="vertical"
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <div className="w-1/2">
          <Form.Item
            label="Old Password"
            name="oldPassword"
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
            name="password"
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
         
          <div className="flex justify-end items-end  w-full">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className=""
                //   disabled={
                //     password !== confirmPassword || !confirmPassword || !password
                //   }
              >
                Update
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreatePasswordForm;
