import React from "react";
import {
  Button,
  Col,
  Form,
  Row,
  Select,
  Typography,
} from "antd";
import {
  BackButton,
  DocumentUpload,
  SHSLogo,
} from "../../../../../assets/images";
import "../../../styles.scss";
import DragAndDropUpload from "../../../../../components/DragAndDropUpload";

const DbsVerification = (props: any) => {
  const { currentStep, setCurrentStep } = props;

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
              <Typography className="steps">Step 2 of 7</Typography>
              <div className="flex items-center mt-3 mb-3">
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
                   <DragAndDropUpload/>
                </div>
              </Form.Item>
              <Typography style={{ marginBottom: "20px" }}>
                or <a href="">Apply Now</a>
              </Typography>
              <Typography style={{ marginBottom: "20px" }}>
                You must be 16 or over to apply. It usually takes up to 14 days
                to receive your certificate.
              </Typography>
              <Row gutter={[10,10]}>
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
