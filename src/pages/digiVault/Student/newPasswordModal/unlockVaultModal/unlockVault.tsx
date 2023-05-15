import { CloseCircleFilled } from "@ant-design/icons";
import { Button, Modal, Form, Input, Switch } from "antd";
import "./styles.scss";
const UnlockVault = (props: any) => {
    const { isModal, setIsModal, settingModal, setIsEnablePassword } = props
    const onFinish = (values: any) => {
    };
    return (
        <div>
            <Modal
                open={isModal}
                onCancel={() => setIsModal(false)}
                centered
                width={500}
                closeIcon={<CloseCircleFilled className="text-[#A3AED0]" />}
                footer={false}
                rootClassName="unlock-vault-password"
            >
                <div className=" mt-6 mb-6">
                    <h1 className="color-[#363565] text-3xl font-medium">Enter Password to Unlock Vault</h1>
                </div>
                <Form layout='vertical' onFinish={onFinish} initialValues={{ remember: false }}>
                    <div>
                        <Form.Item
                            label="Password"
                            className="label"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your password!",
                                },
                            ]}
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
                            className=" w-full create-passwor-btn primary-bg-color  min-w-full"
                        >
                            Continue
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default UnlockVault;
