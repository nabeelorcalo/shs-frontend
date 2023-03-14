import React, { useState } from "react";
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
import { DocumentUpload, SHSLogo } from "../../../../../assets/images";
import "./Verification.scss";
import { BackButton } from "../../../../../assets/images";

const { Option } = Select;

import type { SelectProps } from "antd";
import { DropDown } from "../../../../../components";

const UniversityDetails = (props: any) => {

  const { currentStep, setCurrentStep } = props;
  const [data, setData] = useState<SelectProps["options"]>([]);
  const [value, setValue] = useState<string>();
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="university-detail">
      <Row className="university-detail-style">
        <Col xxl={9} xl={9} lg={14} md={14} sm={24} xs={24}>
          <div className="logo-wrapper">
           <SHSLogo/>
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
                <DropDown
                  name="Search  University"
                  value={value}
                  options={["search", "item 1"]}
                  setValue={setValue}
                  requireSearchBar
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              </Form.Item>
              <Form.Item
                name="Course"
                label="Course"
                rules={[{ required: true, message: "Please select Course!" }]}
              >
                <DropDown
                  name="Enter Course Name"
                  value={value}
                  options={["search", "item 1"]}
                  setValue={setValue}
                  requireSearchBar
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
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
                <Input placeholder="University Email" className="input-style" />
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
                <DropDown
                  name="Select"
                  value={value}
                  options={["search", "item 1"]}
                  setValue={setValue}
                  requireSearchBar
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              </Form.Item>
              <Form.Item label="Internship Start Date">
                <DatePicker />
              </Form.Item>
              <Form.Item label="Internship End Date">
                <DatePicker />
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
                      <DocumentUpload/>
                    </Col>
                  </Row>
                </div>
              </Form.Item>

              <Space>
                <Button className="btn-cancel" 
                //htmlType="submit"
                >
                  Skip
                </Button>
                <Button
                  type="primary"
                  //htmlType="submit"
                  className="btn-primary"
                  onClick={() => {
                    setCurrentStep(4);
                  }}
                >
                  Next
                </Button>
              </Space>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UniversityDetails;
