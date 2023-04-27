import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
import { SHSLogo, BackButton } from "../../../../../assets/images";
import type { SelectProps } from "antd";
import { CommonDatePicker, DragAndDropUpload, DropDown } from "../../../../../components";
import "../../../styles.scss";

const UniversityDetails = (props: any) => {
  const { currentStep, setCurrentStep } = props;
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<SelectProps["options"]>([]);
  const [value, setValue] = useState<string>();
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="university-detail">
      <Row className="university-detail-style">
        <Col xxl={8} xl={9} lg={14} md={18} sm={24} xs={22}>
          <div className="logo-wrapper">
            <SHSLogo />
          </div>
          <div className="form-inner-wrapper">
            <div className="main-title-wrapper">
              <Typography className="steps">Step 3 of 7</Typography>
              <div className="flex items-center mt-3 mb-3">
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
              <Row gutter={10}>
                <Col xxl={12} xl={12} lg={12} md={12} xs={24}>
                  <Form.Item label="Internship Start Date">
                    <CommonDatePicker open={open} setOpen={setOpen} setValue={setValue} />
                  </Form.Item></Col>
                <Col xxl={12} xl={12} lg={12} md={12} xs={24}>
                  <Form.Item label="Internship End Date">
                    <CommonDatePicker open={open} setOpen={setOpen} setValue={setValue} />
                  </Form.Item>
                </Col>
              </Row>
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
                  <DragAndDropUpload />
                </div>
              </Form.Item>
              <Row gutter={[10, 10]}>
                <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
                  <Button
                    className="btn-cancel btn-cancel-verification"
                  //htmlType="submit"
                  >
                    Skip
                  </Button>
                </Col>
                <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
                  <Form.Item>
                    <Button
                      onClick={() => {
                        setCurrentStep(4);
                      }}
                      type="primary"
                      //htmlType="submit"
                      className="login-form-button"
                    >
                      Next
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UniversityDetails;
