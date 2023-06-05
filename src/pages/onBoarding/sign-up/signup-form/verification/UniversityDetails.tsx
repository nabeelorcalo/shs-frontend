import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Typography,
  Select
} from "antd";
import { SHSLogo, BackButton } from "../../../../../assets/images";
import { CommonDatePicker, DragAndDropUpload, DropDown } from "../../../../../components";
import "../../../styles.scss";
import useCustomHook from "../../../actionHandler";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";

const UniversityDetails = (props: any) => {
  const { currentStep, setCurrentStep } = props;
  const [universityApproval, setUniversityApproval] = useState([])
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>();
  const [searchValue, setSearchValue] = useState("");
  const action = useCustomHook();

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const onFinish = (values: any) => {
    console.log('uni  : ', values)
    //  action.verifcationStudent({values,currentStep})
    setCurrentStep(4);
  }

  return (
    <div className="university-detail">
      <Row className="university-detail-style">
        <Col xxl={8} xl={9} lg={14} md={18} sm={24} xs={22}>
          <div className="logo-wrapper">
            <SHSLogo />
          </div>
          <div className="form-inner-wrapper">
            <div className="main-title-wrapper">
              <Typography className="steps">Step 3 of 7</Typography>
              <div className="flex items-center mt-3 mb-3">
                <div>
                  <BackButton
                    onClick={() => {
                      setCurrentStep(2);
                    }}
                  />
                </div>
                <div className="mx-auto">
                  <Typography.Title level={3}>
                    Univerisity Details
                  </Typography.Title>
                </div>
              </div>
              <Typography className="steps-description">
                Tell us about your university
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
                  label="University"
                  name="universityName"
                  rules={[{ type: "string" }, { required: false }]}
                  style={{ width: "100%", marginBottom: "20px" }}
                >
                  <DropDown
                    name="Search  University"
                    value={value}
                    options={["search", "item 1"]}
                    setValue={setValue}
                    requireSearchBar
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                  />
                </Form.Item>
                <Form.Item
                  name="course"
                  label="Course"
                  rules={[{ type: "string" }, { required: true }]}
                >
                  <Select
                    onChange={handleChange}
                    options={[
                      { value: '3DInteractionDesigninVirtualReality', label: '3D Interaction Design in Virtual Reality' },
                      { value: 'AccountingandFinance', label: 'Accounting and Finance' },
                      { value: 'AppliedPublicHistory', label: 'Applied Public History' },
                      { value: 'DependentonWorkPermit', label: 'Dependent on Work Permit' },
                      { value: 'ArtHistoryCuratorship&RenaissanceCulture', label: 'Art History, Curatorship & Renaissance Culture' },
                      { value: 'BankingandFinance', label: 'Banking and Finance' },
                      { value: 'BrandManagement', label: 'Brand Management' },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  label="University Email"
                  name="universityMail"
                  rules={[{ type: "email" }, { required: true }]}
                  style={{ width: "100%" }}
                >
                  <Input placeholder="University Email" className="input-style" />
                </Form.Item>
                <Form.Item
                  name="graduationYear"
                  label="Graduation Year"
                  rules={[{ type: "string" }, { required: true }]}
                >
                  <Input placeholder="Enter Graduation Year" className="input-style" />
                </Form.Item>
                <Row gutter={10}>
                  <Col xxl={12} xl={12} lg={12} md={12} xs={24}>
                    <Form.Item name="internshipStartDate" label="Internship Start Date">
                      <CommonDatePicker open={open} setOpen={setOpen} setValue={setValue} />
                    </Form.Item></Col>
                  <Col xxl={12} xl={12} lg={12} md={12} xs={24}>
                    <Form.Item name='internshipEndDate' label="Internship End Date">
                      <CommonDatePicker open={open} setOpen={setOpen} setValue={setValue} />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  label="Univeristy Approval"
                  name="uniApproval"
                  rules={[{ required: true }]}
                  style={{ width: "100%", marginBottom: "20px" }}
                >
                  <div className="dragger">
                    <DragAndDropUpload
                      files={universityApproval}
                      setFiles={setUniversityApproval} />
                  </div>
                </Form.Item>
                <Row gutter={[10, 10]}>
                  <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
                    <Button
                      onClick={() => {
                        setCurrentStep(4);
                      }}
                      className="btn-cancel btn-cancel-verification"
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

export default UniversityDetails;
