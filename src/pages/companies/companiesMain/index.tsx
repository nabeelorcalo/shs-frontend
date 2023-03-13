import {
  EllipsisOutlined,
  NodeExpandOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, Row, Typography } from "antd";
import React, { useState } from "react";
import { DropDown, SearchBar } from "../../../components";
import GlobalTable from "../../../components/Table/Table";

const columns = [
  {
    dataIndex: "no",
    key: "no",
    title: "Sr. No",
  },
  {
    dataIndex: "companyName",
    key: "companyName",
    title: "Company Name",
  },
  {
    dataIndex: "companyadmin",
    key: "companyadmin",
    title: "Company Admin",
  },
  {
    dataIndex: "Email",
    key: "Email",
    title: "Email",
  },

  {
    dataIndex: "PhoneNumber",
    key: "PhoneNumber",
    title: "Phone Number",
  },
  {
    dataIndex: "address",
    key: "address",
    title: "Address",
  },

  {
    dataIndex: "status",
    render: (_: any, data: any) => (
      <div
        className="table-status-style"
        style={{
          backgroundColor:
            data.status === "Pending"
              ? "#FFC15D"
              : data.status === "Active"
              ? "#3DC475"
              : data.status === "Blocked"
              ? "#D83A52"
              : "",
          color: "#FFFFFF",
          padding: " 2px 3px 2px 3px",
          borderRadius: "4px",
        }}
      >
        {data.status}
      </div>
    ),
    key: "status",
    title: "Status",
  },

  {
    dataIndex: "Actions",
    key: "Actions",
    title: "Actions",
  },
];
const tableData = [
  {
    Actions: (
      <div>
        <EllipsisOutlined />
      </div>
    ),
    companyName: "University of Birmingham",
    status: "Active",
    address: "kljdasfhuasd",
    Email: "michael.mitc@example.com",
    no: "01",
    PhoneNumber: "070 3397 6621 ",
    companyadmin: "Jenny Wilson",
    city: "London",
    hired: "Yes",
  },
  {
    Actions: (
      <span>
        <EllipsisOutlined />
      </span>
    ),
    companyName: "University of Birmingham",

    status: "Active",
    address: "kljdasfhuasd",
    PhoneNumber: "070 3397 6621 ",
    Email: "jackson.graham@example.com",
    no: "02",
    companyadmin: "Jenny Wilson",
  },
  {
    Actions: (
      <div>
        <EllipsisOutlined />
      </div>
    ),
    companyName: "University of Birmingham",
    status: "Blocked",
    address: "kljdasfhuasd",
    PhoneNumber: "070 3397 6621 ",
    Email: "jackson.graham@example.com",
    no: "03",

    companyadmin: "Jenny Wilson",
    city: "London",
    hired: "No",
  },
  {
    Actions: (
      <div>
        <EllipsisOutlined />
      </div>
    ),
    companyName: "University of Birmingham",
    status: "Blocked",
    address: "kljdasfhuasd",
    PhoneNumber: "070 3397 6621 ",
    Email: "jackson.graham@example.com",
    no: "04",

    companyadmin: "Jenny Wilson",
    city: "London",
    hired: "No",
  },
];

const CompaniesMain = () => {
  const [value, setValue] = useState("");
  const searchValue = () => {};
  return (
    <div className="company-main">
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div>
            <Typography className="font-semibold text-2xl text-[#363565] font-[outfit]">
              Companies
            </Typography>
          </div>
        </Col>
      </Row>
      <Divider />

      <Row className="m-2">
        <Col xxl={6} xl={6} lg={6} md={6} sm={24} xs={24}>
          <SearchBar handleChange={searchValue} />
        </Col>
        <Col xxl={18} xl={18} lg={18} md={18} sm={24} xs={24}>
          <div className="flex justify-end items-center">
            <Button className="bg-[#E6F4F9] rounded-lg color-[#A0A3BD] font-normal text-base font-[outfit] m-3">
              <NodeExpandOutlined style={{ fontSize: "16px" }} />
              Filter
              <RightOutlined style={{ fontSize: "12px" }} />
            </Button>
            <div className="w-25">
              <DropDown
                requiredDownloadIcon
                options={["pdf", "excel"]}
                value={value}
                setValue={setValue}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="shadow-[0px 0px 8px 1px rgba(9, 161, 218, 0.1)] bg-[#FFFFFF] p-2 rounded-2xl">
            <GlobalTable tableData={tableData} columns={columns} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CompaniesMain;
