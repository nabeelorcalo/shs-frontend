import { Col, Divider, Row } from "antd";
import { Documentcard, DocumentIcon } from "../../../../assets/images";
import Preview from "../../../../assets/images/candidates/preview.svg";
import useCustomHook from "../../actionHandler";
import dayjs from "dayjs";
import constants from "../../../../config/constants";
import { useState } from "react";
import { PdfPreviewModal } from "../../../../components";

const DocumentsAgent = () => {
  const { getDocuments }: any = useCustomHook()
  const [openPreview, setOpenPreview] = useState(false);
  const [preViewModal, setPreViewModal] = useState<any>({
    extension: "",
    url: "",
  });

  return (
    <div>
      <div className="font-semibold text-[28px] text-secondary-color pb-4">
        Documents
      </div>
      {getDocuments.length === 0 && <p className="text-center font-semibold text-success-placeholder-color">No Data Found</p>}
      {
        getDocuments?.map((item: any) => {
          const size = item.file.mediaSize / 1024;
          return (
            <div key={item.id}>
              <Row className="flex justify-between items-center">
                <Col xs={18} className="flex items-center">
                  <div className="pr-2">
                    <Documentcard />
                  </div>

                  <div>
                    <p className="text-secondary-color text-base font-medium">{item?.file?.filename}</p>
                    <p className="text-secondary-color text-base font-normal">
                      {item?.file?.filename}.{item?.file?.metaData?.extension}
                    </p>
                  </div>
                </Col>

                <Col xs={6} className="flex items-center">
                  <div>
                    <p className="light-grey-color text-sm font-normal">{dayjs(item.createdAt).format("DD/MM/YYYY")}</p>
                    <p className="light-grey-color text-sm font-normal">{size.toFixed(2)} mb</p>
                  </div>
                  <p className="h-[40px] w-[40px] flex items-center justify-center cursor-pointer">
                    <img src={Preview} alt="doc_preview"
                      onClick={() => {
                        setOpenPreview(true);
                        setPreViewModal({
                          extension: item?.file?.metaData?.extension,
                          url: `${constants?.MEDIA_URL}/${item?.file?.mediaId}.${item?.file?.metaData.extension}`,
                        })
                      }
                      } />
                  </p>
                  <a href={`${constants?.MEDIA_URL}/${item?.file?.mediaId}.${item?.file?.metaData.extension}`}>
                    <DocumentIcon />
                  </a>
                </Col>
              </Row>
              <Divider />
            </div>
          )
        })
      }
      <PdfPreviewModal setOpen={setOpenPreview} open={openPreview} preViewModal={preViewModal} />
    </div>
  );
};

export default DocumentsAgent;
