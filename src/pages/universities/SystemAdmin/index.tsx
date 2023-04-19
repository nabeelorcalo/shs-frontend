import React, { useState } from "react";
import {
  NodeExpandOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Button, Col, Form, Menu, Row, Space,Select } from "antd";
import { DropDown, SearchBar, GlobalTable, PageHeader, FiltersButton } from "../../../components";
import Drawer from "../../../components/Drawer";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
import { useNavigate } from "react-router-dom";

const tableData = [
  {
    Actions: "fffff",
    universityName: "University of Birmingham",
    status: "Active",
    address: "kljdasfhuasd",
    Email: "michael.mitc@example.com",
    no: "01",
    PhoneNumber: "070 3397 6621 ",
    contactPerson: "Jenny Wilson",
    city: "London",
    hired: "Yes",
    noOfInterns: "124",
  },
  {
    Actions: "fffff",
    universityName: "University of Birmingham",
    noOfInterns: "124",
    status: "Active",
    address: "kljdasfhuasd",
    PhoneNumber: "070 3397 6621 ",
    Email: "jackson.graham@example.com",
    no: "02",
    contactPerson: "Jenny Wilson",
  },
  {
    Actions: "fffff",
    universityName: "University of Birmingham",
    status: "Inactive",
    address: "kljdasfhuasd",
    PhoneNumber: "070 3397 6621 ",
    Email: "jackson.graham@example.com",
    no: "03",
    noOfInterns: "124",
    contactPerson: "Jenny Wilson",
    city: "London",
    hired: "No",
  },
  {
    Actions: "fffff",
    universityName: "University of Birmingham",
    status: "Inactive",
    address: "kljdasfhuasd",
    PhoneNumber: "070 3397 6621 ",
    Email: "jackson.graham@example.com",
    no: "04",
    noOfInterns: "124",
    contactPerson: "Jenny Wilson",
    city: "London",
    hired: "No",
  },
];

const UniveristyMain = () => {
  
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const searchValue = () => { };

  const handleChangeSelect = (value: string) => {
    console.log(`selected ${value}`);
  };

  const columns = [
    {
      dataIndex: "no",
      key: "no",
      title: "Sr. No",
    },
    {
      dataIndex: "universityName",
      key: "universityName",
      title: " University Name",
    },
    {
      dataIndex: "contactPerson",
      key: "constactPerson",
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
      <Menu.Item onClick={()=> navigate(`/universities/Profile`)} key="1">View Details</Menu.Item>
      <Menu.Item key="2">Block</Menu.Item>
      <Menu.Item key="3">
        <a href="create-password">Password Reset</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="univeristy-main">
      <Drawer
        open={openDrawer}
        title=" Filters"
        onClose={() => setOpenDrawer(false)}
      >
        <Form layout="vertical">
            <div className="mb-6">
          <label>Status</label>
          <div className="mt-2">
            <Select
              className="w-[100%]"
              defaultValue="Select"
              onChange={handleChangeSelect}
              options={[
                { value: "Active", label: "Active" },
                { value: "Inactive", label: "Inactive" },
               
              ]}
            />
          </div>
        </div>
        <div className="mb-6">
          <label>City</label>
          <div className="mt-2">
            <Select
              className="w-[100%]"
              defaultValue="Select"
              onChange={handleChangeSelect}
              options={[
                { value: "London", label: "London" },
                { value: "Lacaster", label: "Lacaster" },
                { value: "Birmingham", label: "Birmingham" },
                { value: "Glassgow", label: "Glassgow" },
               
              ]}
            />
          </div>
        </div>
          <div className="flex justify-center sm:justify-end">
            <Space>
              <Button className="border-1 border-[#4A9D77] teriary-color font-semibold">
                Reset
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
            <PageHeader title='Universities' bordered={true} />
          </div>
        </Col>
      </Row>
      <Row className="m-2">
        <Col xxl={6} xl={6} lg={6} md={6} sm={24} xs={24}>
          <SearchBar handleChange={searchValue} />
        </Col>
        <Col xxl={18} xl={18} lg={18} md={18} sm={24} xs={24}>
          <div className="flex justify-end items-center gap-3">
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
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="shadow-[0px 0px 8px 1px rgba(9, 161, 218, 0.1)] white-bg-color p-2 rounded-2xl">
            <GlobalTable tableData={tableData} columns={columns} />
          </div>
        </Col>
      </Row>
      {/* <DetailPage/> */}
    </div>
  );
};

export default UniveristyMain;
