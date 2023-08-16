import { useState, useRef } from "react";
import { Form, Input, Radio } from "antd";
import type { RadioChangeEvent } from 'antd';
import useCustomHook from "./actionHandler";
import { AppreciationCertificateSampleOne, AppreciationCertificateSampleTwo } from "../../../assets/images";
import {
  Button,
  TextArea,
  AvatarBox,
  PopUpModal,
  Certificate,
  Notifications,
  SignatureAndUploadModal
} from "../../../components";

interface AppreciationProps {
  title: string;
  open: boolean;
  initialValues: any;
  onSave?: any;
  onCancel?: any;
  loading?: boolean;
}

export const AppreciationModal: any = (props: AppreciationProps) => {
  const [form] = Form.useForm();
  const { title, initialValues, open, onSave, onCancel, loading } = props;
  const { signature, setSignature, resetSignature, getSignPadValue, setFile, handleUploadFile, handleClear } = useCustomHook();
  const descriptionTxt: any = useRef('');
  const { name, avatar, description } = initialValues;
  const [type, setType] = useState('Email');
  const [previewModal, setPreviewModal] = useState(false);
  const [signatureModal, setSignatureModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>({ id: "", template: "" });
  const templates = [
    { id: 1, Template: AppreciationCertificateSampleOne },
    { id: 2, Template: AppreciationCertificateSampleTwo },
  ];

  const onRadioChange = (e: RadioChangeEvent) => {
    setType(e.target.value);
  }

  const handleFormSubmit = (values: any) => {
    if (values.type === 'Certificates') {
      setSignatureModal(!signatureModal);
    } else {
      onSave(values);
      form.resetFields();
    }
  }

  const handleCloseUploadAndSignatureModal = () => {
    setSignatureModal(!signatureModal);
    handleClear();
  }

  const handleClose = () => {
    onCancel();
    setType('Email');
    resetSignature();
    form.resetFields();
  }

  const issueCertificate = () => {
    setPreviewModal(!previewModal);

  }

  const footer = () => {
    if (signature?.signatureType !== "") {
      return (
        <>
          <Button
            label="Back"
            type="default"
            onClick={() => setPreviewModal(!previewModal)}
            className="border-visible-btn mt-4 font-semibold"
          />
  
          <Button
            label="Issue"
            loading={loading}
            onClick={issueCertificate}
            className="bg-visible-btn mt-4 ml-2 font-semibold"
          />
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <PopUpModal
        title={title}
        open={open}
        width={700}
        wrapClassName="modal-wrapper performance-modal"
        close={handleClose}
        children={
          <Form
            form={form}
            layout="vertical"
            initialValues={initialValues}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 24 }}
            onFinish={(values) => handleFormSubmit(values)}
          >
            {/* hidden tag */}
            <Form.Item name="name" hidden>
              <Input type="hidden" />
            </Form.Item>
            {/* --End-- */}
            <AvatarBox label="Intern" name={name} size={24} avatar={avatar} />

            <Form.Item name="type" label="Type" className="mt-4">
              <Radio.Group defaultValue="Email" value={type} onChange={onRadioChange}>
                <Radio value="Email"><span className="text-primary-color">Email</span></Radio>
                <Radio value="Certificates"><span className="text-primary-color ">Certificate</span></Radio>
              </Radio.Group>
            </Form.Item>

            {type === "Certificates" && <p className="text-teriary-color mb-2">Select Template</p>}
            {type === "Certificates" && (
              <div className="flex items-center flex-wrap gap-4 mb-7">
                {templates.map(({ id, Template }) => (
                  <Template
                    key={id}
                    className="h-[98px] w-fit cursor-pointer rounded-md"
                    onClick={() => setSelectedTemplate({ id, Template })}
                    style={{ border: `1px dashed ${selectedTemplate.id === id ? "#78DAAC" : "transparent"}` }}
                  />
                ))}
              </div>
            )}

            <Form.Item label="Description" name="description">
              <TextArea
                rows={4}
                className="w-full"
                onChange={(event: any) => descriptionTxt.current = event.currentTarget.value}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }} className="flex justify-end">
              {type === "Certificates" && selectedTemplate.id && (
                <Button
                  type="text"
                  label="Preview"
                  onClick={() => setPreviewModal(!previewModal)}
                  className="mt-4 mr-2 font-semibold"
                />
              )}

              <Button
                label="Cancel"
                type="default"
                onClick={handleClose}
                className="border-visible-btn mt-4 font-semibold"
              />

              <Button
                loading={loading}
                className="bg-visible-btn mt-4 ml-2 font-semibold"
                label={type === "Certificates" ? "Continue" : "Send"}
                htmlType={type === "Certificates" ? "default" : "submit"}
              />
            </Form.Item>
          </Form>
        }
        footer={false}
      />

      <PopUpModal
        width={900}
        title="Preview"
        open={previewModal}
        close={() => setPreviewModal(!previewModal)}
        children={
          <Certificate
            name={name}
            type="Appreciation"
            id={selectedTemplate?.id}
            fontFamily={signature.fontFamily}
            txtSignature={signature.txtSignature}
            imgSignature={signature.imgSignature}
            fileURL={signature.fileURL}
            description={descriptionTxt.current}
            className="certificate-template w-full h-auto object-cover"
          />
        }
        footer={footer()}
      />

      <SignatureAndUploadModal
        title='Signature'
        signature={signature.txtSignature}
        certificateDetails={signature}
        setCertificateDetails={setSignature}
        files={signature.file}
        setFiles={setFile}
        handleUploadFile={handleUploadFile}
        state={signatureModal}
        getSignPadValue={getSignPadValue}
        HandleCleare={handleClear}
        closeFunc={handleCloseUploadAndSignatureModal}
        footer={
          <>
            <Button
              label="Cancel"
              type="default"
              className="border-visible-btn mt-4 font-semibold"
              onClick={handleCloseUploadAndSignatureModal}
            />

            <Button
              label="Sign"
              type="default"
              className="bg-visible-btn mt-4 font-semibold"
              onClick={() => {setSignatureModal(!signatureModal); setPreviewModal(!previewModal);}}
            />
          </>
        }
      />
    </>
  );
};
