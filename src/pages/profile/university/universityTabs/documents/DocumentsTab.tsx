import React, { useEffect } from 'react'
import { BrpIcon, CvIcon, DbsIcon, DownloadDocumentIcon, PassportIcon, PoaIcon, UalIcon } from '../../../../../assets/images'
import Preview from "../../../../../assets/images/candidates/preview.svg";
import "./Styles.scss";
import { useRecoilState } from 'recoil';
import { studentProfileState } from '../../../../../store';
import { useParams } from 'react-router-dom';
import useCustomHook from '../../../actionHandler';
import constants from '../../../../../config/constants';

const DocumentsTab = () => {
  let params = useParams()
  const action = useCustomHook()
  const generalInformation = useRecoilState<any>(studentProfileState)

  useEffect(() => {
    action.getStudentProfile(params?.id)
  }, [])

  const ReqDocData = [
    {
      image: <CvIcon />,
      title: "Cv",
      descr: "Resume.pdf",
      date: "01/07/2022",
      size: "2.3 MB",
    },
    {
      image: <DbsIcon />,
      title: "DBS",
      descr: "Resume.pdf",
      date: "01/07/2022",
      size: "2.3 MB",
    },
    {
      image: <UalIcon />,
      title: "University Approved Letter",
      descr: "Resume.pdf",
      date: "01/07/2022",
      size: "2.3 MB",
    },
    {
      image: <PassportIcon />,
      title: "Passport",
      descr: "Resume.pdf",
      date: "01/07/2022",
      size: "2.3 MB",
    },
    {
      image: <BrpIcon />,
      title: "BRP",
      descr: "Resume.pdf",
      date: "01/07/2022",
      size: "2.3 MB",
    },
    {
      image: <PoaIcon />,
      title: "Proof of Address",
      descr: "Resume.pdf",
      date: "01/07/2022",
      size: "2.3 MB",
    },
  ];

  return (
    <div>
      <div className="files-wrap mt-6">
        {generalInformation[0]?.docs.map((data: any, index: any) => (
          <div key={index} className="files flex justify-between py-3 px-3">
            <div className="flex gap-4">
              <img
                src={`${constants.MEDIA_URL}/${data?.file?.mediaId}.${data?.file?.metaData?.extension}`}
                alt=""
                className='w-[50px]'
              />
              <div className="">
                <div className="cv-heading">{data?.file.filename}</div>
                <p>{data?.file?.entityType}</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div>
                <p>{data?.file?.createdat}</p>
                <p className="ml-8">{data?.docs?.file?.mediaSize}</p>
              </div>
              <div className="icons-sec">
                <p className="h-[40px] w-[40px] flex items-center justify-center">

                  <img src={Preview} alt="" />
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