import { CloseCircleFilled } from "@ant-design/icons";
import { Button, Modal, Form, Input } from "antd";
import { useState } from "react";
import useCustomHook from "../../actionHandler";
import UnlockVault from "./unlockVaultModal/unlockVault";
import "./style.scss";

const NewPasswordModal = (props: any) => {
  const { setIsModal, settingModal, setIsLockModal } = props;
  const { postDigivaultPassword, resetDigiVault }: any = useCustomHook();
  const [unlockVaultModal, setUnlockVaultModal] = useState(false)
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    setIsModal({ ...settingModal, isModalOpen: true, isLock: true })
    values.isLock = true;
    values.lockTime = '05';
    if (settingModal.hasReset) {
      resetDigiVault(values.password)
      setIsModal({ ...settingModal, isModalOpen: false, isLock: false })

    } else {
      postDigivaultPassword(values);
      setIsLockModal(false)
    }
    form.resetFields();
  };
  
  return (
    <div>
      <Modal
        open={settingModal.isModalOpen}
        onCancel={() => setIsModal({ ...settingModal, isModalOpen: false })}
        width={500}
        closeIcon={<CloseCircleFilled className="text-[#A3AED0]" />}
        footer={false}
      >
        <div className="text-center mt-6 mb-6">
          <h1 className="color-[#363565]">{settingModal.hasReset ? 'Reset Password' : 'Create New Password'}</h1>
        </div>
        <Form form={form} layout='vertical' onFinish={onFinish} initialValues={{ remember: false }}>
          <div>
            <Form.Item name="password" label='password'
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                }]}
            >
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
                        "Password does not match"
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
    </div >
  );
};

export default NewPasswordModal;
