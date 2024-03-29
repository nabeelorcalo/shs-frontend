import { useState } from "react";
import { Modal, Form, Select, Checkbox } from "antd";
import { CloseCircleIcon } from "../../assets/images";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../config/validationMessages";
import { ButtonThemeSecondary } from "../ButtonThemeSecondary";
import { ButtonThemePrimary } from "../ButtonThemePrimary";
const documentTypeList = [
  { value: "DBS" },
  { value: "CV" },
  { value: "University Approval Letter" },
  { value: "Passport" },
  { value: "BRP" },
  { value: "Proof of Address" },
  { value: "Other" },
]
export const RequestDocModel = (props: any) => {
  const { open, setOpen, candidateEmail, handleReject, handleRequestDocument } = props;
  const [sendEmail, setSendEmail] = useState(false);
  const [form] = Form.useForm();
  const handleChangeSendEmail = (e: { target: { checked: boolean } }) => {
    setSendEmail(e.target.checked);
  };
  const onFinish = (values: any) => {
    values.sendEmail = sendEmail;
    values.candidateEmail = candidateEmail;
    handleRequestDocument(values);
    setOpen(false);
  };
  const onCancel = () => {
    setOpen(false);
    form.resetFields();
    setSendEmail(false);
    form.resetFields()
  };

  return (
    <div className="Modal">
      <Modal
        closeIcon={<img src={CloseCircleIcon} />}
        title="Request Document"
        open={open}
        onCancel={onCancel}
        footer={""}
        width={700}>
        <Form form={form} onFinish={onFinish} autoComplete="off">
          <div className="title">
            <p className="required">Document Type</p>
          </div>
          <Form.Item name={"documentType"} rules={[{ required: true, message: DEFAULT_VALIDATIONS_MESSAGES.required }]}>
            <Select
              placeholder="Select"
              className="w-full "
              options={documentTypeList}
            />
          </Form.Item>
          <div className="title">
            <p className="required">Description</p>
          </div>
          <Form.Item name={"description"} rules={[{ required: true, message: DEFAULT_VALIDATIONS_MESSAGES.required }]}>
            <textarea className="input" name="description" placeholder="Describe your problem" />
          </Form.Item>
          <div className="checkbox gap-3 mt-2">
            <Form.Item name={"sendEmail"} className="">
              <Checkbox checked={sendEmail} onChange={handleChangeSendEmail}>
                <p className="-mt-4">Send email to candidate</p>
              </Checkbox>
            </Form.Item>
          </div>
          <div className="flex mt-3 justify-end gap-4">
            <ButtonThemeSecondary onClick={onCancel}>
              Cancel
            </ButtonThemeSecondary>
            <ButtonThemePrimary onClick={handleReject}>
              Submit
            </ButtonThemePrimary>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
