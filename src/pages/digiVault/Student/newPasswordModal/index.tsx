import { CloseCircleFilled } from "@ant-design/icons";
import { Button, Modal, Form, Input } from "antd";
import { useState } from "react";
import useCustomHook from "../../actionHandler";
import UnlockVault from "./unlockVaultModal/unlockVault";
import "./style.scss";

const NewPasswordModal = (props: any) => {
  const { isModal, setIsModal, settingModal } = props;
  const { postDigivaultPassword, resetDigiVault }: any = useCustomHook();
  const [unlockVaultModal, setUnlockVaultModal] = useState(false)
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    values.isLock = settingModal.isLock;
    values.lockTime = settingModal?.lockTime === 1440 ? '1440' : String(settingModal?.lockTime).slice(-2);
    if (settingModal.hasReset) {
      resetDigiVault(values.password)
    } else {
      postDigivaultPassword(values);
    }
    form.resetFields();
  };
  // const onChange = (checked: boolean) => {
  //   setIsModal(checked && true);
  //   setIsEnablePassword(checked)
  // }
  
  return (
    <div>
      <Modal
        open={isModal}
        onCancel={() => setIsModal(false)}
        width={500}
        closeIcon={<CloseCircleFilled className="text-[#A3AED0]" />}
        footer={false}
      >
        <div className="text-center mt-6 mb-6">
          <h1 className="color-[#363565]">{settingModal.hasReset ? 'Reset Password' : 'Create New Password'}</h1>
        </div>
        <Form form={form} layout='vertical' onFinish={onFinish} initialValues={{ remember: false }}>
          <div>
            <Form.Item name="password" label='password'>
              <Input.Password size="large" />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label='Confirm Password'
              name="confirmPassword"
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
              htmlType="submit"
              onClick={() => { setIsModal(false) }}
              className="create-passwor-btn primary-bg-color  min-w-full"
            >
              Continue
            </Button>
          </div>
        </Form>
      </Modal>
      <UnlockVault setUnlockVaultModal={setUnlockVaultModal} unlockVaultModal={unlockVaultModal} />
    </div>
  );
};

export default NewPasswordModal;
