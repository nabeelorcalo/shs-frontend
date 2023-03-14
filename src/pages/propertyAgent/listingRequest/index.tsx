import React, { useState } from "react";
import {
  EllipsisOutlined,
  MoreOutlined,
  NodeExpandOutlined,
  RightOutlined,
} from "@ant-design/icons";
import GlobalTable from "../../../components/Table/Table";
import { Button, Col, Row, Typography,Space,Form,Menu } from "antd";
import { DropDown } from "../../../components";
import Drawer from "../../../components/Drawer";
import '../style.scss';
import CustomDroupDown from "../../digiVault/digiVaultStudent/droupDownCustom/CustomDroupDown";


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
          textAlign:"center"
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
        className="table-status-style text-center white-color rounded"
        style={{
          backgroundColor:
            data.Verification === "Checked"
              ? "#3DC575"
              : data.Verification === "Unchecked"
              ? "#D83A52"
              : "",
          padding: " 2px 3px 2px 3px",
        
        }}
      >
        {data.Verification}
      </div>
    ),
    key: "Verification",
    title: "Verification",
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
  
   
  </Menu>
);
const tableData = [
  {
    Actions: (
      <span>
        <EllipsisOutlined />
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
        <EllipsisOutlined />
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
        <EllipsisOutlined />
       
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
  const [value, setValue] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <div className="listing-request">
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} title='Filters'>
      <Form layout="vertical">
          <Form.Item label="Agent" name="agent">
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
         
          <div className="flex justify-center sm:justify-end">
            <Space>
              <Button className="border-1 border-[#4A9D77] teriary-color font-semibold">
                Cancel
              </Button>
              <Button
                className="teriary-bg-color text-white border-0 border-[#4a9d77] ml-2 pt-0 pb-0 pl-5 pr-5"
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
          <div className="flex justify-end gap-2 mb-3">
            <Button onClick={() => setOpenDrawer(true)}
              className="text-input-bg-color rounded-lg text-success-color font-normal text-base font-[outfit] m-3">
              <NodeExpandOutlined className="text-base" />
              Filter
              <RightOutlined className="text-xs" />
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
