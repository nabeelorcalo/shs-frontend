import { CloseCircleFilled } from "@ant-design/icons";
import { Button, Modal, Form, Input } from "antd";
import React, { useState } from "react";
import "./newPasswordModal.scss";

const NewPasswordModal = (props: any) => {
  const { newPass, setNewPass, setIsChecked } = props;

  const [form] = Form.useForm();

  const handleChange = () => {
    console.log("clicks");
  };

  return (
    <div>
      <Modal
        open={newPass}
        onCancel={() => {
          setNewPass(!newPass);
        }}
        width={500}
        maskClosable={false}
        closeIcon={
          <CloseCircleFilled style={{ color: "#A3AED0", fontSize: "20px" }} />
        }
        footer={false}
        
      >
        <div className="text-center mt-6 mb-6">
          <h1 className="color-[#363565]">Create New Password</h1>
        </div>
        <Form>
          <div>
            <label>Password</label>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>
          </div>

          <div>
            <label>Confirm Password</label>
            <Form.Item
              name="confirm"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>
          </div>

          <div>
          <Button
            onClick={() => {
              setNewPass(!newPass);
              setIsChecked(true);
            }}
            className="create-passwor-btn bg-[#363565] color-[fffff] min-w-full"
          >
            Continue
          </Button>
          </div>
          
        </Form>
      </Modal>
    </div>
  );
};

export default NewPasswordModal;
