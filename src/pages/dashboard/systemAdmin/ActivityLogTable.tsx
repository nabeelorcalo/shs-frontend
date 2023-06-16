import { FC } from "react";
import { Row } from "antd";
import type { ColumnsType } from "antd/es/table";
import { GlobalTable } from "../../../components";
import dayjs from "dayjs";

interface DataType {
  key: string;
  user: string;
  activity: string;
  performedBy: string;
  dateTime: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: <th className="text-sm font-medium text-secondary-color">User</th>,
    dataIndex: "user",
    key: "user",
    render: (text) => (
      <p className="min-w-[110px] text-sm">
        {text?.firstName} {text.lastName}
      </p>
    ),
  },
  {
    title: <th className="text-sm font-medium text-secondary-color">Activity</th>,
    dataIndex: "activity",
    key: "activity",
    render: (text) => <p className="min-w-[110px] text-sm">{text}</p>,
  },
  {
    title: <th className="text-sm font-medium text-secondary-color">Performed By</th>,
    dataIndex: "performedBy",
    key: "performedByuser",
    render: (text, data: any) => (
      <p className="min-w-[110px] text-sm">
        {data?.performedByuser?.firstName} {data?.performedByuser?.lastName}
      </p>
    ),
  },
  {
    title: <th className="text-sm font-medium text-secondary-color"> Date & Time</th>,
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text) => <p className="min-w-[110px] text-sm">{dayjs(text).format("D MMM YYYY, h:mm A")}</p>,
  },
];

const data: DataType[] = [
  {
    key: "1",
    user: "Kristin Watson",
    activity: "User added",
    performedBy: "Jerome Bell",
    dateTime: "22 Dec 2022, 5:45 AM",
  },
  {
    key: "1",
    user: "Kristin Watson",
    activity: "User added",
    performedBy: "Jerome Bell",
    dateTime: "22 Dec 2022, 5:45 AM",
  },
  {
    key: "1",
    user: "Kristin Watson",
    activity: "User added",
    performedBy: "Jerome Bell",
    dateTime: "22 Dec 2022, 5:45 AM",
  },
  {
    key: "1",
    user: "Kristin Watson",
    activity: "User added",
    performedBy: "Jerome Bell",
    dateTime: "22 Dec 2022, 5:45 AM",
  },
  {
    key: "1",
    user: "Kristin Watson",
    activity: "User added",
    performedBy: "Jerome Bell",
    dateTime: "22 Dec 2022, 5:45 AM",
  },
  {
    key: "1",
    user: "Kristin Watson",
    activity: "User added",
    performedBy: "Jerome Bell",
    dateTime: "22 Dec 2022, 5:45 AM",
  },

  {
    key: "1",
    user: "Kristin Watson",
    activity: "User added",
    performedBy: "Jerome Bell",
    dateTime: "22 Dec 2022, 5:45 AM",
  },
  {
    key: "1",
    user: "Kristin Watson",
    activity: "User added",
    performedBy: "Jerome Bell",
    dateTime: "22 Dec 2022, 5:45 AM",
  },
  {
    key: "1",
    user: "Kristin Watson",
    activity: "User added",
    performedBy: "Jerome Bell",
    dateTime: "22 Dec 2022, 5:45 AM",
  },
  {
    key: "1",
    user: "Kristin Watson",
    activity: "User added",
    performedBy: "Jerome Bell",
    dateTime: "22 Dec 2022, 5:45 AM",
  },
];

const ActivityLogTable: FC<{ adminActivity: any[] }> = (props) => {
  const { adminActivity } = props;
  return (
    <div className="xs:p-2 md:p-3 lg:p-5 rounded-2xl min-h-[444px] bg-white wrapper-shadow">
      <Row className="gap-5" align="middle">
        <p className="text-[20px] leading-[28px] text-secondary-color font-medium pb-5">Activity Log</p>
      </Row>
      <GlobalTable columns={columns} tableData={adminActivity} pagination={false} height={296} />
    </div>
  );
};

export default ActivityLogTable;
