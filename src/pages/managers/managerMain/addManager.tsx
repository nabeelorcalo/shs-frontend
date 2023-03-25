import React, { useState } from "react";
import {
  AutoComplete,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import { DropDown } from "../../../components";

import { Option } from "antd/es/mentions";

const AddManager = () => {
  const [searchValue, setSearchValue] = useState("");
  const [value, setValue] = useState("");
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="add-manager">
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div>
            <span className="font-semibold text-2xl text-[#363565]">
              New Manager
            </span>
            <Divider type="vertical" />
            <span className="font-semibold text-base text-[#4E4B66]">
              Managers
            </span>
          </div>
        </Col>
      </Row>
      <Divider />
      <div className=" shadow-[0px 0px 8px 1px rgba(9, 161, 218, 0.1)] bg-[#FFFFFF] p-3 rounded-2xl">
        <Row>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Typography className="text-2xl font-semibold text-[#14142A]">
              Manager Details
            </Typography>
            <Typography className="text-base font-normal text-[#4E4B66]">
              You can add a new manager under your company account
            </Typography>
          </Col>
        </Row>
        <Divider />
        <Form
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row>
            <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
              <Typography className="text-xl font-semibold text-[#14142A]">
                Personal Details
              </Typography>
              <Typography className="text-base font-normal text-[#4E4B66]">
                Enter personal information of manager
              </Typography>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label="First Name"
                name="firstname"
                rules={[
                  { required: true, message: "Please input your firstname!" },
                ]}
              >
                <Input
                  placeholder="Enter First Name"
                  className="bg-[#E6F4F9] text-[#A0A3BD] pl-2 text-base"
                />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastname"
                rules={[
                  { required: true, message: "Please input your Last name!" },
                ]}
              >
                <Input
                  placeholder="Enter Last Name"
                  className="bg-[#E6F4F9] text-[#A0A3BD] pl-2 text-base"
                />
              </Form.Item>
              <Form.Item
                label="Gender"
                rules={[
                  { required: true, message: "Please input your Last name!" },
                ]}
              >
                <DropDown
                  name="Select"
                  value={value}
                  options={["item 1", "item 2", "item 3"]}
                  setValue={setValue}
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
              >
                <Input
                  placeholder="Enter Email"
                  className="bg-[#E6F4F9] text-[#A0A3BD] pl-2 text-base"
                />
              </Form.Item>
              <Form.Item label="Phone Number" name="phoneNumber">
                <Input.Group compact>
                  <Select defaultValue="+92" style={{ width: "25%" }}>
                    <Option value="+92">+92</Option>
                    <Option value="+91">+91</Option>
                  </Select>
                  <AutoComplete
                    style={{ width: "75%" }}
                    placeholder="Phone Number"
                    options={[{ value: "text 1" }, { value: "text 2" }]}
                  />
                </Input.Group>
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
              <Typography className="text-xl font-semibold text-[#14142A]">
                General Information
              </Typography>
              <Typography className="text-base font-normal text-[#4E4B66]">
                Enter general information of manager
              </Typography>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  { required: true, message: "Please input your Title!" },
                ]}
              >
                <Input
                  placeholder="Enter Title"
                  className="bg-[#E6F4F9] text-[#A0A3BD] pl-2 text-base"
                />
              </Form.Item>
              <Form.Item
                label="Department"
                rules={[
                  {
                    required: true,
                    message: "Please input your department!",
                  },
                ]}
              >
                <DropDown
                  name="Select"
                  value={value}
                  options={["item 1", "item 2", "item 3"]}
                  setValue={setValue}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
              <Typography className="text-xl font-semibold text-[#14142A]">
                Address
              </Typography>
              <Typography className="text-base font-normal text-[#4E4B66]">
                Enter address of manager
              </Typography>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
              <Form.Item label="Post Code" name="postCode">
                <DropDown
                  name="drop down with search bar"
                  value={value}
                  options={["search", "item 1"]}
                  setValue={setValue}
                  requireSearchBar
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              </Form.Item>
              <Form.Item label="Address" name="address">
                <Input
                  placeholder="Enter Address"
                  className="bg-[#E6F4F9] text-[#A0A3BD] pl-2 text-base"
                />
              </Form.Item>
              <Form.Item label="City" name="city">
                <Input
                  placeholder="Enter City"
                  className="bg-[#E6F4F9] text-[#A0A3BD] pl-2 text-base"
                />
              </Form.Item>
              <Form.Item label="Country" name="country">
                <DropDown
                  name="Select"
                  value={value}
                  options={["item 1", "item 2", "item 3"]}
                  setValue={setValue}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="flex justify-center sm:justify-end items-center">
            <Button className="border-1 border-solid border-[#4a9d77] text-[#4a9d77] pt-0 pb-0 pr-5 pl-5 ml-5">
              Cancel
            </Button>
            <Button
              htmlType="submit"
              className="bg-[#4a9d77] text-white border-1 border-solid border-[#4a9d77] pt-0 pb-0 pr-5 pl-5 ml-5"
            >
              <a href="managers">Submit</a>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddManager;
