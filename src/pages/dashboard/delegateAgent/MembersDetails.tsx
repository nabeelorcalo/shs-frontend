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
}

const columns: ColumnsType<DataType> = [
  {
    title: "No.",
    dataIndex: "no",
    key: "no",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Delegate Amount",
    dataIndex: "delegateAmount",
    key: "delegateAmount",
    render: (text) => <p className="min-w-[65px]">{text}</p>,
  },
  {
    title: "Member",
    dataIndex: "member",
    key: "member",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) => (
      <p
        className={`text-white text-sm	font-normal text-center rounded-lg px-[10px] py-[2px]
     ${text.toLowerCase() === "active" ? "bg-[#4ED185]" : "bg-[#D83A52]"} `}
      >
        {text}
      </p>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    no: "1",
    name: "Ana Black",
    delegateAmount: "£15",
    member: "University",
    status: "Active",
  },
  {
    key: "1",
    no: "1",
    name: "Ana Black",
    delegateAmount: "£15",
    member: "University",
    status: "Active",
  },
  {
    key: "1",
    no: "1",
    name: "Ana Black",
    delegateAmount: "£15",
    member: "University",
    status: "Active",
  },
  {
    key: "1",
    no: "1",
    name: "Ana Black",
    delegateAmount: "£15",
    member: "University",
    status: "Active",
  },
  {
    key: "1",
    no: "1",
    name: "Ana Black",
    delegateAmount: "£15",
    member: "University",
    status: "Inactive",
  },
  {
    key: "1",
    no: "1",
    name: "Ana Black",
    delegateAmount: "£15",
    member: "University",
    status: "Active",
  },
  {
    key: "1",
    no: "1",
    name: "Ana Black",
    delegateAmount: "£15",
    member: "University",
    status: "Active",
  },
  {
    key: "1",
    no: "1",
    name: "Ana Black",
    delegateAmount: "£15",
    member: "University",
    status: "Inactive",
  },
];
const MembersDetails: FC<{}> = () => {
  return (
    <div className="bg-white xs:p-2 md:p-3 lg:p-5 rounded-2xl wrapper-shadow">
      <Row className="gap-5" align="middle">
        <p className="text-[20px] leading-[28px] text-secondary-color font-medium pb-5">
          Members Details
        </p>
      </Row>
      <GlobalTable
        columns={columns}
        tableData={data}
        pagination={false}
        height={388}
      />
    </div>
  );
};

export default MembersDetails;
