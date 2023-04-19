import React from "react";
import {
  Button,
  Col,
  Form,
  Row,
  Select,
  Typography,
} from "antd";

import { BackButton, DocumentUpload } from "../../../../assets/images";
import { Link } from "react-router-dom";
import { DragAndDropUpload } from "../../../../components";

const DbsVerification = (props: any) => {
  const { currentStep, setCurrentStep } = props;

  const { Option } = Select;
  return (
    <div className="identity">
      <Row className="identity-style">
        <Col xxl={12} xl={12} lg={14} md={14} sm={24} xs={24}>
          <div className="form-wrapper">
            <div className="main-title-wrapper">
         
              <div className="flex">
                <div>
                  <BackButton onClick={() => {  setCurrentStep(1)  }} />
                </div>
                <div className="mx-auto">
                  <Typography className="main-heading-verify">
                    DBS Verification
                  </Typography>
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
                or <Link to="">Apply Now</Link>
              </Typography>
              <Typography style={{ marginBottom: "20px" }}>
                You must be 16 or over to apply. It usually takes up to 14 days
                to receive your certificate.
              </Typography>
              <Row gutter={[10,10]}>
                <Col xs={24} md={24} lg={12} xl={8}>
                  <Button  className="btn-cancel btn-cancel-verification"  onClick={() => {  setCurrentStep(3)  }}>
                    Skip
                  </Button>
                </Col>
                <Col xs={24} md={24} lg={12} xl={16}>
                  <Form.Item>
                    <Button
                      onClick={() => { setCurrentStep(3) }}
                      type="primary"
                      className="login-form-button" >
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
