import { Modal } from "antd";

export const PdfPreviewModal = (props: any) => {
  const {
    open,
    setOpen,
    preViewModal: { url, extension },
  } = props;
  const imageExtensions = ["jpg", "JPG", "png", "PNG", "Png", "jpeg", "JPEG"];

  return (
    <div className="Modal">
      <Modal closeIcon={<></>} title="" open={open} onCancel={() => setOpen(false)} footer={""} width={900}>
        <div className="h-[650px]">
          {imageExtensions?.includes(extension) ? (
            <img className="w-full h-full" src={url} alt="" />
          ) : (
            // url && <iframe
            //   src={`https://onedrive.live.com/embed?${url}&embedded=true`}
            //   // src={url}
            //   height="100%"
            //   width="100%"
            //   style={{
            //     padding: 0,
            //     margin: 0,
            //     display: "block",
            //     background: "none",
            //     minHeight: 650,
            //     height: "100%",
            //     border: "none",
            //   }}
            // />

            // url && <iframe
            //   src={`https://docs.google.com/viewerng/viewer?url=${encodeURIComponent(url)}&embedded=true`}
            //   height={'100%'}
            //   width={'100%'}
            //   allowFullScreen
            //   onLoad={() => console.log("iframe loaded")}
            //   onError={() => console.log("iframe error")}
            //   loading="eager"
            //   allow-same-origin
            // />

            <object width="100%" height="100%" data={url} type="application/pdf">   </object>

            // <Document file={url}>
            //   <Page pageNumber={1} />
            // </Document>
          )}
        </div>
      </Modal>
    </div>
  );
};