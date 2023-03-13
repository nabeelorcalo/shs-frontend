import {
  EllipsisOutlined,
  NodeExpandOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Form,
  Row,
  Typography,
  Layout,
  Space,
  Menu,
} from "antd";
import React, { useState } from "react";
import { DropDown, SearchBar } from "../../../components";
import GlobalTable from "../../../components/Table/Table";
import Drawer from "../../../components/Drawer";
import CustomDroupDown from "../../digiVault/digiVaultStudent/droupDownCustom/CustomDroupDown";

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
            textAlign: "center",
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
              <Button className="border-1 border-[#4A9D77] text-[#4A9D77] font-semibold">
                Cancel
              </Button>
              <Button
                className="bg-[#4a9d77] text-white border-0 border-[#4a9d77] ml-2 pt-0 pb-0 pl-5 pr-5"
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
              onClick={() => {
                setOpenDrawer(true);
              }}
              className="bg-[#E6F4F9] rounded-lg color-[#A0A3BD] font-normal text-base font-[outfit] m-3"
            >
              <NodeExpandOutlined className="text-base" />
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
