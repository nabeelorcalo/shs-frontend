import {
  Button,
  DatePicker,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import React, { useState } from "react";
import { SHSLogo } from "../../../../../assets/images";
import "./Verification.scss";
import { BackButton } from "../../../../../assets/images";

const onFinish = (values: any) => {
  console.log("Received values of form: ", values);
};
const { Option } = Select;

import type { SelectProps } from "antd";

const UniversityDetails = (props: any) => {
  const [data, setData] = useState<SelectProps["options"]>([]);
  const [value, setValue] = useState<string>();

  const handleSearch = (newValue: string) => {
    // if (newValue) {
    //   fetch(newValue, setData);
    // } else {
    setData([]);
    // }
  };

  const { RangePicker } = DatePicker;
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="university-detail">
      <Row className="university-detail-style">
        <Col xxl={10} xl={10} lg={14} md={18} sm={24} xs={24}>
          <div className="logo-wrapper">
      <SHSLogo/>
          </div>
          <div
            style={{
              border: "1px solid #D9DBE9",
              boxShadow: "0px 0px 8px 1px rgba(9, 161, 218, 0.1)",
              borderRadius: "16px",
              padding: "2rem",
            }}
          >
            <div className="main-title-wrapper">
              <Typography className="steps">Step 3 of 7</Typography>
              <div className="flex align-center justify-around">
          <BackButton/>
                <Typography.Title level={3}>
                  University Details
                </Typography.Title>
              </div>

              <Typography
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#4E4B66",
                  textAlign: "center",
                }}
              >
                Tell us about your university
              </Typography>
            </div>
            <div className="sign-up-form-wrapper">
              <Form
                layout="vertical"
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  label="University"
                  name="UniversityDocument"
                  rules={[
                    {
                      required: true,
                      message: "Please University Valid Document!",
                    },
                  ]}
                  style={{ width: "100%", marginBottom: "20px" }}
                >
                  <Input
                    placeholder="Search universities"
                    className="input-style"
                  />
                </Form.Item>
                <Form.Item
                  name="Course"
                  label="Course"
                  rules={[{ required: true, message: "Please select Course!" }]}
                >
                  <Select placeholder="select your Course" size="large">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="University Email"
                  name="University Email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your University Email!",
                    },
                  ]}
                  style={{ width: "100%" }}
                >
                  <Input
                    placeholder="University Email"
                    className="input-style"
                  />
                </Form.Item>

                <Form.Item
                  name="Graduation Year"
                  label="Graduation Year"
                  rules={[
                    {
                      required: true,
                      message: "Please select Graduation Year!",
                    },
                  ]}
                >
                  <Select
                    placeholder="select your Graduation Year"
                    size="large"
                  >
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Internship Start Date">
                  <RangePicker />
                </Form.Item>
                <Form.Item
                  label="Univeristy Approval"
                  name="uploadDocument"
                  rules={[
                    {
                      required: true,
                      message: "Please Upload Valid Document!",
                    },
                  ]}
                  style={{ width: "100%", marginBottom: "20px" }}
                >
                  <div style={{ border: "2px dashed black", height: "60px" }}>
                    <Input type="file" style={{ display: "none" }} />
                  </div>
                </Form.Item>

                <Space>
                  <Button className="btn-cancel" htmlType="submit">
                    Skip
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="btn-primary"
                  >
                    Next
                  </Button>
                </Space>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UniversityDetails;
