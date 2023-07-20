import { Divider } from "antd";
import { Documentcard, DocumentIcon } from "../../../../assets/images";
import useCustomHook from "../../actionHandler";
import dayjs from "dayjs";

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

const DocumentsAgent = () => {
  const { getDocuments }: any = useCustomHook()
  return (
    <div>
      <div className="font-semibold text-[28px] text-secondary-color pb-4">
        Documents
      </div>
      {getDocuments.length === 0 && <p className="text-center">No Document Found</p>}
      {
        getDocuments?.map((item: any) => {
          const size = item.file.mediaSize / 1024;
          return (
            <div key={item.id}>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="pr-2">
                    <Documentcard />
                  </div>

                  <div>
                    <p className="text-secondary-color text-base font-medium">{item?.file?.filename}</p>
                    <p className="text-secondary-color text-base font-normal">
                      {item?.file?.filename}.{item?.file?.metaData?.extension}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div>
                    <p className="light-grey-color text-sm font-normal">{dayjs(item.createdAt).format("DD/MM/YYYY")}</p>
                    <p className="light-grey-color text-sm font-normal">{size.toFixed(2)} mb</p>
                  </div>

                  <div className="pl-2">
                    <DocumentIcon />
                  </div>
                </div>
              </div>
              <Divider />
            </div>
          )
        })
      }
    </div>
  );
};

export default DocumentsAgent;
