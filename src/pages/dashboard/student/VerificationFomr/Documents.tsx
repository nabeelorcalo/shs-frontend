import { useState } from "react";
import { Button, Col, Form, Row, Select, Typography } from "antd";
import { DropDown } from "../../../../components";
import { ArrowDownDark, BackButton, DocumentUpload } from "../../../../assets/images";

const Documents = (props: any) => {
  const { currentStep, setCurrentStep } = props;
  const [value, setValue] = useState("");

  const { Option } = Select;
  return (
    <div className="identity">
      <Row className="identity-style">
        <Col xxl={12} xl={12} lg={14} md={14} sm={24} xs={24}>
          <div className="form-wrapper">
            <div className="main-title-wrapper">

              <div className="flex ">
                <div>
                  <BackButton />
                </div>
                <div className="mx-auto">
                  <Typography.Title level={1}>
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
                  <Row gutter={[10, 50]} className="p-3">
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
                      <DocumentUpload />
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
                      <DocumentUpload />
                    </Col>
                  </Row>
                </div>
              </Form.Item>

              <Row gutter={[10, 10]}>
                <Col xs={24} md={24} lg={12} xl={8}>
                  <Button className="btn-cancel btn-cancel-verification" >
                    Skip
                  </Button>
                </Col>
                <Col xs={24} md={24} lg={12} xl={16}>
                  <Form.Item>
                    <Button
                      type="primary"
                      className="login-form-button"
                      onClick={() => {  setCurrentStep(5)  }}
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
