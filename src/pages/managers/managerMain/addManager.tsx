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
import { ROUTES_CONSTANTS } from "../../../config/constants";
import { Option } from "antd/es/mentions";
import { useNavigate } from "react-router-dom";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../config/validationMessages";
import constants from '../../../config/constants';
import useCustomHook from "../actionHandler";

const AddManager = () => {
  const navigate = useNavigate();
  const action = useCustomHook();
  const [searchValue, setSearchValue] = useState("");
  const [value, setValue] = useState("");

  const onFinish = (values: any) => {
    console.log("Success:", values);
    const { firstname, lastname, gender, email, phoneNumber, title, department, postCode, address, city,
      country } = values;

    action.addManagerCompany({
      firstName: firstname,
      lastName: lastname,
      gender: gender,
      email: email,
      phoneNumber: phoneNumber,
      title: title,
      departmentId: department,
      postCode: postCode,
      address: address,
      city: city,
      country: country
    })
    navigate(`/${ROUTES_CONSTANTS.MANAGERS}`)
  };

  return (
    <div className="add-manager">
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div>
            <span className="font-semibold text-2xl primary-color">
              New Manager
            </span>
            <Divider type="vertical" />
            <span className="font-semibold text-base text-secondary-color">
              Managers
            </span>
          </div>
        </Col>
      </Row>
      <Divider />
      <div className="shadow-[0px 0px 8px 1px rgba(9, 161, 218, 0.1)] white-bg-color p-3 rounded-2xl">
        <Row>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Typography className="text-2xl font-semibold text-primary-color">
              Manager Details
            </Typography>
            <Typography className="text-base font-normal text-secondary-color">
              You can add a new manager under your company account
            </Typography>
          </Col>
        </Row>
        <Divider />
        <Form
          layout="vertical"
          initialValues={{ remember: true }}
          validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row>
            <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
              <Typography className="text-xl font-semibold text-primary-color">
                Personal Details
              </Typography>
              <Typography className="text-base font-normal text-secondary-color">
                Enter personal information of manager
              </Typography>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label="First Name"
                name="firstname"
                rules={[{ type: "string" }, { required: true }]}
              >
                <Input
                  placeholder="Enter First Name"
                  className="text-input-bg-color text-success-placeholder-color pl-2 text-base"
                />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastname"
                rules={[{ type: "string" }, { required: true }]}
              >
                <Input
                  placeholder="Enter Last Name"
                  className="text-input-bg-color text-success-placeholder-color pl-2 text-base"
                />
              </Form.Item>
              <Form.Item
                label="Gender"
                rules={[{ type: "string" }, { required: true }]}
              >
                <DropDown
                  name="Select"
                  value={value}
                  options={constants.OPTIONS_GENDER}
                  setValue={setValue}
                />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ type: "email" }, { required: true }]}
              >
                <Input
                  placeholder="Enter Email"
                  className="text-input-bg-color text-success-placeholder-color pl-2 text-base"
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
                  />
                </Input.Group>
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
              <Typography className="text-xl font-semibold text-primary-color">
                General Information
              </Typography>
              <Typography className="text-base font-normal text-secondary-color">
                Enter general information of manager
              </Typography>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label="Title"
                name="title"
                rules={[{ type: "string" }, { required: true }]}
              >
                <Input
                  placeholder="Enter Title"
                  className="text-input-bg-color text-success-placeholder-color pl-2 text-base"
                />
              </Form.Item>
              <Form.Item
                label="Department"
                name='department'
                rules={[{ type: "string" }, { required: false }]}
              >
                <DropDown
                  name="Select"
                  value={value}
                  options={constants.OPTIONS_DEPARTMENTS}
                  setValue={setValue}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
              <Typography className="text-xl font-semibold text-primary-color">
                Address
              </Typography>
              <Typography className="text-base font-normal text-secondary-color">
                Enter address of manager
              </Typography>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label="Post Code"
                name="postCode"
                rules={[{ type: "string" }, { required: false }]}>
                <DropDown
                  name="Enter Post Code"
                  value={value}
                  options={["search", "item 1"]}
                  setValue={setValue}
                  requireSearchBar
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              </Form.Item>
              <Form.Item
                label="Address"
                name="address"
                rules={[{ type: "string" }, { required: true }]}
              >
                <Input
                  placeholder="Enter Address"
                  className="text-input-bg-color text-success-placeholder-color pl-2 text-base"
                />
              </Form.Item>
              <Form.Item
                label="City"
                name="city"
                rules={[{ type: "string" }, { required: true }]}
              >
                <Input
                  placeholder="Enter City"
                  className="text-input-bg-color text-success-placeholder-color pl-2 text-base"
                />
              </Form.Item>
              <Form.Item
                label="Country"
                name="country"
                rules={[{ type: "string" }, { required: false }]}
              >
                <DropDown
                  name="Select"
                  value={value}
                  options={constants.OPTIONS_COUNTRIES}
                  setValue={setValue}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item className="flex justify-center sm:justify-end items-center">
            <Button
              onClick={() => { navigate(`/${ROUTES_CONSTANTS.DASHBOARD}`) }}
              className="border-1 border-solid border-[#4a9d77] teriary-color pt-0 pb-0 pr-5 pl-5 ml-5">
              Cancel
            </Button>
            <Button
              htmlType="submit"
              className="teriary-bg-color white-color border-1 border-solid border-[#4a9d77] pt-0 pb-0 pr-5 pl-5 ml-5"
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddManager;
