import React from "react";
import { Table } from "antd";
import { GlobalTable } from "../../../../components";

const columns = [
  {
    title: "No",
    dataIndex: "name",
  },
  {
    title: "Preview",
    dataIndex: "age",
  },
  {
    title: "Name",
    dataIndex: "address",
  },
  {
    title: "Favourite",
    dataIndex: "address",
  },
  {
    title: "Date",
    dataIndex: "address",
  },
  {
    title: "File Size",
    dataIndex: "address",
  },
  {
    title: "Action",
    dataIndex: "address",
  },
];
const data = [
  {
    key: "1",
    no: "01",
    name: "resume.pdf",
    // age: star,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    no: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    no: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
];
const DocTable = () => {
  return (
    <div>
      <GlobalTable tableData={data} columns={columns} pagination={false} />
    </div>
  );
};

export default DocTable;
