import { Modal } from "antd";
import "./style.scss";
const PdfPreviewModal = (props: any) => {
  const { open, setOpen, url } = props;
  return (
    <div className="Modal">
      <Modal closeIcon={<></>} title="" open={open} onCancel={() => setOpen(false)} footer={""} width={900}>
        <div className="min-h-[650px]">
          <iframe
            src={`https://docs.google.com/viewerng/viewer?url=${url}&embedded=true`}
            height="100%"
            width="100%"
            style={{padding:0,margin:0, display: "block", background: "none", minHeight: 650, height: "100%", border: "none" }}
          ></iframe>
        </div>
      </Modal>
    </div>
  );
};
export default PdfPreviewModal;