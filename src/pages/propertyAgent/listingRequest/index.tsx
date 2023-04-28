import { useState } from "react";
import { EllipsisOutlined} from "@ant-design/icons";
import { BoxWrapper, FiltersButton, GlobalTable } from "../../../components";
import { Button, Col, Row, Space, Form, Menu, Select } from 'antd';
import { DropDown } from "../../../components";
import Drawer from "../../../components/Drawer";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
import '../style.scss';


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
        className="table-status-style text-center white-color rounded"
        style={{
          backgroundColor:
            data.status === "Pending"
              ? "#FFC15D"
              : data.status === "Published"
                ? "#3DC475"
                : data.status === "Rejected"
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

  const handleChangeSelect = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="listing-request">
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} title='Filters'>
        <Form layout="vertical">
        <div className="mb-6">
          <label>Agent</label>
          <div className="mt-2">
            <Select
              className="w-[100%]"
              defaultValue="Select"
              onChange={handleChangeSelect}
              options={[
                { value: "DarrelSteward", label: "DarrelSteward" },
                { value: "Inactive", label: "Inactive" },
               
              ]}
            />
          </div>
        </div>
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
                { value: "Publish", label: "Publish" },
               
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
      <Row gutter={[20,20]}>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24} className="flex max-sm:flex-col justify-end">
            <FiltersButton label='Filter' onClick={() => setOpenDrawer(true)} />
            {/* <div className="w-25">
              <DropDown
                requiredDownloadIcon
                options={["pdf", "excel"]}
                value={value}
                setValue={setValue}
              />
            </div> */}
        </Col>
        <Col xs={24}>
          <BoxWrapper>
            <GlobalTable tableData={tableData} columns={columns} />
          </BoxWrapper>
        </Col>
      </Row>
    </div>
  );
};

export default ListingRequest;
