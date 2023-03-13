import {
  CloseCircleFilled,
  EllipsisOutlined,
  MoreOutlined,
  NodeExpandOutlined,
  RightOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import { Option } from "antd/es/mentions";
import React, { useState } from "react";
import { DropDown, SearchBar } from "../../../components";
import GlobalTable from "../../../components/Table/Table";

const AdminManagement = () => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
    const [openC, setOpenC] = useState(false);
    
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const searchValue = () => {};
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
          className="table-status-style"
          style={{
            backgroundColor:
              data.status === "Active"
                ? "#3DC475"
                : data.status === "Inactive"
                ? "#D83A52"
                : "",
            color: "#FFFFFF",
            padding: " 2px 3px 2px 3px",
            borderRadius: "4px",
          }}
        >
          {data.status}
        </div>
      ),
      key: "status",
      title: "Status",
    },

    {
      dataIndex: "Actions",
      key: "Actions",
      title: "Actions",
    },
  ];
  const tableData = [
    {
      Actions: (
        <span>
          <EllipsisOutlined />
        </span>
      ),
      date: "23/09/2022",
      status: "Active",

      email: "anablack@gmail.com",
      phoneNumber: "0333333333",
      name: "Natwest Group",
      no: "01",
    },
    {
      Actions: (
        <span>
          <EllipsisOutlined />
        </span>
      ),
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
  return (
    <div className="admin-management">
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div>
            <Typography className="text-2xl font-semibold font-[Outfit] text-[#363565]">
              Admin Management
            </Typography>
          </div>
        </Col>
      </Row>
      <Divider />
      <Row gutter={10}>
        <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
          <SearchBar handleChange={searchValue} />
        </Col>
        <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
          <div className="flex justify-end items-center gap-3">
            <Button
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
            <Button
              className="bg-[#4A9D77] text-white text-base font-semibold"
              onClick={() => {
                setOpen(true);
              }}
            >
              <UserAddOutlined style={{ fontSize: "16px", fontWeight: 600 }} />{" "}
              Add User
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <GlobalTable tableData={tableData} columns={columns} />
        </Col>
      </Row>
      <Modal
        open={open}
        closeIcon={
          <CloseCircleFilled style={{ color: "#A3AED0", fontSize: "20px" }} />
        }
        footer={[
          <Button
            key="Cancel"
            style={{
              border: "1px solid #4a9d77",
              color: "#4a9d77",
              padding: "0px 20px",
            }}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            style={{
              backgroundColor: "#4a9d77",
              border: "1px solid #4a9d77",
              color: "#fff",
              padding: "0px 20px",
            }}
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
                  className="bg-[#E6F4F9] text-[#A0A3BD] pl-2 text-base"
                />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
              <Form.Item label="Last Name" name="lastName">
                <Input
                  placeholder="Enter Last Name"
                  size="large"
                  className="bg-[#E6F4F9] text-[#A0A3BD] pl-2 text-base"
                />
              </Form.Item>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item label="Email" name="email">
                <Input
                  placeholder="Enter Email"
                  size="large"
                  className="bg-[#E6F4F9] text-[#A0A3BD] pl-2 text-base"
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
          <CloseCircleFilled style={{ color: "#A3AED0", fontSize: "20px" }} />
        }
        footer={[
          <Button
            key="Cancel"
            style={{
              border: "1px solid #4a9d77",
              color: "#4a9d77",
              padding: "0px 20px",
            }}
            onClick={() => {
                setOpenC(false);
              }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            style={{
              backgroundColor: "#4a9d77",
              border: "1px solid #4a9d77",
              color: "#fff",
              padding: "0px 20px",
            }}
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
                  <Row gutter={[5,20]}>
                      <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                      <Checkbox className="text-base font-normal text-[#A0A3BD]">All</Checkbox>
                      </Col>
                      <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                      <Checkbox checked className="text-base font-normal text-[#A0A3BD]">Dashboard</Checkbox>
                      </Col>
                      <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                      <Checkbox className="text-base font-normal text-[#A0A3BD]">User Management <RightOutlined style={{fontSize:"16px"}} /></Checkbox>
                      </Col>
                      <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                      <Checkbox className="text-base font-normal text-[#A0A3BD]">Agent Management</Checkbox>
                      </Col>
                      <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                      <Checkbox className="text-base font-normal text-[#A0A3BD]">Issue Management</Checkbox>
                      </Col>
                      <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                      <Checkbox className="text-base font-normal text-[#A0A3BD]">Setting</Checkbox>
                      </Col>
                  </Row>
           
        
         
        </Form>
      </Modal>
    </div>
  );
};

export default AdminManagement;
