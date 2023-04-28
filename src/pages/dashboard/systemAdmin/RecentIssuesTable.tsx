import { FC } from "react";
import { Row } from "antd";
import type { ColumnsType } from "antd/es/table";
import { GlobalTable } from "../../../components";
import LogIssueModal from "./LogIssueModal";

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
      return "bg-[#363565]";
    case "in progress":
      return "bg-[#4ED185]";
    default:
      return "bg-[#C4C4CA]";
  }
};

const columns: ColumnsType<DataType> = [
  {
    title: "Issue Id ",
    dataIndex: "issueId",
    key: "issueId",
    render: (text) => <p className="break-keep min-w-[60px] text-sm">{text}</p>,
  },
  {
    title: "Reported By",
    dataIndex: "reportedBy",
    key: "reportedBy",
    render: (text) => <p className="min-w-[110px] text-sm">{text}</p>,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (text) => <p className="min-w-[110px] text-sm">{text}</p>,
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    render: (text) => <p className="min-w-[110px] text-sm">{text}</p>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) => (
      <p className={`text-white text-sm	font-normal text-center rounded-lg px-[10px] py-[2px] ${handleStatusBg(text)}`}>
        {text}
      </p>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "index",
    render: (action) => (
      <div className="min-w-[50px]">
        <LogIssueModal />
      </div>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    issueId: "1",
    reportedBy: "Ana Black",
    date: "22 Dec 2022",
    time: "5:45 AM",
    status: "Pending",
    action: "d",
  },
  {
    key: "2",
    issueId: "02",
    reportedBy: "Jenny Wilson",
    date: "19 Dec 2022",
    time: "6:45 AM",
    status: "Resolved",
    action: "d",
  },
  {
    key: "3",
    issueId: "03",
    reportedBy: "Robert Fox",
    date: "13 Dec 2022",
    time: "2:35 PM",
    status: "In Progress",
    action: "d",
  },
];

const RecentIssuesTable: FC<{}> = () => {
  return (
    <div className="bg-white xs:p-2 md:p-3 lg:p-5 rounded-2xl wrapper-shadow">
      <Row className="gap-5" align="middle">
        <p className="text-[20px] leading-[28px] text-secondary-color font-medium pb-5">Recent Issues</p>
      </Row>
      <GlobalTable columns={columns} tableData={data} pagination={false} height={155} />
    </div>
  );
};

export default RecentIssuesTable;
