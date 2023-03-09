import { MoreOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import React, { useState } from "react";
import { DropDown, SearchBar } from "../../../../components";
import GlobalTable from "../../../../components/Table/Table";

const WithDrawalRequest = () => {
  const [value, setValue] = useState("");

  const searchValue = () => {};

  const columns = [
    {
      dataIndex: "no",
      key: "no",
      title: "No.",
    },
    {
      dataIndex: "bankName",
      key: "bankName",
      title: "Bank Name",
    },
    {
      dataIndex: "datetime",
      key: "datetime",
      title: "Date/Time",
    },
    {
      dataIndex: "transactionId",
      key: "transactionId",
      title: "Transaction Id",
    },
    {
      dataIndex: "amount",
      key: "amount",
      title: "Amount",
    },
   
    {
      dataIndex: "Fee",
      key: "Fee",
      title: "Fee",
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
                : data.status === "Completed"
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
      Fee: "£9,823",
      status: "Pending",
      amount: "20 GBP ",
      datetime: "Near Giga Mall, Islamabad",
      transactionId: "Single Room",
          bankName: "Natwest Group",
      no:"01",
    },
    {
      Actions: (
        <span>
          <MoreOutlined />
        </span>
      ),
      Fee: "£9,823",

      status: "Completed",
      amount: "100 GBP ",
      transactionId: "Single Room",
      datetime: "2 Woodhurst Crescent, Liverpool, L14 0BA",
     
      no:"02",
      bankName: "Natwest Group",
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
      Fee: "£7,823",

      status: "Rejected",
      amount: "10 GBP ",
      transactionId: "Single Room",
      datetime: "2 Woodhurst Crescent, Liverpool, L14 0BA",
  
      no:"03",
      bankName: "Natwest Group",
    },
  ];

  return (
    <div className="with-drawal-request">
      <Row>
        <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
          <SearchBar handleChange={searchValue} />
        </Col>
        <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
          <div className="flex  justify-center md:justify-end gap-3 mt-3 md:mt-0">
            <DropDown
              name="Status"
              value={value}
              options={["item 1", "item 2", "item 3"]}
              setValue={setValue}
            />
            <DropDown
              name="Method"
              value={value}
              options={["item 1", "item 2", "item 3"]}
              setValue={setValue}
            />
          </div>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="shadow-[0px 0px 8px 1px rgba(9, 161, 218, 0.1)] bg-[#FFFFFF] p-2 rounded-2xl">
            <GlobalTable tableData={tableData} columns={columns} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default WithDrawalRequest;
