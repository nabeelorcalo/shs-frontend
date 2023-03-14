import React from "react";
import {
  Button,
  Col,
  Form,
  Row,
  Select,
  Typography,
} from "antd";
import "../../../styles.scss";
import {
  BackButton,
  DocumentUpload,
  SHSLogo,
} from "../../../../../assets/images";

const DbsVerification = (props: any) => {
  const { currentStep, setCurrentStep } = props;

  const { Option } = Select;
  return (
    <div className="identity">
      <Row className="identity-style">
        <Col xxl={9} xl={9} lg={14} md={14} sm={24} xs={24}>
          <div className="logo-wrapper">
           <SHSLogo/>
          </div>
          <div className="form-inner-wrapper">
            <div className="main-title-wrapper">
              <Typography className="steps">Step 2 of 7</Typography>
              <div className="flex items-center">
                <div>
                  <BackButton />
                </div>
                <div className="mx-auto">
                  <Typography.Title level={3}>
                    DBS Verification
                  </Typography.Title>
                </div>
              </div>

              <Typography className="steps-description">
                Provide your background details
              </Typography>
            </div>
            <div className="sign-up-form-wrapper">
              <Form.Item
                label="Upload"
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
                        <span className="text-[#E95060]">Browse</span>
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
                      <img src={DocumentUpload} alt="error" />
                    </Col>
                  </Row>
                </div>
              </Form.Item>
              <Typography style={{ marginBottom: "20px" }}>
                or <a href="">Apply Now</a>
              </Typography>
              <Typography style={{ marginBottom: "20px" }}>
                You must be 16 or over to apply. It usually takes up to 14 days
                to receive your certificate.
              </Typography>
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
                      onClick={() => {
                        setCurrentStep(3);
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

export default DbsVerification;
