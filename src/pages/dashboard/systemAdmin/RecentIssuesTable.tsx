import { FC } from "react";
import { Row } from "antd";
import type { ColumnsType } from "antd/es/table";
import { GlobalTable } from "../../../components";
import LogIssueModal from "./LogIssueModal";
import dayjs from "dayjs";

interface DataType {
  key: string;
  issueId: string;
  reportedBy: string;
  date: string | number;
  time: string;
  status: string;
  action: any;
}

const handleStatusBg = (value: string) => {
  switch (value.toLowerCase()) {
    case "resolved":
      return "bg-[#4ED185]";
    case "inprogress":
      return "bg-[#ffc15d]";
    default:
      return "bg-[#C4C4CA]";
  }
};

const columns: ColumnsType<DataType> = [
  {
    title: <p className="text-sm font-medium text-secondary-color">Issue ID</p>,
    dataIndex: "id",
    key: "id",
    render: (text) => <p className="break-keep min-w-[60px] text-sm">{text}</p>,
  },
  {
    title: <p className="text-sm font-medium text-secondary-color min-w-[100px] ">Reported By</p>,
    dataIndex: "reportedBy",
    key: "reportedBy",
    render: (text) => <p className="min-w-[110px] text-sm">{text?.firstName + " " + text?.lastName}</p>,
  },
  {
    title: <p className="text-sm font-medium text-secondary-color">Date</p>,
    dataIndex: "date",
    key: "date",
    render: (text) => <p className="min-w-[110px] text-sm">{dayjs(text).format("DD MMM YYYY")}</p>,
  },
  {
    title: <p className="text-sm font-medium text-secondary-color">Time</p>,
    dataIndex: "date",
    key: "date",
    render: (text) => <p className="min-w-[110px] text-sm">{dayjs(text).format("hh:mm A")}</p>,
  },
  {
    title: <p className="text-sm font-medium text-secondary-color">Status</p>,
    dataIndex: "status",
    key: "status",
    render: (text) => (
      <p
        className={`text-white text-sm font-normal text-center rounded-lg px-[10px] py-[2px] ${handleStatusBg(
          text.toLowerCase()
        )}`}
      >
        {text}
      </p>
    ),
  },
  {
    title: <p className="text-sm font-medium text-secondary-color">Action</p>,
    dataIndex: "action",
    key: "index",
    render: (_, record: any) => (
      <div className="min-w-[50px]">
        <LogIssueModal id={record?.id} />
      </div>
    ),
  },
];

const RecentIssuesTable: FC<{ issues?: any[] }> = (props) => {
  const { issues } = props;
  return (
    <div className="bg-white xs:p-2 md:p-3 lg:p-5 rounded-2xl wrapper-shadow">
      <Row className="gap-5" align="middle">
        <p className="text-[20px] leading-[28px] text-secondary-color font-medium pb-5">Recent Issues</p>
      </Row>
      <GlobalTable columns={columns} tableData={issues} pagination={false} height={155} />
    </div>
  );
};

export default RecentIssuesTable;
