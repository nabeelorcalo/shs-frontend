import { useState } from "react";
import "./style.scss";
import RequestDocModel from "./requestDocModel";
import { CvIcon, DocumentIconD, DownloadDocumentIcon } from "../../assets/images";
import Preview from "../../assets/images/candidates/preview.svg";
import dayjs from "dayjs";
import constants from "../../config/constants";
import PdfPreviewModal from "./PdfPreviewModal";
const DrawerDocuments = ({ documents,email }: any) => {
  const ReqDocData = documents
    ? documents?.map((docItem: any) => ({
        image: <CvIcon />,
        title: docItem?.filename,
        descr: `${docItem?.filename}.${docItem?.metaData?.extension}`,
        date: dayjs(docItem?.createdAt).format("DD/MMM/YYYY"),
        size: docItem?.mediaSize,
        fileUrl: `${docItem?.mediaId}.${docItem?.metaData?.extension}`,
        extension: docItem?.metaData?.extension,
      }))
    : [];

  const [open, setOpen] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [preViewModal, setPreViewModal] = useState<any>({ extension: "", url: "" });

  return (
    <div className="doc-wrapper">
      <div className="justify-end flex mt-4">
        <button onClick={() => setOpen(true)} className="req-btn flex items-center justify-center cursor-pointer">
          <DocumentIconD />
          <p className="btn-text">Request Document</p>
        </button>
        <RequestDocModel setOpen={setOpen} open={open} candidateEmail={email} />
      </div>

      <div className="files-wrap mt-6">
        {ReqDocData.map((data: any) => (
          <div className="files flex justify-between py-3 px-3">
            <div className="flex gap-4">
              {data.image}
              <div className="">
                <p className="cv-heading">{data.title}</p>
                <p>{data.descr}</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div>
                <p>{data.date}</p>
                <p className="ml-8">{data.size}</p>
              </div>
              <div className="icons-sec">
                <p className="h-[40px] w-[40px] flex items-center justify-center">
                  <img
                    src={Preview}
                    alt=""
                    onClick={() => {
                      setOpenPreview(true);
                      setPreViewModal({ extension: data?.extension, url: `${constants?.MEDIA_URL}/${data?.fileUrl}` });
                    }}
                  />
                </p>
              </div>
              <div className="icons-sec">
                <p className="h-[40px] w-[40px] flex items-center justify-center">
                  <a href={`${constants?.MEDIA_URL}/${data?.fileUrl}`}>
                    <DownloadDocumentIcon />
                  </a>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <PdfPreviewModal setOpen={setOpenPreview} open={openPreview} preViewModal={preViewModal} />
    </div>
  );
};

export default DrawerDocuments;
