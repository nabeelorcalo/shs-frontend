import { useState } from "react";
import dayjs from "dayjs";
import { CvIcon, DocumentIconD, CSVCard, DocCard, DocxCard, JpegCard, JpgIcon, PngCard } from "../../../assets/images";
import { ButtonThemePrimary, DocumentList, Notifications, PdfPreviewModal, RequestDocModel } from "../../../components";
import actionHandler from "../actionHandler";

export const documentIcons: any = {
  jpeg: <JpegCard />,
  jpg: <JpgIcon />,
  pdf: <CvIcon />,
  png: <PngCard />,
  doc: <DocCard />,
  docx: <DocxCard />,
  csv: <CSVCard />,
}

export const DrawerDocuments = ({ documents, email, stage }: any) => {

  const [open, setOpen] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [preViewModal, setPreViewModal] = useState<any>({
    extension: "",
    url: "",
  });

  const reqDocData = documents
  ? documents?.map(({ name, file: { filename, metaData: { extension }, createdAt, mediaSize, mediaId } }: any) => ({
    image: documentIcons[extension],
    title: name || "N/A",
    descr: `${filename}.${extension}`,
    date: dayjs(createdAt).format("DD/MMM/YYYY"),
    size: mediaSize,
    fileUrl: `${mediaId}.${extension}`,
    extension: extension,
  }
  )) : [];
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
        <ButtonThemePrimary
          className="rounded-lg w-[211px]"
          icon={<DocumentIconD />}
          onClick={openModal}>
          Request Document
        </ButtonThemePrimary>
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
