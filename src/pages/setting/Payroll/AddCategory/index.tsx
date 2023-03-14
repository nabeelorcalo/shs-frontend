import React, { useState } from "react";
import {
  Typography,
  Row,
  Col,
  Divider,
  Form,
  Radio,
  RadioChangeEvent,
  Button,
  Space,
  Input,
  Switch,
} from "antd";
import { SettingHorizontalLine } from "../../../../assets/images";
import "./style.scss";
import dayjs, { Dayjs } from "dayjs";
import { NavLink } from "react-router-dom";
import { BoxWrapper } from "../../../../components/BoxWrapper/BoxWrapper";
import UploadDocument from "../../../../components/UploadDocument";
import { CommonDatePicker } from "../../../../components";

const { Title, Paragraph } = Typography;

const PayrollAddCategory = () => {
  const [value, setValue] = useState(1);
  const [formValues, setFormValues] = useState<any>({
    shiftName: "",
    formDate: "",
    toDate: "",
    addInterns: "",
    officeLocation: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  console.log("formValues", formValues);
  return (
    <div className="payroll-add-category">
      {/*------------------------ Header----------------------------- */}

      <div className="flex items-center">
        <Title level={3} className="mt-2">
          Add Category
        </Title>
        <span className="mx-2">
          <SettingHorizontalLine />
        </span>
        <span className=" text-base font-medium text-secondary-color">
          Setting
        </span>
        <span className="mx-2">/</span>
        <NavLink to="/settings/location">
          <span className=" text-base font-medium text-secondary-color">
            Payroll
          </span>
        </NavLink>
      </div>

      <Divider className="my-1 mb-3" />
      <BoxWrapper>
        <Form layout="vertical">
          {/*------------------------ Policy Details----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md-px-3" xs={24} md={12} xxl={8}>
              <Title className="mt-0.5" level={4}>
                Shift
              </Title>
              <Paragraph>Enter shift details here</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <Form.Item
                name="shiftName"
                label="Shift Name"
                rules={[{ message: "Please Enter your username!" }]}
              >
                <Input placeholder="Enter Name" />
              </Form.Item>
              <div className="flex flex-col md:flex-row justify-between w-full my-5">
                <div className="flex flex-col justify-between w-full pr-2 ">
                  <label>From</label>
                  <CommonDatePicker
                    name="Date Picker"
                    onBtnClick={() => {}}
                    setOpen={function noRefCheck() {}}
                    setValue={function noRefCheck() {}}
                  />
                </div>
                <div className="flex flex-col w-full pl-1">
                  <label>To</label>
                  <CommonDatePicker
                    name="Date Picker"
                    onBtnClick={() => {}}
                    setOpen={function noRefCheck() {}}
                    setValue={function noRefCheck() {}}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Divider />
          {/*------------------------ Add Interns----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md:px-3" xs={24} md={12} xxl={8}>
              <Title className="mt-0.5" level={4}>
                Add Interns
              </Title>
              <Paragraph>Select for this office location</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>All Employees</Radio>
                <Radio value={2}>Select Employees</Radio>
              </Radio.Group>
              <div className="my-5">
                <Switch />
                <span className="px-2">Apply to all new hires</span>
              </div>
            </Col>
          </Row>

          <Space className="flex justify-end">
            <Button danger size="middle" type="primary">
              Cencal
            </Button>
            <Button
              size="middle"
              className="teriary-bg-color white-color add-button"
            >
              Add
            </Button>
          </Space>
        </Form>
      </BoxWrapper>
    </div>
  );
};

export default PayrollAddCategory;
