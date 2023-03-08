import React from "react";
import GlobalTable from "../../../components/Table/Table";

const columns = [
  {
    dataIndex: "Name",
    key: "Name",
    title: "Name",
  },
  {
    dataIndex: "Address",
    key: "Address",
    title: "Address",
  },
  {
    dataIndex: "company",
    key: "company",
    title: "Company",
  },
];
const tableData = [
  {
    Actions: "fduhguisd",
    Position: "gjdifsdu",
    Status: "fjgvifd",
    company: "kljdasfhuasd",
    Address: "01/07 /2022",
    internshipType: "nice",
    natureOfWork: "asduhfuiyasdg",
    Name: "Jenny Wilson",
    typeOfWork: "New York Name. 1 Lake Park",
  },
  {
    Actions: "fduhguisd",
    Position: "gjdifsdu",
    Status: "fjgvifd",
    company: "kljdasfhuasd",
    Address: "01/07 /2022",
    internshipType: "nice",
    natureOfWork: "asduhfuiyasdg",
    Name: "Jenny Wilson",
    typeOfWork: "New York Name. 1 Lake Park",
  },
];

const ListingRequest = () => {
  return (
    <>
      <GlobalTable tableData={tableData} columns={columns} />
    </>
  );
};

export default ListingRequest;
