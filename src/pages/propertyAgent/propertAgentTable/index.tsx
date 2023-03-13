import React, { useState } from "react";
import {
  EllipsisOutlined,
  NodeExpandOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, Menu, Form, Space } from "antd";
import { DropDown, SearchBar } from "../../../components";
import Drawer from "../../../components/Drawer";
import GlobalTable from "../../../components/Table/Table";
import CustomDroupDown from "../../digiVault/digiVaultStudent/droupDownCustom/CustomDroupDown";
import "./propertAgent.scss";

const columns = [
  {
    dataIndex: "no",
    key: "no",
    title: "No",
  },
  {
    dataIndex: "Agent",
    key: "Agent",
    title: "Agent",
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
    dataIndex: "Publishedlisting",
    key: "Publishedlisting",
    title: "Published listing",
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
    <Menu.Item key="2">Block</Menu.Item>
    <Menu.Item key="3"> <a href="create-password">Password Reset</a> </Menu.Item>
  </Menu>
);
const tableData = [
  {
    Actions: (
      <div>
        <EllipsisOutlined />
      </div>
    ),
    Publishedlisting: "08",
    status: "Active",
    company: "kljdasfhuasd",
    Email: "michael.mitc@example.com",
    no: "01",
    PhoneNumber: "070 3397 6621 ",
    Agent: "Jenny Wilson",
  },
  {
    Actions: (
      <span>
        <EllipsisOutlined />
      </span>
    ),
    Publishedlisting: "08",

    status: "Active",
    company: "kljdasfhuasd",
    PhoneNumber: "070 3397 6621 ",
    Email: "jackson.graham@example.com",
    no: "01",
    Agent: "Jenny Wilson",
  },
  {
    Actions: (
      <div>
        <EllipsisOutlined />
      </div>
    ),
    Publishedlisting: "08",
    status: "Inactive",
    company: "kljdasfhuasd",
    PhoneNumber: "070 3397 6621 ",
    Email: "jackson.graham@example.com",
    no: "01",

    Agent: "Jenny Wilson",
  },
];

const PropertyAgentTable = () => {
  const [value, setValue] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const searchValue = () => {};
  return (
    <div className="property-agent-table">
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
                Apply
              </Button>
            </Space>
          </div>
        </Form>
      </Drawer>
      <div className="inner-agent-table">
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
            <GlobalTable
              tableData={tableData}
              columns={columns}
              pagination={false}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PropertyAgentTable;
