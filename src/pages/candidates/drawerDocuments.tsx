import { useEffect, useRef, useState } from "react";
import { CSVCard, CvIcon, DocCard, DocumentIconD, DocxCard, JpegCard, JpgIcon, PngCard } from "../../assets/images";
import dayjs from "dayjs";
import { DocumentList, Notifications, PdfPreviewModal, RequestDocModel } from "../../components";
import actionHandler from "./actionHandler";

export const documentIcons: any = {
  jpeg: <JpegCard />,
  jpg: <JpgIcon />,
  pdf: <CvIcon />,
  png: <PngCard />,
  doc: <DocCard />,
  docx: <DocxCard />,
  csv: <CSVCard />,
}

export const DrawerDocuments = ({ documents, email, stage, userId }: any) => {
  const isInitialRender = useRef(true)
  const [open, setOpen] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [preViewModal, setPreViewModal] = useState<any>({
    extension: "",
    url: "",
  });
  const { handleRequestDocument, getStudentDocumentList, studentDocumentList } = actionHandler();
  const reqDocData = studentDocumentList
    ? studentDocumentList?.map(({ name, file: { filename, metaData: { extension }, createdAt, mediaSize, mediaId } }: any) => {
      return {
        image: documentIcons[extension],
        title: name || "N/A",
        descr: `${filename}.${extension}`,
        date: dayjs(createdAt).format("DD/MMM/YYYY"),
        size: mediaSize,
        fileUrl: `${mediaId}.${extension}`,
        extension: extension,
      }
    })
    : [];

  const openModal = () => {
    if (["hired", "rejected"].includes(stage)) {
      Notifications({
        title: "Restriction",
        description: `You can't Request Document in ${stage} stage.`,
        type: "error",
      });
    } else setOpen(true);
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      getStudentDocumentList(userId)
    }
  }, [])
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
