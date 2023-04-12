import { FC } from "react";
import { Row } from "antd";
import type { ColumnsType } from "antd/es/table";
import { GlobalTable } from "../../../components";

interface DataType {
  key: string;
  user: string;
  activity: string ;
  performedBy: string ;
  dateTime: string ;
}

const columns: ColumnsType<DataType> = [
  {
    title: "User",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "Activity",
    dataIndex: "activity",
    key: "activity",
  },
  {
    title: "Performed By",
    dataIndex: "performedBy",
    key: "performedBy",
    render:(text)=><p className="min-w-[110px]">{text}</p>
  },
  {
    title: " Date & Time",
    dataIndex: "dateTime",
    key: "dateTime",
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

const ActivityLogTable: FC<{}> = () => {

  return (
    <div className="xs:p-2 md:p-3 lg:p-5 rounded-2xl min-h-[444px] bg-white wrapper-shadow">
      <Row className="gap-5" align='middle'>
        <p className="text-[20px] leading-[28px] text-secondary-color font-medium pb-5">Activity Log</p>
      </Row>
      <GlobalTable columns={columns} tableData={data} pagination={false} height={296} />
    </div>
  );
};

export default ActivityLogTable;