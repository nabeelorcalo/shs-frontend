import { Button, Form } from "antd";
import { Input } from "antd";
import { PopUpModal } from "../../../components/Model";
import TextArea from 'antd/es/input/TextArea';
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../config/validationMessages";

const CustomSuportModal = (props: any) => {
  const { setIsSuportModal, isSuportModal } = props;
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    form.resetFields()
    console.log(values);
  }

  return (
    <PopUpModal
      open={isSuportModal}
      title="Customer Support"
      width={600}
      close={() => { setIsSuportModal(false), form.resetFields() }}
      footer={false}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
      >
        <Form.Item
          label={<span className="text-teriary-color">Subject</span>}
          name="subject"
          rules={[{ required: true }, { type: "string" }]}
        >
          <Input
            className="input"
            id="subject"
            placeholder="Enter subject"
            size="middle"
            type="text"
          />
        </Form.Item>
        <Form.Item
          label={<span className="text-teriary-color">Description</span>}
          name="description"
          rules={[{ required: true }, { type: "string" }]}
        >
          <TextArea rows={6} placeholder="Write your reason"
            id="description"
            name="description"
            size="middle"
          />
        </Form.Item>
        <div className="setting-department-footer flex justify-end mt-4 gap-2">
          <Button key="Cancel" className="footer-cancel-btn font-semibold"
            onClick={() => setIsSuportModal(false)}
          >
            Cancel
          </Button>
          <Button key="submit" className="green-graph-tooltip-bg white-color font-semibold" htmlType="submit">
            Send
          </Button>
        </div>
      </Form>
    </PopUpModal>
  )
}

export default CustomSuportModal