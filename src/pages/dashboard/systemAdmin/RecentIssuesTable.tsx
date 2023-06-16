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
      return "bg-[#363565]";
    case "inprogress":
      return "bg-[#4ED185]";
    default:
      return "bg-[#C4C4CA]";
  }
};

const columns: ColumnsType<DataType> = [
  {
    title: <th className="text-sm font-medium text-secondary-color">Issue Id</th>,
    dataIndex: "id",
    key: "id",
    render: (text) => <p className="break-keep min-w-[60px] text-sm">{text}</p>,
  },
  {
    title: <th className="text-sm font-medium text-secondary-color">Reported By</th>,
    dataIndex: "reportedBy",
    key: "reportedBy",
    render: (text) => <p className="min-w-[110px] text-sm">{text?.firstName + " " + text?.lastName}</p>,
  },
  {
    title: <th className="text-sm font-medium text-secondary-color">Date</th>,
    dataIndex: "date",
    key: "date",
    render: (text) => <p className="min-w-[110px] text-sm">{dayjs(text).format("DD MMM YYYY")}</p>,
  },
  {
    title: <th className="text-sm font-medium text-secondary-color">Time</th>,
    dataIndex: "date",
    key: "date",
    render: (text) => <p className="min-w-[110px] text-sm">{dayjs(text).format("hh:mm A")}</p>,
  },
  {
    title: <th className="text-sm font-medium text-secondary-color">Status</th>,
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
    title: <th className="text-sm font-medium text-secondary-color">Action</th>,
    dataIndex: "action",
    key: "index",
    render: (action: any, record: any) => (
      <div className="min-w-[50px]">
        <LogIssueModal id={record?.id} />
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
