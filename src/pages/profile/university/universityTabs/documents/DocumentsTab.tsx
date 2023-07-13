import { CvIcon, DownloadDocumentIcon } from '../../../../../assets/images'
import Preview from "../../../../../assets/images/candidates/preview.svg";
import constants from '../../../../../config/constants';
import "./Styles.scss";

const DocumentsTab = (props: any) => {
  const { info } = props;

  return (
    <div>
      {info?.docs?.length === 0 ? <span className=''>No documents available</span> :
        <div className="files-wrap mt-6">
          {info?.docs?.map((item: any) => {
            console.log(item.file);

            return <div className="files flex justify-between py-3 px-3">
              <div className="flex gap-4">

                {item?.file?.metaData?.extension?.includes("jpg" || 'png' || 'svg' || 'jpeg') && <img
                  src={`${constants.MEDIA_URL}/${item?.file?.mediaId}.${item?.file?.metaData?.extension}`}
                  alt="docs" height={48} width={48} />}
                {item?.file?.metaData?.extension?.includes("csv" || 'xlsx') && <CvIcon />}
                {item?.file?.metaData?.extension?.includes("pdf") && <CvIcon />}
                <div>
                  <p className="cv-heading">{item?.file?.filename}</p>
                  <p>{`${item?.file?.entityType?.toLowerCase()?.replace('_', '')}.${item?.file?.metaData?.extension}`}</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div>
                  <p>{item.date}</p>
                  <p className="ml-8">{`${item?.file?.mediaSize} MB`}</p>
                </div>
                <div className="icons-sec">
                  <p className="h-[40px] w-[40px] flex items-center justify-center">
                    <img src={Preview} alt="doc_preview" />
                  </p>
                </div>
                <div className="icons-sec">
                  <p className="h-[40px] w-[40px] flex items-center justify-center">
                    <DownloadDocumentIcon />
                  </p>
                </div>
              </div>
            </div>
          })}
        </div>}
    </div>
  )
}

export default DocumentsTab