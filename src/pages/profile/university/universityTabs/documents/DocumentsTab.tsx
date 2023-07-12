import { DownloadDocumentIcon } from '../../../../../assets/images'
import Preview from "../../../../../assets/images/candidates/preview.svg";
import "./Styles.scss";
import constants from '../../../../../config/constants';

const DocumentsTab = (props: any) => {
  const { info } = props;
  // const ReqDocData = [
  //   {
  //     image: <CvIcon />,
  //     title: "Cv",
  //     descr: "Resume.pdf",
  //     date: "01/07/2022",
  //     size: "2.3 MB",
  //   },
  //   {
  //     image: <DbsIcon />,
  //     title: "DBS",
  //     descr: "Resume.pdf",
  //     date: "01/07/2022",
  //     size: "2.3 MB",
  //   },
  //   {
  //     image: <UalIcon />,
  //     title: "University Approved Letter",
  //     descr: "Resume.pdf",
  //     date: "01/07/2022",
  //     size: "2.3 MB",
  //   },
  //   {
  //     image: <PassportIcon />,
  //     title: "Passport",
  //     descr: "Resume.pdf",
  //     date: "01/07/2022",
  //     size: "2.3 MB",
  //   },
  //   {
  //     image: <BrpIcon />,
  //     title: "BRP",
  //     descr: "Resume.pdf",
  //     date: "01/07/2022",
  //     size: "2.3 MB",
  //   },
  //   {
  //     image: <PoaIcon />,
  //     title: "Proof of Address",
  //     descr: "Resume.pdf",
  //     date: "01/07/2022",
  //     size: "2.3 MB",
  //   },
  // ];

  return (
    <div>
      <div className="files-wrap mt-6">
        {info?.docs?.map((item: any) => (
          <div className="files flex justify-between py-3 px-3">
            <div className="flex gap-4">
              <img
                src={`${constants.MEDIA_URL}/${item?.file?.mediaId}.${item?.file?.metaData?.extension}`}
                alt="docs"
                height={48}
                width={48} />
              <div className="">
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
        ))}
      </div>
    </div>
  )
}

export default DocumentsTab