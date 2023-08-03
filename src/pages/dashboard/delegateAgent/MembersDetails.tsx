import { Row } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FC } from "react";
import { GlobalTable } from "../../../components";

interface DataType {
  key: string;
  no: string;
  name: string;
  delegateAmount: string | number;
  member: string;
  status: string;
  id?: number;
  referredToUser?: any;
  rewardAmount?: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "No.",
    dataIndex: "no",
    key: "key",
    render: (text, record, index) => (
      <p className="min-w-[55px] text-sm">{index + 1}</p>
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "referredToUser",
    render: (text, record) => (
      <p className="min-w-[110px] text-sm">
        {record?.referredToUser?.firstName} {record?.referredToUser?.lastName}
      </p>
    ),
  },
  {
    title: "Delegate Amount",
    dataIndex: "delegateAmount",
    key: "rewardAmount",
    render: (text, record) => <p className="">{record?.rewardAmount}</p>,
  },
  {
    title: "Member",
    dataIndex: "member",
    key: "referredToUser",
    render: (text, record) => (
      <p className=" text-sm">
        {record?.referredToUser?.role
          .replace(/_/g, " ")
          .toLowerCase()
          .replace(/(?:^|\s)\S/g, (char: string) => char.toUpperCase())}
      </p>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "referredToUser",
    render: (text, record) => (
      <p
        className={`text-white text-sm font-normal text-center rounded-lg px-[10px] py-[2px] inline-block
     ${record?.referredToUser?.status?.toLowerCase() === "active"
            ? "active-bg"
            : "text-error-bg-color"
          } `}
      >
        {record?.referredToUser?.status?.toLowerCase() === "active"
          ? "Active"
          : "Inactive"}
      </p>
    ),
  },
];

const MembersDetails: FC<{ membersDetails: any[] }> = (props) => {
  const { membersDetails } = props;
  return (
    <div className="bg-white xs:p-2 md:p-3 lg:p-5 rounded-2xl wrapper-shadow">
      <Row className="gap-5" align="middle">
        <p className="text-[20px] leading-[28px] text-secondary-color font-medium pb-5">
          Members Details
        </p>
      </Row>
      <GlobalTable
        columns={columns}
        tableData={membersDetails}
        pagination={false}
        height={388}
      />
    </div>
  );
};

export default MembersDetails;
