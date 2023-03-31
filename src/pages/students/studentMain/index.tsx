import React, { useState } from "react";
import { NodeExpandOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Row, Typography, Space, Menu } from "antd";
import { DropDown, SearchBar, GlobalTable, PageHeader, FiltersButton, BoxWrapper } from "../../../components";
import Drawer from "../../../components/Drawer";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";

const tableData = [
  {
    Actions: "fffff",
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
    Actions: "fffff",
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
    Actions: "fffff",
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
    Actions: "fffff",
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
  const [openDrawer, setOpenDrawer] = useState(false);
  const searchValue = () => {};
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
          className="table-status-style text-center rounded white-color"
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
    <div className="student-main">
      <Drawer
        open={openDrawer}
        title=" Filters"
        onClose={() => setOpenDrawer(false)}
      >
        <Form layout="vertical">
          <Form.Item label="Type" name="type">
            <DropDown
              name="Select"
              value={value}
              options={["item 1", "item 2", "item 3"]}
              setValue={setValue}
            />
          </Form.Item>
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
                className="teriary-bg-color white-color border-0 border-[#4a9d77] ml-2 pt-0 pb-0 pl-5 pr-5"
                htmlType="submit"
              >
                Apply
              </Button>
            </Space>
          </div>
        </Form>
      </Drawer>
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div>
            <PageHeader title='Student' bordered={true} />
          </div>
        </Col>
      </Row>
      <Row className="m-2">
        <Col xxl={6} xl={6} lg={6} md={6} sm={24} xs={24}>
          <SearchBar handleChange={searchValue} />
        </Col>
        <Col xxl={18} xl={18} lg={18} md={18} sm={24} xs={24}>
          <div className="flex justify-end items-center gap-3 right-menu">
          <FiltersButton label='Filter' onClick={() => setOpenDrawer(true)}/> 
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
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24} className="my-2">
          <BoxWrapper>
          <div className="shadow-[0px 0px 8px 1px rgba(9, 161, 218, 0.1)] white-bg-color p-2 rounded-2xl">
            <GlobalTable
              tableData={tableData}
              columns={columns}
              pagination={false}
            />
          </div>
          </BoxWrapper>
        </Col>
      </Row>
    </div>
  );
};

export default StudentMain;
