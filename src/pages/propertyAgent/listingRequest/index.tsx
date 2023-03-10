import {
  MoreOutlined,
  NodeExpandOutlined,
  RightOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import GlobalTable from "../../../components/Table/Table";
import { Button, Col, Row, Typography } from "antd";
import { DropDown } from "../../../components";

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
    dataIndex: "propertyType",
    key: "Property Type",
    title: "Property Type",
  },
  {
    dataIndex: "Rent",
    key: "Rent",
    title: "Rent",
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
              : data.status === "Published"
              ? "#3DC475"
              : data.status === "Rejected"
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
    dataIndex: "Verification",
    render: (_: any, data: any) => (
      <div
        className="table-status-style"
        style={{
          backgroundColor:
            data.Verification === "Checked"
              ? "#3DC575"
              : data.Verification === "Unchecked"
              ? "#D83A52"
              : "",
          color: "#FFFFFF",
          padding: " 2px 3px 2px 3px",
          borderRadius: "4px",
        }}
      >
        {data.Verification}
      </div>
    ),
    key: "Verification",
    title: "Verification",
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
      <span>
        <MoreOutlined />
      </span>
    ),
    Rent: "£9,823",
    status: "Pending",
    company: "kljdasfhuasd",
    Address: "Near Giga Mall, Islamabad",
    Verification: "Checked",
    propertyType: "Single Room",
    Name: "Jenny Wilson",
  },
  {
    Actions: (
      <span>
        <MoreOutlined />
      </span>
    ),
    Rent: "£9,823",

    status: "Published",
    company: "kljdasfhuasd",
    propertyType: "Single Room",
    Address: "2 Woodhurst Crescent, Liverpool, L14 0BA",
    Verification: "Checked",

    Name: "Jenny Wilson",
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
    Rent: "£7,823",

    status: "Rejected",
    company: "kljdasfhuasd",
    propertyType: "Single Room",
    Address: "2 Woodhurst Crescent, Liverpool, L14 0BA",
    Verification: "Unchecked",

    Name: "Jenny Wilson",
  },
];

const ListingRequest = () => {
  const [value, setValue] = useState('');
  return (
    <div className="listing-request">
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="flex justify-end gap-2 mb-3">
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
              <NodeExpandOutlined style={{ fontSize: "16px" }}  />
              Filter
              <RightOutlined style={{ fontSize: "12px" }} />
            </Button>
            <DropDown
              requiredDownloadIcon
              options={["pdf", "excel"]}
              value={value}
              setValue={setValue}
            />
          </div>
        </Col>
      </Row>
      <GlobalTable tableData={tableData} columns={columns} />
    </div>
  );
};

export default ListingRequest;
