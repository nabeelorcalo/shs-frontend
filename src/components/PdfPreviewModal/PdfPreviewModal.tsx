import { Modal } from "antd";
export const PdfPreviewModal = (props: any) => {
  const {
    open,
    setOpen,
    preViewModal: { url, extension },
  } = props;
  const imageExtensions = ["jpg", "JPG", "png", "PNG", "jpeg", "JPEG"];
  return (
    <div className="Modal">
      <Modal closeIcon={<></>} title="" open={open} onCancel={() => setOpen(false)} footer={""} width={900}>
        <div className="h-[650px]">
          {imageExtensions?.includes(extension) ? (
            <img className="w-full h-full" src={url} alt="" />
          ) : (
            <iframe
              src={`https://docs.google.com/viewerng/viewer?url=${url}&embedded=true`}
              height="100%"
              width="100%"
              style={{
                padding: 0,
                margin: 0,
                display: "block",
                background: "none",
                minHeight: 650,
                height: "100%",
                border: "none",
              }}
            ></iframe>
          )}
        </div>
      </Modal>
    </div>
  );
};
