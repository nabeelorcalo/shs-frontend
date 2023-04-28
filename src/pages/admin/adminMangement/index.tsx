import React, { useState } from "react";
import {
  CloseCircleFilled,
  EllipsisOutlined,
  RightOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Menu,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import { CalendarIcon } from "../../../assets/images";
import { CommonDatePicker, DropDown, SearchBar, GlobalTable, PageHeader, FiltersButton, BoxWrapper } from "../../../components";
import Drawer from "../../../components/Drawer";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
import useCustomHook from "../actionHandler";
import { Option } from "antd/es/mentions";

const tableData = [
  {
    Actions: "fffff",
    date: "23/09/2022",
    status: "Active",
    email: "anablack@gmail.com",
    phoneNumber: "0333333333",
    name: "Natwest Group",
    no: "01",
  },
  {
    Actions: "fffff",
    date: "23/09/2022",
    status: "Active",
    phoneNumber: "0333333333",
    email: "anablack@gmail.com",
    no: "02",
    name: "Natwest Group",
  },
  {
    Actions: (
      <div>
        <EllipsisOutlined />
      </div>
    ),
    date: "23/09/2022",
    status: "Inactive",
    phoneNumber: "0333333333",
    email: "anablack@gmail.com",
    no: "03",
    name: "Natwest Group",
  },
];

const options =[
  { value: "London", label: "London" },
  { value: "Lacaster", label: "Lacaster" },
  { value: "Birmingham", label: "Birmingham" },
  { value: "Glassgow", label: "Glassgow" },
]

const AdminManagement = () => {
  const action = useCustomHook()
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [openC, setOpenC] = useState(false);
  const [isdate1, setIsDate1] = useState(false);

  const handleChangeSelect = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const [openDrawer, setOpenDrawer] = useState(false);
  const searchValue = () => { };
  const csvColum = ["No.",	"Name",	"Email",	"Phone Number",	"Date",	"Status"]

  const columns = [
    {
      dataIndex: "no",
      key: "no",
      title: "No.",
    },
    {
      dataIndex: "name",
      key: "name",
      title: "Name",
    },
    {
      dataIndex: "email",
      key: "email",
      title: "Email",
    },
    {
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      title: "Phone Number",
    },
    {
      dataIndex: "date",
      key: "date",
      title: "Date",
    },

    {
      dataIndex: "status",
      render: (_: any, data: any) => (
        <div
          className="table-status-style text-center rounded white-color"
          style={{
            backgroundColor:
              data.status === "Active"
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
      <Menu.Item key="2">Blocked</Menu.Item>
      <Menu.Item key="3">
        <a href="create-password">Password Reset</a>
      </Menu.Item>
    </Menu>
  );
  
  return (
    <div className="admin-management">
      <Drawer
        open={openDrawer}
        title=" Filters"
        onClose={() => setOpenDrawer(false)}
      >
        <Form layout="vertical">
          <Form.Item label="Status" name="status">
            <CommonDatePicker
              requireAsButton
              btnIcon={CalendarIcon}
              btnClassName={"h-[48px]"}
              placement="bottomRight"
              open={isdate1}
              setOpen={setIsDate1}
              setValue={setValue}
            />
          </Form.Item>
          <div className="mb-6">
          <label>City</label>
          <div className="mt-2">
            <Select
              className="w-[100%]"
              defaultValue="Select"
              onChange={handleChangeSelect}
              options={options}
            />
          </div>
        </div>
          <div className="flex justify-center sm:justify-end">
            <Space>
              <Button className="border-1 border-[#4A9D77] teriary-color font-semibold">
                Cancel
              </Button>
              <Button
                className="teriary-bg-color white-color border-0 border-[#4a9d77] ml-2 pt-0 pb-0 pl-5 pr-5"
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
            <PageHeader title='Admin Management' bordered={true} />
          </div>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
          <SearchBar handleChange={searchValue} />
        </Col>
        <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
          <div className="flex justify-end items-center gap-3 mb-3 admin-right-menu">
            <div className="filter-btn">
              <FiltersButton label='Filter' onClick={() => setOpenDrawer(true)} />
            </div>
            <div className="w-25 download-btn">
              <DropDown
                requiredDownloadIcon
                options={["pdf", "excel"]}
                value={value}
                setValue={() => {
                  action.downloadPdfOrCsv(event, csvColum, tableData, "Admin Management Detail")
                }}
              />
            </div>
            <Button
              className="teriary-bg-color white-color text-base font-semibold flex items-center"
              onClick={() => {
                setOpen(true);
              }}
            >
              <UserAddOutlined className="text-base font-semibold" />
              Add User
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24} className="my-2">
          <BoxWrapper>
            <GlobalTable tableData={tableData} columns={columns} />
          </BoxWrapper>
        </Col>
      </Row>
      <Modal
        open={open}
        closeIcon={
          <CloseCircleFilled className="text-[#A3AED0] text-xl" />
        }
        footer={[
          <Button
            key="Cancel"
            className="teriary-color border-1 border-solid border-[#4a9d77] pt-0 pb-0 pr-5 pl-5"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            className="teriary-bg-color border-1 border-solid border-[#4a9d77] white-color pt-0 pb-0 pr-5 pl-5"
            onClick={() => {
              setOpen(false);
              setOpenC(true);
            }}
          >
            Submit
          </Button>,
        ]}
        title="Add User"
      >
        <Form
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={10}>
            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
              <Form.Item label="First Name" name="firstName">
                <Input
                  placeholder="Enter First Name"
                  size="large"
                  className="text-input-bg-color text-input-color pl-2 text-base"
                />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
              <Form.Item label="Last Name" name="lastName">
                <Input
                  placeholder="Enter Last Name"
                  size="large"
                  className="text-input-bg-color text-input-color pl-2 text-base"
                />
              </Form.Item>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item label="Email" name="email">
                <Input
                  placeholder="Enter Email"
                  size="large"
                  className="text-input-bg-color text-input-color pl-2 text-base"
                />
              </Form.Item>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item label="Phone Number" name="phonenumber">
                <Input.Group compact>
                  <Select
                    defaultValue="+92"
                    style={{ width: "25%" }}
                    size="large"
                  >
                    <Option value="Sign Up">+92</Option>
                    <Option value="Sign In">+32</Option>
                  </Select>
                  <AutoComplete
                    size="large"
                    style={{ width: "75%" }}
                    placeholder="Phone Number"
                    options={[{ value: "text 1" }, { value: "text 2" }]}
                  />
                </Input.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal
        open={openC}
        closeIcon={
          <CloseCircleFilled className="text-[#A3AED0] text-xl" />
        }
        footer={[
          <Button
            key="Cancel"
            className="teriary-color border-1 border-solid border-[#4a9d77] pt-0 pb-0 pr-5 pl-5"
            onClick={() => {
              setOpenC(false);
            }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            className="teriary-bg-color border-1 border-solid border-[#4a9d77] white-color pt-0 pb-0 pr-5 pl-5"
            onClick={() => {
              setOpenC(false);
            }}
          >
            Invite
          </Button>,
        ]}
        title="Permission"
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={[5, 20]}>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Checkbox className="text-base font-normal primary-color">
                All
              </Checkbox>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Checkbox
                checked
                className="text-base font-normal primary-color"
              >
                Dashboard
              </Checkbox>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Checkbox className="text-base font-normal primary-color">
                User Management <RightOutlined className="text-base" />
              </Checkbox>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Checkbox className="text-base font-normal primary-color">
                Agent Management
              </Checkbox>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Checkbox className="text-base font-normal primary-color">
                Issue Management
              </Checkbox>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Checkbox className="text-base font-normal primary-color">
                Setting
              </Checkbox>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminManagement;
