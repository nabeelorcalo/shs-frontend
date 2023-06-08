import React, { useState } from "react";
import { Button, Col, Form, Row, Select, Typography } from "antd";
import { ArrowDownDark, SHSLogo, BackButton } from "../../../../../assets/images";
import { DragAndDropUpload, DropDown } from "../../../../../components";
import "../../../styles.scss";
import useCustomHook from "../../../actionHandler";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import { CaretDownOutlined } from "@ant-design/icons";
const { Option } = Select;

const visa = [
  {
    value: 'studentVisa',
    label: 'Student Visa'
  },
  {
    value: 'postStudyWorkVisaPSW',
    label: 'Post Study Work Visa PSW'
  },
  {
    value: 'AppliedPublicHistory',
    label: 'Applied Public History'
  },
  {
    value: 'WorkPermit',
    label: 'Work Permit'
  },
  {
    value: 'DependentonWorkPermit',
    label: 'Dependent on Work Permit'
  },

]

const Documents = (props: any) => {
  const { currentStep, setCurrentStep } = props;
  const [dynSkip, setDynSkip] = useState<boolean>(false);
  const [cvFile, setCvFile] = useState([])
  const [passportFile, setPassportFile] = useState([])
  const [brpFile, setBrpFile] = useState([])
  const [value, setValue] = useState("");
  const action = useCustomHook();
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const onFinish = (values: any) => {
    console.log('document  : ', values)
    //  action.verifcationStudent({values,currentStep})
    setCurrentStep(currentStep+1);
  }

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
                      setCurrentStep(currentStep - 1);
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
              <Form
                layout='vertical'
                name='normal_login'
                className='login-form'
                initialValues={{ remember: true }}
                validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
                onFinish={onFinish}
              >

                <Form.Item
                  name="visaStatus"
                  label="Visa Status"
                  rules={[
                    { required: !dynSkip }, { type: "string" }
                  ]}
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
                  rules={[
                    { required: !dynSkip }, { type: "string" }
                  ]}
                >
                  <div className="dragger">
                    <DragAndDropUpload
                      files={cvFile}
                      setFiles={setCvFile} />
                  </div>
                </Form.Item>
                <Form.Item
                  label="Passport"
                  name="passport"
                  rules={[
                    { required: !dynSkip }, { type: "string" }
                  ]}
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
                  rules={[
                    { required: !dynSkip }, { type: "string" }
                  ]}
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
                      onClick={() => {
                        setDynSkip(true);
                      }}
                      htmlType="submit"
                    >
                      Skip
                    </Button>
                  </Col>
                  <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
                    <Form.Item>
                      <Button
                        className="login-form-button"
                        htmlType="submit"
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
