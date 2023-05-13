import { CloseCircleFilled } from "@ant-design/icons";
import { Button, Modal, Form, Input, Switch } from "antd";
import useCustomHook from "../../actionHandler";
import "./style.scss";

const NewPasswordModal = (props: any) => {
  const { isModal, setIsModal, settingModal, setIsEnablePassword } = props;
  const { postDigivaultPassword }: any = useCustomHook();

  const onFinish = (values: any) => {
    values.isLock = settingModal.isLock;
    values.lockTime = settingModal.lockTime.toString();
    postDigivaultPassword(values)
  };
  const onChange = (checked: boolean) => {
    setIsModal(checked && true);
    setIsEnablePassword(checked)
  }
  return (
    <div>
      <Switch onChange={onChange} defaultChecked={true} />
      <Modal
        open={isModal}
        onOk={() => setIsModal(false)}
        onCancel={() => setIsModal(false)}
        width={500}
        maskClosable={false}
        closeIcon={<CloseCircleFilled className="text-[#A3AED0]" />}
        footer={false}
      >
        <div className="text-center mt-6 mb-6">
          <h1 className="color-[#363565]">Create New Password</h1>
        </div>
        <Form onFinish={onFinish}>
          <div>
            <label>Password</label>
            <Form.Item name="password" >
              <Input.Password size="large" />
            </Form.Item>
          </div>
          <div>
            <label>Confirm Password</label>
            <Form.Item
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
              onClick={() => {
                setIsModal({ isToggle: false, isLock: true });
              }}
              className="create-passwor-btn primary-bg-color  min-w-full"
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
