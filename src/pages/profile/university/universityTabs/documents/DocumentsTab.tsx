import { useState } from 'react';
import { CvIcon, DownloadDocumentIcon } from '../../../../../assets/images'
import Preview from "../../../../../assets/images/candidates/preview.svg";
import constants from '../../../../../config/constants';
import "./Styles.scss";
import { PdfPreviewModal } from '../../../../../components';
import { byteToHumanSize } from '../../../../../helpers';
import dayjs from 'dayjs';

const DocumentsTab = (props: any) => {
  const { info } = props;

  const [openPreview, setOpenPreview] = useState(false);
  const [preViewModal, setPreViewModal] = useState<any>({
    extension: "",
    url: "",
  });

  return (
    <div>
      {info?.docs?.length === 0 ? <span className='text-primary-disabled-color'>No Documents available...</span> :
        <div className="files-wrap mt-6">
          {info?.docs?.map((item: any) => {
            return <div className="files flex justify-between py-3 px-3">
              <div className="flex gap-4">
                <CvIcon />
                <div>
                  <p className="cv-heading font-semibold">{item?.name}</p>
                  <p>{`${item?.file?.filename}.${item?.file?.metaData?.extension}`}</p>
                  {/* <p className="cv-heading">{item?.file?.filename}</p>
                  <p>{`${item?.file?.entityType?.toLowerCase()?.replace('_', '')}.${item?.file?.metaData?.extension}`}</p> */}
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div>
                  <p className='text-success-placeholder-color'>{dayjs(item?.file?.createdAt)?.format('DD/MM/YYYY')}</p>
                  {/* <p className="ml-8">{`${item?.file?.mediaSize} MB`}</p> */}
                  <p className="ml-8 text-success-placeholder-color">{`${byteToHumanSize(item?.file?.mediaSize, 1)}`}</p>
                </div>
                <div className="icons-sec">
                  <p className="h-[40px] w-[40px] flex items-center justify-center">
                    <img src={Preview} alt="doc_preview"
                      onClick={() => {
                        setOpenPreview(true);
                        setPreViewModal({
                          extension: item?.file?.metaData?.extension,
                          url: `${constants?.MEDIA_URL}/${item?.file?.mediaId}.${item?.file?.metaData?.extension}`,
                        })
                      }
                      } />
                  </p>
                </div>
                <div className="icons-sec">
                  <p className="h-[40px] w-[40px] flex items-center justify-center">
                    <a href={`${constants?.MEDIA_URL}/${item?.file?.mediaId}.${item?.file?.metaData?.extension}`}>
                      <DownloadDocumentIcon />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          })}
        </div>}
      {openPreview && <PdfPreviewModal setOpen={setOpenPreview} open={openPreview} preViewModal={preViewModal} />}
    </div>
  )
}

export default DocumentsTab