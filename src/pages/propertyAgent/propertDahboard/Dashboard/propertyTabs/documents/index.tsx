import { useState } from "react";
import { Divider } from "antd";
import "../../../../../profile/student/tabs/cards/userCards/styles.scss";
import CardUsers from "../../../../../profile/student/tabs/cards/userCards";
import { DownloadIconLeave, DocumentCard } from "../../../../../../assets/images";
import dayjs from 'dayjs';
import PdfPreviewModal from "../../../../../candidates/PdfPreviewModal";
import useCustomHook from "../../../../actionHandler";

const Documents = (props: any) => {
  const action = useCustomHook();
  const [open, setOpen] = useState(false);
  const [preViewModal, setPreViewModal] = useState<any>({
    extension: "",
    url: "",
  });

  const pdfHeader = [
    "Name",
    "Decription",
    "Date",
    "Time",
  ]
  const pdfBody = props.recentList[0]?.inspectionReport.map((item: any) =>
    [
      item?.inspectorName,
      item?.comments,
      dayjs(item?.inspectionDate).format('YYYY-MM-DD'),
      dayjs(item?.inspectionTime).format('YYYY-MM-DD')
    ]
  )

  return (
    <div className="document-tabs">
      {props.recentList[0]?.inspectionReport.map((item: any, index: any) => {
        return (
          <div key={index}>
            <CardUsers
              img={item?.img ? item?.img : DocumentCard}
              title={item?.inspectorName}
              description={item?.comments}
              date={dayjs(item?.inspectionDate).format('YYYY-MM-DD')}
              fSize={dayjs(item?.inspectionTime).format('YYYY-MM-DD')}
              downloadIcon={
                <div className="border-1 p-3 white-bg-color rounded-xl">
                  <div
                    onClick={() =>
                      action.downloadPdfOrCsv("pdf",
                        pdfHeader,
                        props.recentList[0]?.inspectionReport.map((item: any) => {
                          return {
                            name: item?.inspectorName,
                            description: item?.comments,
                            date: dayjs(item?.inspectionDate).format('YYYY-MM-DD'),
                            time: dayjs(item?.inspectionTime).format('YYYY-MM-DD'),
                          }
                        }
                        ), 'Inspection Report', pdfBody)}
                  >
                    <DownloadIconLeave className="text-2xl gray-color" />
                  </div>
                </div>
              }
            />
            <Divider />
          </div>
        );
      })}
      <PdfPreviewModal
        open={open}
        setOpen={setOpen}
        preViewModal={preViewModal}
      />
    </div>
  );
};

export default Documents;
