import { useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import DragAndDropUpload from "../DragAndDropUpload";
import DrawSignature from "../DrawSignature";
import TypeSignature from "../TypeSignature";
import { PopUpModal } from "../Model";
// import customHook from "../../pages/caseStudies/actionHandler";

export const SignatureAndUploadModal = (props?: any) => {
  const {
    certificateDetails,
    setCertificateDetails,
    getSignPadValue,
    files,
    setFiles,
    signature,
    HandleCleare,
    handleUploadFile,
    state,
    closeFunc,
    width,
    okBtntxt,
    cancelBtntxt,
    title,
    okBtnFunc,
    footer,
  } = props;
  const [signatureText, setSignatureText] = useState(signature ?? "");

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <span className="text-secondary-color font-normal">Draw</span>,
      children: (
        <DrawSignature
          certificateDetails={certificateDetails}
          setCertificateDetails={setCertificateDetails}
          getSignPadValue={getSignPadValue}
        />
      ),
    },
    {
      key: "2",
      label: <span className="text-secondary-color font-normal">Type</span>,
      children: (
        <TypeSignature
          certificateDetails={certificateDetails}
          setCertificateDetails={setCertificateDetails}
          signatureText={signatureText}
          setSignatureText={setSignatureText}
          handleTextSignature={props?.handleTextSignature}
        />
      ),
    },
    {
      key: "3",
      label: <span className="text-secondary-color font-normal">Upload</span>,
      children:
        <DragAndDropUpload
          files={files}
          setFiles={setFiles}
          handleUploadFile={handleUploadFile}
          maxFileSize={5}
          acceptExt={["jpeg", "jpg", "png"]}
          placeholder="Support jpg, jpeg, and png files"

        />,
    },
  ];
  const onChange = () => {
    HandleCleare();
    setSignatureText("");
  };

  return (
    <PopUpModal
      title={<span className="text-primary-color text-xl font-medium">{title}</span>}
      open={state}
      close={closeFunc}
      wrapClassName="signature-modal"
      width={width}
      okBtntxt={okBtntxt}
      cancelBtntxt={cancelBtntxt}
      okBtnFunc={okBtnFunc}
      footer={footer}
    >
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </PopUpModal>
  );
};

export default SignatureAndUploadModal;
