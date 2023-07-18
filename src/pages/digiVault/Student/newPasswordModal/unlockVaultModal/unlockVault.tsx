import { CloseCircleFilled } from "@ant-design/icons";
import { Button, Modal, Form, Input } from "antd";
import { DEFAULT_VALIDATIONS_MESSAGES } from '../../../../../config/validationMessages';
import "./styles.scss";
import useCustomHook from "../../../actionHandler";
import { useEffect, useState } from "react";

const UnlockVault = (props: any) => {
  const { isModal, setIsModal } = props;
  console.log("isModal are", isModal);

  const [password, setPassword] = useState(null)
  const { getDigiVaultDashboard } = useCustomHook();

  useEffect(() => {
    getDigiVaultDashboard(password)
  }, [])

  const onFinish = (values: any) => {
    getDigiVaultDashboard(values.password)
  };

  return (
    <div>
      <Modal
        open={isModal?.isLockUnLockPassword}
        onCancel={() => setIsModal(false)}
        width={500}
        closeIcon={<CloseCircleFilled className="text-[#A3AED0]" />}
        footer={false}
        rootClassName="unlock-vault-password"
      >
        <div className=" mt-6 mb-6">
          <h1 className="primary-color text-3xl font-medium">Enter Password to Unlock Vault</h1>
        </div>
        <Form
          layout='vertical'
          onFinish={onFinish}
          initialValues={{ remember: false }}
          validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
        >
          <div>
            <Form.Item
              name='password'
              label="Password"
              className="label"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input.Password
                placeholder="Enter password"
                className="Input-background-effect"
              />
            </Form.Item>
          </div>
          <div>
            <Button
              htmlType="submit"
              onClick={() => setIsModal(false)}
              className=" w-full create-passwor-btn primary-bg-color  min-w-full">
              Continue
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default UnlockVault;
