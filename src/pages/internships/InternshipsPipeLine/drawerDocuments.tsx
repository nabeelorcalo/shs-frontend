import { useState } from "react";
import { CvIcon, DocumentIconD } from "../../../assets/images";
import dayjs from "dayjs";
import { DocumentList, Notifications, PdfPreviewModal, RequestDocModel } from "../../../components";
import actionHandler from "../actionHandler";

export const DrawerDocuments = ({ documents, email, stage }: any) => {
  const reqDocData = documents
    ? documents?.map((docItem: any) => ({
        image: <CvIcon />,
        title: docItem?.file?.filename,
        descr: `${docItem?.file?.filename}.${docItem?.file?.metaData?.extension}`,
        date: dayjs(docItem?.file?.createdAt).format("DD/MMM/YYYY"),
        size: docItem?.file?.mediaSize,
        fileUrl: `${docItem?.file?.mediaId}.${docItem?.file?.metaData?.extension}`,
        extension: docItem?.file?.metaData?.extension,
      }))
    : [];
  const [open, setOpen] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [preViewModal, setPreViewModal] = useState<any>({
    extension: "",
    url: "",
  });

  const { handleRequestDocument } = actionHandler();

  const openModal = () => {
    if (["hired", "rejected"].includes(stage)) {
      Notifications({
        title: "Restriction",
        description: `You can't Request Document in ${stage} stage.`,
        type: "error",
      });
    } else setOpen(true);
  };

  return (
    <div className="doc-wrapper">
      <div className="justify-end flex mt-4">
        <button onClick={openModal} className="req-btn flex items-center justify-center cursor-pointer">
          <DocumentIconD />
          <p className="btn-text">Request Document</p>
        </button>
        <RequestDocModel
          setOpen={setOpen}
          open={open}
          candidateEmail={email}
          handleRequestDocument={handleRequestDocument}
        />
      </div>
      <DocumentList reqDocData={reqDocData} setOpenPreview={setOpenPreview} setPreViewModal={setPreViewModal} />
      <PdfPreviewModal setOpen={setOpenPreview} open={openPreview} preViewModal={preViewModal} />
    </div>
  );
};
