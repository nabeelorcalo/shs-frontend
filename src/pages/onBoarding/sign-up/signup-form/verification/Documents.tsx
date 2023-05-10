import React, { useState } from "react";
import { Button, Col, Form, Row, Select, Typography } from "antd";
import { ArrowDownDark, SHSLogo, BackButton } from "../../../../../assets/images";
import { DragAndDropUpload, DropDown } from "../../../../../components";
import "../../../styles.scss";

const { Option } = Select;

const Documents = (props: any) => {
  const { currentStep, setCurrentStep } = props;
  const [value, setValue] = useState("");

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
              <div className="flex items-center mt-3 mb-3">
                <div>
                  <BackButton
                    onClick={() => {
                        setCurrentStep(3);
                    }}
                  />
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
                  <DragAndDropUpload />
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
                  <DragAndDropUpload />
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
                  <DragAndDropUpload />
                </div>
              </Form.Item>
              <Row gutter={[10, 10]}>
                <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
                  <Button
                     onClick={() => {
                      setCurrentStep(5);
                  }}
                    className="btn-cancel btn-cancel-verification"
                  //htmlType="submit"
                  >
                    Skip
                  </Button>
                </Col>
                <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
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
