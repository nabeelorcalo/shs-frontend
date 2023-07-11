import { Tabs } from "antd";
import type { TabsProps } from "antd";
import DragAndDropUpload from "../DragAndDropUpload";
import DrawSignature from "../DrawSignature";
import TypeSignature from "../TypeSignature";
import { PopUpModal } from "../Model";
// import customHook from "../../pages/caseStudies/actionHandler";
import { useState } from "react";

export const SignatureAndUploadModal = (props?: any) => {
  // const { certificateDetails, setCertificateDetails } = props
  // const { HandleCleare, signature } = customHook();
  const [signatureText, setSignatureText] = useState(props?.signature ?? "");

  const onChange = () => {
    props?.HandleCleare();
    setSignatureText("");
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <span className="text-secondary-color font-normal">Draw</span>,
      children: (
        <DrawSignature
          certificateDetails={props?.certificateDetails}
          setCertificateDetails={props?.setCertificateDetails}
          getSignPadValue={props?.getSignPadValue}
        />
      ),
    },
    {
      key: "2",
      label: <span className="text-secondary-color font-normal">Type</span>,
      children: (
        <TypeSignature
          certificateDetails={props?.certificateDetails}
          setCertificateDetails={props?.setCertificateDetails}
          signatureText={signatureText}
          setSignatureText={setSignatureText}
        />
      ),
    },
    {
      key: "3",
      label: <span className="text-secondary-color font-normal">Upload</span>,
      children: (
        <DragAndDropUpload
        files={props?.files} setFiles={props?.setFiles}
        handleUploadFile={props?.handleUploadFile}
        />
      ),
    },
  ];

  const { state, closeFunc, width, okBtntxt, cancelBtntxt, title, okBtnFunc, footer } = props;
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
