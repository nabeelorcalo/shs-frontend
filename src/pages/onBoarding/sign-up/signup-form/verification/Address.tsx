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
const Address = () => {
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
              <Typography className="steps">Step 5 of 7</Typography>
              <div className="flex items-center">
                <div>
                  <BackButton />
                </div>
                <div className="mx-auto">
                  <Typography.Title level={3}>Address</Typography.Title>
                </div>
              </div>

              <Typography className="steps-description">
                Provide your address details
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
                  label="Post Code"
                  name="postcode"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Valid Code!",
                    },
                  ]}
                  style={{ width: "100%", marginBottom: "20px" }}
                >
                  <Input placeholder="Search" className="input-style" />
                </Form.Item>
                <Row gutter={20}>
                  <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Form.Item
                      label="Address"
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Address!",
                        },
                      ]}
                      style={{ width: "100%" }}
                    >
                      <Input
                        placeholder="Enter Address line"
                        className="input-style"
                      />
                    </Form.Item>
                  </Col>
                  <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Form.Item
                      label="Street"
                      name="street"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Street!",
                        },
                      ]}
                      style={{ width: "100%" }}
                    >
                      <Input
                        placeholder="Enter Street or location"
                        className="input-style"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Form.Item
                      label="Town"
                      name="town"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Town!",
                        },
                      ]}
                      style={{ width: "100%" }}
                    >
                      <Input
                        placeholder="Enter Town line"
                        className="input-style"
                      />
                    </Form.Item>
                  </Col>
                  <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Form.Item
                      name="country"
                      label="Country"
                      rules={[
                        { required: true, message: "Please select Country!" },
                      ]}
                    >
                      <Select placeholder="select your Country" size="large">
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Proof of Address"
                  name="proofofaddress"
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

                <Row gutter={10}>
                  <Col xxl={4} xl={4} lg={4} md={24} sm={24} xs={24}>
                    <Button
                      className="btn-cancel btn-cancel-verification"
                      htmlType="submit"
                    >
                      Skip
                    </Button>
                  </Col>
                  <Col xxl={20} xl={20} lg={20} md={24} sm={24} xs={24}>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                      >
                        Next
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Address;
