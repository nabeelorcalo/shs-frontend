import { useState } from "react";
import { Button, Col, Form, Row, Select, Typography } from "antd";
import { DragAndDropUpload, DropDown } from "../../../../components";
import { ArrowDownDark, BackButton, DocumentUpload } from "../../../../assets/images";
import useCustomHook from "../../actionHandler";
import { CaretDownOutlined } from '@ant-design/icons';
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
  const [value, setValue] = useState("");
  const [cvFile, setCvFile] = useState([])
  const [passportFile, setPassportFile] = useState([])
  const [brpFile, setBrpFile] = useState([])
  const action = useCustomHook();

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const onFinish = (values: any) => {
    const { visaStatus } = values;
    const formData = new FormData();
    formData.append("visaStatus", visaStatus);
    formData.append("cv", cvFile[0]);
    formData.append("passport", passportFile[0]);
    formData.append("brp", brpFile[0]);
    action.verifcationStudentData(formData, { skip: dynSkip, step: currentStep })
    setCurrentStep(currentStep+1);
  }

  return (
    <div className="identity">
      <Row className="identity-style">
        <Col xxl={12} xl={12} lg={14} md={14} sm={24} xs={24}>
          <div className="form-wrapper">
            <div className="main-title-wrapper">
              <div className="flex ">
                <div>
                  <BackButton onClick={() => { setCurrentStep(currentStep - 1) }} />
                </div>
                <div className="mx-auto">
                  <Typography className="main-heading-verify">
                    Identity Documents
                  </Typography>
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
                initialValues={{ remember: !dynSkip }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="visaStatus"
                  label="Visa Status"
                  rules={[
                    { required: !dynSkip, message: "Please select Visa Status!" },
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
                  label="CV"
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
                    {
                      required: !dynSkip,
                      message: "Please Upload Valid Document!",
                    },
                  ]}
                  className="mb-[20px]"
                >
                  <div className="dragger">
                    <DragAndDropUpload
                      files={brpFile}
                      setFiles={setBrpFile}
                    />
                  </div>
                </Form.Item>
                <Row gutter={[10, 10]}>
                  <Col xs={24} md={24} lg={12} xl={8}>
                    <Button className="btn-cancel btn-cancel-verification"
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
                        type="primary"
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
