import {
  EllipsisOutlined,
  MoreOutlined,
  NodeExpandOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, Form, Menu, Row, Space, Typography } from "antd";
import React, { useState } from "react";
import { DropDown, SearchBar } from "../../../components";
import Drawer from "../../../components/Drawer";
import GlobalTable from "../../../components/Table/Table";
import CustomDroupDown from "../../digiVault/digiVaultStudent/droupDownCustom/CustomDroupDown";
import DetailPage from "./detailPage";


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
  const [value, setValue] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const searchValue = () => { };
  
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
            textAlign:"center",
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
      <Menu.Item key="3">Password Reset</Menu.Item>
     
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
              <Button className="border-1 border-[#4A9D77] text-[#4A9D77] font-semibold">
                Cancel
              </Button>
              <Button
                className="bg-[#4a9d77] text-white border-0 border-[#4a9d77] ml-2 pt-0 pb-0 pl-5 pr-5"
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
            <Typography className="text-[#363565] text-2xl font-semibold font-[outfit]">
              Universities
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
            <Button onClick={()=>setOpenDrawer(true)}
             className="bg-[#E6F4F9] rounded-lg color-[#A0A3BD] font-normal text-base font-[outfit] m-3"
            >
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
            <GlobalTable
              tableData={tableData}
              columns={columns}
             
            />
          </div>
        </Col>
      </Row>
          {/* <DetailPage/> */}
    </div>
  );
};

export default UniveristyMain;
