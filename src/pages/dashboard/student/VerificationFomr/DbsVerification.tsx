import React, { useState } from "react";
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
import useCustomHook from "../../actionHandler";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../config/validationMessages";

const DbsVerification = (props: any) => {
  const { currentStep, setCurrentStep } = props;
  const [uploadFile, setUploadFile] = useState([])
  const [dynSkip, setDynSkip] = useState<boolean>(false);
  const { Option } = Select;
  const action = useCustomHook();

  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append("dbsFile", uploadFile[0]);
    action.verifcationStudentData(formData, { skip: dynSkip, step: currentStep })
    setCurrentStep(currentStep + 1);
  }

  return (
    <div className="identity">
      <Row className="identity-style">
        <Col xxl={12} xl={12} lg={14} md={14} sm={24} xs={24}>
          <div className="form-wrapper">
            <div className="main-title-wrapper">
              <div className="flex">
                <div>
                  <BackButton onClick={() => { setCurrentStep(currentStep - 1) }} />
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
              <Form
                layout="vertical"
                name="normal_login"
                className="login-form"
                initialValues={{ remember: !dynSkip }}
                validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
                onFinish={onFinish}
              >
                <Form.Item
                  label="Upload File"
                  name="dbs"
                  rules={[{ type: "string" }, { required: !dynSkip }]}
                  className="mb-[20px]"
                >
                  <div className="dragger">
                    <DragAndDropUpload
                      files={uploadFile}
                      setFiles={setUploadFile}
                    />
                  </div>
                </Form.Item>
                <Typography className="mb-[20px]">
                  or
                 <Link
                    className="text-secondary-color font-normal text-sm"
                    to="https://www.apply-basic-criminal-record-check.service.gov.uk/?_ga=2.206547344.2088359023.1664773154-1699592102.1646922921">
                    Apply Now
                  </Link>
                </Typography>
                <Typography className="mb-[20px] text-secondary-color font-normal text-sm">
                  You must be 16 or over to apply. It usually takes up to 14 days
                  to receive your certificate.
                </Typography>
                <Row gutter={[10, 10]}>
                  <Col xs={24} md={24} lg={12} xl={8}>
                    <Button
                      className="btn-cancel btn-cancel-verification"
                      onClick={() => {
                        setDynSkip(true);
                      }}
                      htmlType="submit"
                    >
                      Skip
                    </Button>
                  </Col>
                  <Col xs={24} md={24} lg={12} xl={16}>
                    <Form.Item>
                      <Button
                        htmlType="submit"
                        type="primary"
                        className="login-form-button" >
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

export default DbsVerification;
