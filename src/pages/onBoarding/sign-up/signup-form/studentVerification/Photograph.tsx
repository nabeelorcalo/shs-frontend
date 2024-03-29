import React, { useState } from "react";
import { Button, Upload, Col, Form, Row, Typography } from "antd";
import {
  SHSLogo,
  BackButton,
  UploadUserProfile,
} from "../../../../../assets/images";
import "../../../styles.scss";
import useCustomHook from "../../../actionHandler";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import { Notifications } from "../../../../../components";
import { isUndefined } from "lodash";

const Photograph = (props: any) => {
  const {
    currentStep,
    setCurrentStep,
    skipStep,
    isDashboard,
    updateProgress } = props;
  const [dynSkip, setDynSkip] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [skipLoading, setSkipLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<any>([]);
  const { verifcationStudent } = useCustomHook();

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    setProfilePhoto(e?.fileList);
    return e?.fileList;
  };
  const onFinish = async (values: any) => {
    setBtnLoading(true);
    console.log("photo  : ", values);

    if (values.photo.length === 0) {
      setBtnLoading(false);
      Notifications({
        title: "Error",
        description: `Please select an image`,
        type: "error",
      });
      return;
    }
    const payloadForm = new FormData();
    payloadForm.append("photo", values.photo[0].originFileObj);
    const response = await verifcationStudent(payloadForm, {
      step: 6,
      skip: dynSkip,
    });
    setBtnLoading(false);
    if (response.statusCode != 201) {
      Notifications({
        title: "Error",
        description: `Failed to add data`,
        type: "error",
      });
      return;
    }
    if (!isUndefined(updateProgress)) {
      updateProgress({ profilePicture: "COMPLETED" });
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
    <div className="university-detail">
      <Row className="university-detail-style">
        <Col xxl={isDashboard ? 12 : 8} xl={9} lg={14} md={14} sm={24} xs={24}>
          <div className="logo-wrapper">
            <SHSLogo />
          </div>
          <div className="form-inner-wrapper">
            <div className="main-title-wrapper">
              <Typography className="steps">Step 6 of 7</Typography>
              <div className="flex items-center mt-3 mb-3">
                {!isDashboard ? (
                  <div>
                    <BackButton
                      onClick={() => {
                        setCurrentStep(currentStep - 1);
                      }}
                    />
                  </div>
                ) : null}
                <div className="mx-auto">
                  <Typography.Title level={3}>Photograph</Typography.Title>
                </div>
              </div>
              <Typography className="text-base font-medium text-center text-secondary-color">
                Upload your profile picture
              </Typography>
            </div>
            <div className="text-center">
              <Typography className="font-semibold text-2xl text-primary-title-color">
                A photo of you
              </Typography>
              <Typography className="steps-description">
                Take a minute to upload a profile photo.
              </Typography>
            </div>
            <div className="sign-up-form-wrapper">
              <Form
                layout="vertical"
                name="normal_login"
                className="login-form"
                validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
                initialValues={{ remember: !dynSkip }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="photo"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  className="flex justify-center mt-10"
                >
                  <Upload
                    name="photo"
                    listType="picture"
                    beforeUpload={() => false}
                  >
                    <UploadUserProfile />
                  </Upload>
                </Form.Item>
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
                        loading={btnLoading}
                        className="login-form-button"
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

export default Photograph;
