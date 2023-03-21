import React, { useState } from "react";
import { Button, Col, Divider, Form, Menu, Row, Space, Typography } from "antd";
import { NodeExpandOutlined, RightOutlined } from "@ant-design/icons";
import { DropDown, SearchBar, GlobalTable } from "../../../components";
import Drawer from "../../../components/Drawer";
import CustomDroupDown from "import CustomDroupDown from "../../digiVault/Student/dropDownCustom"";

const tableData = [
  {
    Actions: "fffff",
    companyName: "University of Birmingham",
    status: "Active",
    address: "kljdasfhuasd",
    Email: "michael.mitc@example.com",
    no: "01",
    PhoneNumber: "070 3397 6621 ",
    companyadmin: "Jenny Wilson",
    city: "London",
    noOfInterns: "10",
    hired: "Yes",
  },
  {
    Actions: "fffff",
    companyName: "University of Birmingham",
    status: "Active",
    address: "kljdasfhuasd",
    PhoneNumber: "070 3397 6621 ",
    Email: "jackson.graham@example.com",
    no: "02",
    companyadmin: "Jenny Wilson",
    noOfInterns: "10",
  },
  {
    Actions: "fffff",
    companyName: "University of Birmingham",
    status: "Inactive",
    address: "kljdasfhuasd",
    PhoneNumber: "070 3397 6621 ",
    Email: "jackson.graham@example.com",
    no: "03",
    noOfInterns: "10",
    companyadmin: "Jenny Wilson",
    city: "London",
    hired: "No",
  },
  {
    Actions: "fffff",
    companyName: "University of Birmingham",
    status: "Inactive",
    address: "kljdasfhuasd",
    PhoneNumber: "070 3397 6621 ",
    Email: "jackson.graham@example.com",
    no: "04",
    noOfInterns: "10",
    companyadmin: "Jenny Wilson",
    city: "London",
    hired: "No",
  },
];

const CompaniesMain = () => {
  const [value, setValue] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const searchValue = () => {};
  const columns = [
    {
      dataIndex: "no",
      key: "no",
      title: "Sr. No",
    },
    {
      dataIndex: "companyName",
      key: "companyName",
      title: " University Name",
    },
    {
      dataIndex: "companyadmin",
      key: "companyadmin",
      title: " Contact Person",
    },
    {
      dataIndex: "Email",
      key: "Email",
      title: "Email",
    },
    {
      dataIndex: "noOfInterns",
      key: "noOfInterns",
      title: "No.Of Interns",
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
          className="table-status-style text-center white-color rounded"
          style={{
            backgroundColor:
              data.status === "Pending"
                ? "#FFC15D"
                : data.status === "Active"
                ? "#3DC475"
                : data.status === "Inactive"
                ? "#D83A52"
                : "",
            padding: " 2px 3px 2px 3px",

          }}
        >
          {data.status}
        </div>
      ),
      key: "status",
      title: "Status",
    },

    {
      render: (_: any, data: any) => (
        <span>
          <CustomDroupDown menu1={menu2} />
        </span>
      ),
      key: "Actions",
      title: "Actions",
    },
  ];
  const menu2 = (
    <Menu>
      <Menu.Item key="1">View Details</Menu.Item>
      <Menu.Item key="2">Block</Menu.Item>
      <Menu.Item key="3">
        <a href="create-password">Password Reset</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="company-main">
      <Drawer
        open={openDrawer}
        title=" Filters"
        onClose={() => setOpenDrawer(false)}
      >
        <Form layout="vertical">
          <Form.Item label="Status" name="status">
            <DropDown
              name="Select"
              value={value}
              options={["item 1", "item 2", "item 3"]}
              setValue={setValue}
            />
          </Form.Item>
          <Form.Item label="City" name="city">
            <DropDown
              name="Select"
              value={value}
              options={["item 1", "item 2", "item 3"]}
              setValue={setValue}
            />
          </Form.Item>
          <div className="flex justify-center sm:justify-end">
            <Space>
              <Button className="border-1 border-[#4A9D77] teriary-color font-semibold">
                Cancel
              </Button>
              <Button
                className="teriary-bg-color  white-color border-0 border-[#4a9d77] ml-2 pt-0 pb-0 pl-5 pr-5"
                htmlType="submit"
              >
                Submit
              </Button>
            </Space>
          </div>
        </Form>
      </Drawer>
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div>
            <Typography className="font-semibold text-2xl primary-color font-[outfit]">
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
            <Button
              onClick={() => setOpenDrawer(true)}
              className="text-input-bg-color rounded-lg text-[#A0A3BD] font-normal text-base font-[outfit] m-3"
            >
              <NodeExpandOutlined className="text-base"/>
              Filter
              <RightOutlined className="text-xs" />
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
          <div className="shadow-[0px 0px 8px 1px rgba(9, 161, 218, 0.1)] white-bg-color p-2 rounded-2xl">
            <GlobalTable tableData={tableData} columns={columns} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CompaniesMain;
