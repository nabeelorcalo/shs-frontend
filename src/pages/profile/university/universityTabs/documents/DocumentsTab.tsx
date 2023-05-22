import React from 'react'
import { BrpIcon, CvIcon, DbsIcon, DownloadDocumentIcon, PassportIcon, PoaIcon, UalIcon } from '../../../../../assets/images'
import Preview from "../../../../../assets/images/candidates/preview.svg";
import "./Styles.scss";

const DocumentsTab = () => {

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
                                    {" "}
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