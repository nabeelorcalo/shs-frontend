import React, { useState } from "react";
import { Button, Col, Form, Row, Select, Typography } from "antd";
import {
  ArrowDownDark,
  DocumentUpload,
  SHSLogo,
} from "../../../../../assets/images";
import "./Verification.scss";
import { BackButton } from "../../../../../assets/images";
import { DropDown } from "../../../../../components";

const Documents = (props: any) => {
  const { currentStep, setCurrentStep } = props;
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedList, setSelectedList] = useState([]);

  const { Option } = Select;
  return (
    <div className="identity">
      <Row className="identity-style">
        <Col xxl={9} xl={9} lg={14} md={14} sm={24} xs={24}>
          <div className="logo-wrapper">
            <SHSLogo />
          </div>
          <div className="form-inner-wrapper">
            <div className="main-title-wrapper">
              <Typography className="steps">Step 4 of 7</Typography>
              <div className="flex items-center">
                <div>
                  <BackButton />
                </div>
                <div className="mx-auto">
                  <Typography.Title level={3}>
                    Identity Documents
                  </Typography.Title>
                </div>
              </div>

              <Typography className="steps-description">
                Provide your identity documents for verification
              </Typography>
            </div>
            <div className="sign-up-form-wrapper">
              <Form.Item
                name="Visa Status"
                label="Visa Status"
                rules={[
                  { required: true, message: "Please select Visa Status!" },
                ]}
              >
                <DropDown
                  name="Select"
                  value={value}
                  options={["item 1", "item 2", "item 3"]}
                  setValue={setValue}
                  startIcon={ArrowDownDark}
                />
              </Form.Item>
              <Form.Item
                label="CV"
                name="CVDocument"
                rules={[
                  {
                    required: true,
                    message: "Please  Valid Document!",
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
              <Form.Item
                label="Passport"
                name="PassportDocument"
                rules={[
                  {
                    required: true,
                    message: "Please  Valid Document!",
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
              <Form.Item
                label="BRP"
                name="BRPDocument"
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

              <Row gutter={10}>
                <Col xxl={4} xl={4} lg={4} md={24} sm={24} xs={24}>
                  <Button
                    className="btn-cancel btn-cancel-verification"
                    //htmlType="submit"
                  >
                    Skip
                  </Button>
                </Col>
                <Col xxl={20} xl={20} lg={20} md={24} sm={24} xs={24}>
                  <Form.Item>
                    <Button
                      type="primary"
                      //htmlType="submit"
                      className="login-form-button"
                      onClick={() => {
                        setCurrentStep(5);
                      }}
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

export default Documents;
