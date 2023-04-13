import { useState } from "react";
import { Form, Input, Radio } from "antd";
import { PopUpModal } from "../../../components/Model";
import { AvatarBox, Button, TextArea } from "../../../components";
import { Certificate1, Certificate2 } from "../../../assets/images";
import SignatureAndUploadModal from "../../../components/SignatureAndUploadModal";

interface AppreciationProps {
  title: string;
  open: boolean;
  initialValues: any;
  onSave?: any;
  onCancel?: any;
}

export const AppreciationModal: any = (props: AppreciationProps) => {
  const { title, initialValues, open, onSave, onCancel } = props;
  const { name, avatar, description } = initialValues;

  const [type, setType] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState({ id: "", template: "" });
  const [previewModal, setPreviewModal] = useState(false);
  const [signatureModal, setSignatureModal] = useState(false);

  const templates = [
    { id: "1", template: Certificate2 },
    { id: "2", template: Certificate1 },
    { id: "3", template: Certificate2 },
    { id: "4", template: Certificate1 },
    { id: "5", template: Certificate2 },
    { id: "6", template: Certificate1 },
  ];

  return (
    <>
      <PopUpModal
        title={title}
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
            onFinish={(values) => onSave(values)}
          >
            {/* hidden tag */}
            <Form.Item name="name" hidden>
              <Input type="hidden" />
            </Form.Item>
            {/* --End-- */}

            <AvatarBox label="Intern" name={name} size={24} avatar={avatar} />

            <Form.Item name="type" label="Type" className="mt-4">
              <Radio.Group value={type} onChange={(e) => setType(e.target.value)}>
                <Radio value="Email">Email</Radio>
                <Radio value="Certificates">Certificates</Radio>
              </Radio.Group>
            </Form.Item>

            {type === "Certificates" && (
              <div className="flex items-center flex-wrap gap-4">
                {templates.map(({ id, template }) => (
                  <img
                    key={id}
                    src={template}
                    alt="template"
                    className="w-[156px] cursor-pointer rounded-md"
                    style={{ border: `1px dashed ${selectedTemplate.id === id ? "#78DAAC" : "transparent"}` }}
                    onClick={() => setSelectedTemplate({ id, template })}
                  />
                ))}
              </div>
            )}

            <Form.Item label="Description" name="description">
              <TextArea className="w-full" rows={4} />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }} className="flex justify-end">
              {type === "Certificates" && selectedTemplate.id && (
                <Button
                  label="Preview"
                  type="default"
                  onClick={() => setPreviewModal(!previewModal)}
                  className="border-visible-btn mt-4 mr-2"
                />
              )}
              <Button label="Cancel" type="default" onClick={onCancel} className="border-visible-btn mt-4" />

              <Button
                label={type === "Certificates" ? "Continue" : "Send"}
                htmlType={type === "Certificates" ? "default" : "submit"}
                onClick={() => (type === "Certificates" ? setSignatureModal(!signatureModal) : onCancel(false))}
                className="bg-visible-btn mt-4 ml-2"
              />
            </Form.Item>
          </Form>
        }
        footer={false}
      />
      <PopUpModal
        title="Preview"
        width={900}
        open={previewModal}
        close={() => setPreviewModal(!previewModal)}
        children={<img src={selectedTemplate.template} className="w-full object-cover" alt="template" />}
        footer={""}
      />
      <SignatureAndUploadModal state={signatureModal} />
    </>
  );
};
