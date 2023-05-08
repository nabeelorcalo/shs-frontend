import { Form, Typography } from "antd";
import { PopUpModal } from "../../../components/Model";
import { Button, TextArea } from "../../../components";
import { AlertIcon } from "../../../assets/images";

interface WarnProps {
  title: string;
  open: boolean;
  initialValues: any;
  onIssue?: any;
  onCancel?: any;
}

export const WarnModal: any = (props: WarnProps) => {
  const { title, initialValues, open, onIssue, onCancel } = props;

  return (
    <PopUpModal
      title={
        <div className="flex gap-2">
          <AlertIcon />
          <p className="text-primary-color font-medium text-3xl">{title}</p>
        </div>
      }
      open={open}
      width={700}
      wrapClassName="modal-wrapper performance-modal"
      close={onCancel}
      children={
        <Form
          layout="vertical"
          initialValues={initialValues}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 24 }}
          onFinish={(values) => onIssue(values)}
        >
          <p className="mb-7 font-medium">Are you sure you want to issue warning letter?</p>

          <Form.Item label={<span className="text-primary-color">Description</span>} name="description">
            <TextArea className="w-full" rows={6} />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }} className="flex justify-end">
            <Button label="Cancel" type="default" onClick={onCancel} className="text-error-color font-semibold text-base border-red-visible-btn mt-4 rounded-lg" />
            <Button label="Issue" htmlType="submit" className="text-error-bg-color mt-4 ml-2 rounded-lg" />
          </Form.Item>
        </Form>
      }
      footer={false}
    />
  );
};
