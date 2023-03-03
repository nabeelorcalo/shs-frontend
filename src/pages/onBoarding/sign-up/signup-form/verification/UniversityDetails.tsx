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
import { DocumentUpload, SHSLogo } from "../../../../../assets/images";
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
            <SHSLogo />
          </div>
          <div className="form-inner-wrapper">
            <div className="main-title-wrapper">
              <Typography className="steps">Step 3 of 7</Typography>
              <div className="flex items-center">
                <div>
                  <BackButton />
                </div>
                <div className="mx-auto">
                  <Typography.Title level={3}>
                    Univerisity Details
                  </Typography.Title>
                </div>
              </div>

              <Typography className="steps-description">
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
                  <div className="dragger">
                    <Row className="p-3">
                      <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Typography className="dragger-title">
                          Drag & drop files or
                          <span style={{ color: "#E95060" }}>Browse</span>
                        </Typography>
                        <Typography className="dragger-description">
                          Support jpeg,pdf and doc files
                        </Typography>
                      </Col>
                      <Col
                        xxl={12}
                        xl={12}
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        className="flex justify-end"
                      >
                        <DocumentUpload />
                      </Col>
                    </Row>
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
