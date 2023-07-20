import { Divider } from "antd";
import { Documentcard, DocumentIcon } from "../../../../assets/images";
import { useEffect } from "react";
import useCustomHook from "../../actionHandler";
const DocData = [
  {
    docImg: <Documentcard />,
    docName: "DBS",
    fileName: "mydbs.pdf",
    date: "01/07/2022",
    size: "2.3 MB",
    docImg2: <DocumentIcon />,
  },
  {
    docImg: <Documentcard />,
    docName: "DBS",
    fileName: "mydbs.pdf",
    date: "01/07/2022",
    size: "2.3 MB",
    docImg2: <DocumentIcon />,
  },
  {
    docImg: <Documentcard />,
    docName: "DBS",
    fileName: "mydbs.pdf",
    date: "01/07/2022",
    size: "2.3 MB",
    docImg2: <DocumentIcon />,
  },
  {
    docImg: <Documentcard />,
    docName: "DBS",
    fileName: "mydbs.pdf",
    date: "01/07/2022",
    size: "2.3 MB",
    docImg2: <DocumentIcon />,
  },
  {
    docImg: <Documentcard />,
    docName: "DBS",
    fileName: "mydbs.pdf",
    date: "01/07/2022",
    size: "2.3 MB",
    docImg2: <DocumentIcon />,
  },
]

const DocumentsAgent = (props: any) => {
  const { getStudentProfile, getDocuments } = useCustomHook()
  useEffect(() => {
    getStudentProfile(props.data)
  }, [])
  console.log(getDocuments);

  return ( 
    <div>
      <div className="font-semibold text-[28px] text-secondary-color pb-4">
        Documents
      </div>
      {
        DocData.map((item) => {
          return (
            <>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="pr-2">
                    {item.docImg}
                  </div>

                  <div>
                    <p className="text-secondary-color text-base font-medium">{item.docName}</p>
                    <p className="text-secondary-color text-base font-normal">{item.fileName}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div>
                    <p className="light-grey-color text-sm font-normal">{item.date}</p>
                    <p className="light-grey-color text-sm font-normal">{item.size}</p>
                  </div>

                  <div className="pl-2">
                    <DocumentIcon />
                  </div>
                </div>
              </div>
              <Divider />
            </>
          )
        })
      }
    </div>
  );
};

export default DocumentsAgent;
