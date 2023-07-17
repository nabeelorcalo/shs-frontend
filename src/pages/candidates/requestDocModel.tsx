import { useState } from "react";
import { Modal, Form, Select, Checkbox } from "antd";
import "./style.scss";
import { CloseCircleIcon } from "../../assets/images";
import actionHandler from "./actionHandler";
const RequestDocModel = (props: any) => {
  const { open, setOpen, candidateEmail, handleReject } = props;
  const [sendEmail, setSendEmail] = useState(false);
  const { handleRequestDocument } = actionHandler();
  const [form] = Form.useForm();
  const handleChangeSendEmail = (e: { target: { checked: boolean } }) => {
    setSendEmail(e.target.checked);
  };
  const onFinish = (values: any) => {
    values.sendEmail = sendEmail;
    values.candidateEmail = candidateEmail;
    handleRequestDocument(values);
    setOpen(false)
  };
  const onCancel = () => {
    setOpen(false);
    form.resetFields();
    setSendEmail(false);
  };

  return (
    <div className="Modal">
      <Modal
        closeIcon={<img src={CloseCircleIcon} />}
        title="Request Document"
        open={open}
        onCancel={onCancel}
        footer={""}
      >
        <Form form={form} onFinish={onFinish} autoComplete="off">
          <div className="title">
            <p className="required">Document Type</p>
          </div>
          <Form.Item name={"documentType"} rules={[{ required: true, message: "Required Field" }]}>
            <Select
              placeholder="Select"
              className="internship-filter w-full "
              options={[
                { value: "DBS" },
                { value: "CV" },
                { value: "University Approval Letter" },
                { value: "Passport" },
                { value: "BRP" },
                { value: "Proof of Address" },
                { value: "Other" },
              ]}
            />
          </Form.Item>
          <div className="title">
            <p className="required">Description</p>
          </div>
          <Form.Item name={"description"} rules={[{ required: true, message: "Required Field" }]}>
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
            <button onClick={onCancel} className="reqCancelBtn cursor-pointer">
              Cancel
            </button>
            <button onClick={handleReject} type="submit" className="reqSubmitBtn cursor-pointer">
              Submit
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default RequestDocModel;
