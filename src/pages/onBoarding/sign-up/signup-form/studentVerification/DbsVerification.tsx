import React, { useState } from "react";
import { Button, Col, Form, Row, Select, Typography } from "antd";
import { BackButton, SHSLogo } from "../../../../../assets/images";
import "../../../styles.scss";
import DragAndDropUpload from "../../../../../components/DragAndDropUpload";
import useCustomHook from "../../../actionHandler";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import { Notifications } from "../../../../../components";
import { isUndefined } from "lodash";
const { Option } = Select;

const DbsVerification = (props: any) => {
  const { currentStep, setCurrentStep, skipStep, isDashboard, updateProgress } =
    props;
  const [dynSkip, setDynSkip] = useState<boolean>(false);
  const [uploadFile, setUploadFile] = useState<any>(null);
  const { verifcationStudent } = useCustomHook();
  const [btnLoading, setBtnLoading] = useState(false);
  const [skipLoading, setSkipLoading] = useState(false);

  const onFinish = async (values: any) => {
    setBtnLoading(true);
    console.log("dbsVerification  : ", values, uploadFile);
    const form = new FormData();
    form.append("dbs", uploadFile);
    const response = await verifcationStudent(form, { step: 2, skip: dynSkip });
    setBtnLoading(false);
    console.log(response);
    if (response.statusCode != 201) {
      Notifications({
        title: "Error",
        description: `Failed to Upload dbs document`,
        type: "error",
      });
      return;
    }
    if (!isUndefined(updateProgress)) {
      updateProgress({ dbsVerification: "COMPLETED" });
    }
    setCurrentStep(currentStep + 1);
  };

  const handleSkip = async () => {
    setSkipLoading(true);
    const res = await skipStep();
    setSkipLoading(false);
    if (!res) {
      Notifications({
        title: "Error",
        description: `Failed to skip the step`,
        type: "error",
      });
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="identity">
      <Row className="identity-style">
        <Col xxl={isDashboard ? 12 : 9} xl={9} lg={14} md={14} sm={24} xs={24}>
          <div className="logo-wrapper">
            <SHSLogo />
          </div>
          <div className="form-inner-wrapper">
            <div className="main-title-wrapper">
              <Typography className="steps">Step 2 of 7</Typography>
              <div className="flex items-center mt-3 mb-3">
                {/* {!isDashboard ? (
                  <div>
                    <BackButton
                      onClick={() => {
                        setCurrentStep(currentStep - 1);
                      }}
                    />
                  </div>
                ) : null} */}
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
              <Form
                layout="vertical"
                name="normal_login"
                className="login-form"
                // initialValues={{ remember: false }}
                validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
                onFinish={onFinish}
              >
                <Form.Item
                  label="Upload"
                  name="dbsUploadDocument"
                  className="mb-[20px]"
                  rules={[{ required: false }]}
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
                  <a
                    className="text-secondary-color font-normal text-sm"
                    href="https://www.apply-basic-criminal-record-check.service.gov.uk/?_ga=2.206547344.2088359023.1664773154-1699592102.1646922921"
                  >
                    Apply Now
                  </a>
                </Typography>
                <Typography className="mb-[20px] text-secondary-color font-normal text-sm">
                  You must be 16 or over to apply. It usually takes up to 14
                  days to receive your certificate.
                </Typography>
                <Row gutter={[10, 10]}>
                  <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
                    <Button
                      className="btn-cancel btn-cancel-verification"
                      loading={skipLoading}
                      onClick={handleSkip}
                    >
                      Skip
                    </Button>
                  </Col>
                  <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        loading={btnLoading}
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

export default DbsVerification;
