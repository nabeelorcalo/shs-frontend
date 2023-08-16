import React, { useState } from "react";
import { Button, Col, Form, Row, Select, Typography } from "antd";
import {
  ArrowDownDark,
  SHSLogo,
  BackButton,
} from "../../../../../assets/images";
import {
  DragAndDropUpload,
  DropDown,
  Notifications,
} from "../../../../../components";
import "../../../styles.scss";
import useCustomHook from "../../../actionHandler";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import { CaretDownOutlined } from "@ant-design/icons";
import { isUndefined } from "lodash";
const { Option } = Select;

const visa = [
  {
    value: "Student Visa",
    label: "Student Visa",
  },
  {
    value: "PSW",
    label: "PSW",
  },
  {
    value: "Work Permit",
    label: "Work Permit",
  },
  {
    value: "Dependent on work permit",
    label: "Dependent on work permit",
  },
];

const Documents = (props: any) => {
  const { currentStep, setCurrentStep, skipStep, isDashboard, updateProgress } =
    props;
  const [dynSkip, setDynSkip] = useState<boolean>(false);
  const [cvFile, setCvFile] = useState([]);
  const [passportFile, setPassportFile] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [skipLoading, setSkipLoading] = useState(false);
  const [brpFile, setBrpFile] = useState([]);
  const [value, setValue] = useState("");
  const { verifcationStudent } = useCustomHook();
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const onFinish = async (values: any) => {
    setBtnLoading(true);
    values.cv = cvFile;
    values.passport = passportFile;
    values.brp = brpFile;
    console.log("document: ", values);

    const payloadForm = new FormData();
    Object.keys(values).map((val: any) => {
      payloadForm.append(val, values[val]);
    });
    const response = await verifcationStudent(payloadForm, {
      step: 4,
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
      updateProgress({
        identityDocuments: "COMPLETED",
      });
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
              <Typography className="steps">Step 4 of 7</Typography>
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
              <Form
                layout="vertical"
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
                onFinish={onFinish}
              >
                <Form.Item
                  name="visaStatus"
                  label="Visa Status"
                  rules={[{ required: false }, { type: "string" }]}
                >
                  <Select
                    onChange={handleChange}
                    size="middle"
                    suffixIcon={<CaretDownOutlined />}
                  >
                    {visa?.map((option: any) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Cv"
                  name="cv"
                  className="mb-[20px]"
                  rules={[{ required: false }, { type: "string" }]}
                >
                  <div className="dragger">
                    <DragAndDropUpload files={cvFile} setFiles={setCvFile} />
                  </div>
                </Form.Item>
                <Form.Item
                  label="Passport"
                  name="passport"
                  rules={[{ required: false }, { type: "string" }]}
                  className="mb-[20px]"
                >
                  <div className="dragger">
                    <DragAndDropUpload
                      files={passportFile}
                      setFiles={setPassportFile}
                    />
                  </div>
                </Form.Item>
                <Form.Item
                  label="BRP"
                  name="brp"
                  rules={[{ required: false }, { type: "string" }]}
                  className="mb-[20px]"
                >
                  <div className="dragger">
                    <DragAndDropUpload files={brpFile} setFiles={setBrpFile} />
                  </div>
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
                        className="login-form-button"
                        htmlType="submit"
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

export default Documents;
