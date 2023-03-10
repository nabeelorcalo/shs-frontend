import {
  MoreOutlined,
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
    dataIndex: "Name",
    key: "Name",
    title: "Name",
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
    dataIndex: "University",
    key: "University",
    title: "University",
  },
  {
    dataIndex: "city",
    key: "city",
    title: "City",
  },
  {
    dataIndex: "hired",
    key: "hired",
    title: "Hired",
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
              : data.status === "Inactive"
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
    // render: (_: any, data: any) => (
    //     <div className='border-solid border-2 border-indigo-600'>
    //       p
    //     </div>
    // ),
    key: "Actions",
    title: "Actions",
  },
];
const tableData = [
  {
    Actions: (
      <div>
        <MoreOutlined />
      </div>
    ),
    University: "University of Birmingham",
    status: "Active",
    company: "kljdasfhuasd",
    Email: "michael.mitc@example.com",
    no: "01",
    PhoneNumber: "070 3397 6621 ",
    Name: "Jenny Wilson",
    city: "London",
    hired: "Yes",
  },
  {
    Actions: (
      <span>
        <MoreOutlined />
      </span>
    ),
    University: "University of Birmingham",

    status: "Active",
    company: "kljdasfhuasd",
    PhoneNumber: "070 3397 6621 ",
    Email: "jackson.graham@example.com",
    no: "02",
    Name: "Jenny Wilson",
    city: "London",
    hired: "Yes",
  },
  {
    Actions: (
      <div>
        <MoreOutlined />
        {/* <div
            style={{
              border: "2px solid #D9DBE9",
              background: "#FFFFFF",
              boxShadow: "0px 0px 8px 2px rgba(9, 161, 218, 0.1)",
              borderRadius: "8px",
            }}
          ><Typography>View Details</Typography></div> */}
      </div>
    ),
    University: "University of Birmingham",
    status: "Inactive",
    company: "kljdasfhuasd",
    PhoneNumber: "070 3397 6621 ",
    Email: "jackson.graham@example.com",
    no: "03",

    Name: "Jenny Wilson",
    city: "London",
    hired: "No",
  },
  {
    Actions: (
      <div>
        <MoreOutlined />
        {/* <div
            style={{
              border: "2px solid #D9DBE9",
              background: "#FFFFFF",
              boxShadow: "0px 0px 8px 2px rgba(9, 161, 218, 0.1)",
              borderRadius: "8px",
            }}
          ><Typography>View Details</Typography></div> */}
      </div>
    ),
    University: "University of Birmingham",
    status: "Inactive",
    company: "kljdasfhuasd",
    PhoneNumber: "070 3397 6621 ",
    Email: "jackson.graham@example.com",
    no: "04",

    Name: "Jenny Wilson",
    city: "London",
    hired: "No",
  },
];

const StudentMain = () => {
  const [value, setValue] = useState("");
  const searchValue = () => {};
  return (
    <div className="student-main">
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div>
            <Typography className="text-[#363565] text-2xl font-semibold font-[outfit]">
              Students
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
            <Button
              style={{
                background: "#E6F4F9",
                borderRadius: "8px",
                color: "#A0A3BD",
                fontWeight: 400,
                fontSize: "16px",
                fontFamily: "Outfit",
                margin: "12px",
              }}
            >
              <NodeExpandOutlined style={{ fontSize: "16px" }} />
              Filter
              <RightOutlined style={{ fontSize: "12px" }} />
            </Button>
            <div className="w-32">
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
            <GlobalTable
              tableData={tableData}
              columns={columns}
              pagination={false}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default StudentMain;
