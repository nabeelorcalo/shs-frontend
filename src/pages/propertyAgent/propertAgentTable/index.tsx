import { useState } from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Col, Row, Menu, Form, Space, Select } from "antd";
import { DropDown, SearchBar, GlobalTable, FiltersButton, PopUpModal } from "../../../components";
import Drawer from "../../../components/Drawer";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
import "../style.scss";
import { WarningIcon } from "../../../assets/images";
import { useNavigate } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../../config/constants";

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
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [open, setOpen] = useState(false);
  const searchValue = () => { };

  const handleChangeSelect = (value: string) => {
    console.log(`selected ${value}`);
  };
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
      <Menu.Item key="2">Block</Menu.Item>
      <Menu.Item key="3">
        <div onClick={() => { setOpen(true) }}>Password Reset</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="property-agent-table">
      <Drawer
        open={openDrawer}
        title=" Filters"
        onClose={() => setOpenDrawer(false)}
      >
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
      <div className="inner-agent-table">
        <Row gutter={[20, 20]}>
          <Col xl={6} lg={9} md={24} sm={24} xs={24}>
            <SearchBar handleChange={searchValue} />
          </Col>
          <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex max-sm:flex-col gap-4 justify-end">
            <FiltersButton label='Filter' onClick={() => setOpenDrawer(true)} />
            <div className="w-25">
              <DropDown
                requiredDownloadIcon
                options={["pdf", "excel"]}
                value={value}
                setValue={setValue}
              />
            </div>
          </Col>
          <Col xs={24}>
            <GlobalTable tableData={tableData} columns={columns} pagination={false} />
          </Col>
        </Row>
      </div>
      <PopUpModal
        open={open}
        width={500}
        close={() => { setOpen(false) }}
        children={
          <div className="flex flex-col gap-5">
            <div className='flex flex-row items-center gap-3'>
              <div><WarningIcon /></div>
              <div><h2>Reset Password</h2></div>
            </div>
            <p>Are you sure you want to generate reset the password request?</p>
          </div>
        }
        footer={
          <div className="flex flex-row pt-4 gap-3 justify-end max-sm:flex-col">
            <Button
              type="default"
              size="small"
              className="button-default-tertiary max-sm:w-full"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="small"
              className="button-tertiary max-sm:w-full"
              onClick={() => {
                setOpen(false)
                navigate(`/${ROUTES_CONSTANTS.CREATE_PASSWORD}`)
              }}
            >
              Reset
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default PropertyAgentTable;
